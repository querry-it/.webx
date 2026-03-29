import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-polylinedecorator';
import { domain } from '../../../../../../utils/domain';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MARKER_CONFIG: Record<string, { color: string; icon: string }> = {
  history: { color: '#e74c3c', icon: '🏛️' },
  nature: { color: '#27ae60', icon: '🌿' },
  street: { color: '#f39c12', icon: '🏘️' },
  park: { color: '#2980b9', icon: '🌳' },
  village: { color: '#8e6c3e', icon: '🏡' },
  architecture: { color: '#e67e22', icon: '🏗️' },
  museum: { color: '#8e44ad', icon: '🏺' },
};

const ROUTE_COLORS = ['#e74c3c', '#2980b9', '#27ae60', '#f39c12', '#8e44ad'];

type RouteRef = {
  routingControl: any;
  labelMarker: L.Marker | null;
  lineRef: L.Polyline | null;
  arrowDecorator: any | null;
  markers: L.Marker[];
};

const routeRefs = new Map<string, RouteRef>();

function createMarkerIcon(category: string, index: number, color: string) {
  const cfg = MARKER_CONFIG[category] || { color: '#aaa', icon: '📍' };
  return L.divIcon({
    html: `
      <div style="position:relative;width:36px;height:36px;">
        <div style="background:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.2);border:2px solid ${cfg.color};font-size:16px;">
          ${cfg.icon}
        </div>
        <div style="position:absolute;top:-6px;right:-6px;background:${color};color:#fff;border-radius:50%;width:16px;height:16px;font-size:10px;font-weight:bold;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.3);">
          ${index + 1}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
    className: 'custom-marker-icon',
  });
}

function createRouteLabel(name: string, color: string) {
  return L.divIcon({
    html: `<div style="background:${color};color:#fff;padding:4px 14px;border-radius:30px;font-size:12px;font-weight:bold;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.25);">🚌 ${name}</div>`,
    iconAnchor: [50, 30],
    className: 'route-label-icon',
  });
}

export async function toggleRouteLayer(
  map: L.Map,
  routeId: string,
  show: boolean,
  showMarkers: boolean = true,
  routeIndex: number = 0,
) {
  if (!map || !map._container) {
    console.warn('[toggleRouteLayer] Map not ready');
    return;
  }

  if (!show) {
    const ref = routeRefs.get(routeId);
    if (ref) {
      const cleanup = (layer: any) => {
        if (layer && typeof layer.remove === 'function') {
          try {
            layer.remove();
          } catch (e) {
            console.warn('Cleanup error:', e);
          }
        }
      };

      cleanup(ref.arrowDecorator);
      cleanup(ref.lineRef);
      cleanup(ref.labelMarker);

      if (ref.markers) {
        ref.markers.forEach(cleanup);
      }

      if (ref.routingControl) {
        try {
          const router = ref.routingControl.getRouter?.();
          if (router?.abort) router.abort();

          map.removeControl(ref.routingControl);
        } catch (e) {
          console.warn('Error removing routing control:', e);
        }
      }

      routeRefs.delete(routeId);
    }
    return;
  }

  if (routeRefs.has(routeId)) {
    console.warn('[toggleRouteLayer] Route already exists:', routeId);
    return;
  }

  try {
    const response = await fetch(`${domain}/locations/roadmap/${routeId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    let routeData: any = null;
    if (json.success && json.data?.[0]) {
      routeData = json.data[0];
    } else if (json.id && json.points) {
      routeData = json;
    } else {
      console.warn('[toggleRouteLayer] Invalid route data');
      return;
    }

    const points = (routeData.points || []).filter(
      (p: any) => p && typeof p.lat === 'number' && typeof p.lon === 'number',
    );
    if (points.length < 2) {
      console.warn('[toggleRouteLayer] Not enough valid points');
      return;
    }

    const color = ROUTE_COLORS[routeIndex % ROUTE_COLORS.length];
    const waypoints = points.map((p: any) => L.latLng(p.lat, p.lon));
    const routeName = routeData.name || `Tuyến ${routeIndex + 1}`;

    const markers: L.Marker[] = [];
    if (showMarkers) {
      points.forEach((pt: any, i: number) => {
        try {
          const marker = L.marker([pt.lat, pt.lon], {
            icon: createMarkerIcon(pt.category || 'unknown', i, color),
          }).bindPopup(
            `<b>${i + 1}. ${pt.name || 'Điểm đến'}</b><br>` +
              `${MARKER_CONFIG[pt.category]?.icon || '📍'} ${pt.category || 'Địa điểm'}`,
          );
          marker.addTo(map);
          markers.push(marker);
        } catch (e) {
          console.warn('Error creating marker:', e);
        }
      });
    }

    const label = L.marker(waypoints[0], {
      icon: createRouteLabel(routeName, color),
      interactive: false,
    }).addTo(map);

    const routing = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [{ color, weight: 5, opacity: 0.85 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      createMarker: () => null,
      show: false,
      addWaypoints: false,
      fitSelectedRoutes: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      showAlternatives: false,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        timeout: 10000,
      }),
      plan: L.Routing.plan(waypoints, {
        createMarker: () => null,
        draggableWaypoints: false,
      }),
    }).addTo(map);

    const container = (routing as any).getContainer?.();
    if (container) container.style.display = 'none';

    const routeRef: RouteRef = {
      routingControl: routing,
      labelMarker: label,
      lineRef: null,
      arrowDecorator: null,
      markers,
    };
    routeRefs.set(routeId, routeRef);

    routing.on('routesfound', (e: any) => {
      try {
        const coords = e.routes?.[0]?.coordinates;
        if (!coords || !coords.length) {
          console.warn('[toggleRouteLayer] No coordinates found');
          return;
        }

        const ref = routeRefs.get(routeId);
        if (!ref) return;

        if (ref.lineRef && typeof ref.lineRef.remove === 'function') {
          ref.lineRef.remove();
        }
        if (
          ref.arrowDecorator &&
          typeof ref.arrowDecorator.remove === 'function'
        ) {
          ref.arrowDecorator.remove();
        }

        const latLngs = coords.map((c: any) => L.latLng(c.lat, c.lng));
        const newLine = L.polyline(latLngs, {
          color,
          weight: 5,
          opacity: 0.85,
          smoothFactor: 1,
        }).addTo(map);

        let newArrow = null;
        if (typeof L.polylineDecorator === 'function') {
          try {
            newArrow = L.polylineDecorator(newLine, {
              patterns: [
                {
                  offset: 25,
                  repeat: 100,
                  symbol: L.Symbol.arrowHead({
                    pixelSize: 10,
                    polygon: true,
                    pathOptions: { color, fillOpacity: 0.9 },
                  }),
                },
              ],
            }).addTo(map);
          } catch (e) {
            console.warn('Error creating arrow decorator:', e);
          }
        }

        ref.lineRef = newLine;
        ref.arrowDecorator = newArrow;

        // Fit bounds
        try {
          map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
        } catch (e) {
          console.warn('Error fitting bounds:', e);
        }
      } catch (err) {
        console.error('[toggleRouteLayer] Error in routesfound handler:', err);
      }
    });

    routing.on('routingerror', (e: any) => {
      console.error('[toggleRouteLayer] Routing error:', e.error);
    });
  } catch (err) {
    console.error('[toggleRouteLayer] Error:', err);

    const ref = routeRefs.get(routeId);
    if (ref) {
      if (ref.labelMarker) ref.labelMarker.remove();
      if (ref.markers) ref.markers.forEach((m) => m.remove());
      if (ref.routingControl) map.removeControl(ref.routingControl);
      routeRefs.delete(routeId);
    }
  }
}

export function clearAllRoutes(map: L.Map) {
  routeRefs.forEach((ref, routeId) => {
    toggleRouteLayer(map, routeId, false);
  });
  routeRefs.clear();
}
