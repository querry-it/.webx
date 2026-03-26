import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-polylinedecorator';
import { createLogoMarker } from '../components/icon';

const Style = {
  color: 'blueviolet',
  weight: 4,
  opacity: 0.8,
};

let routingControl: L.Control.Routing | null = null;
let arrowDecorator: L.PolylineDecorator | null = null;

export function clearRoute(map: L.Map) {
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
  if (arrowDecorator) {
    arrowDecorator.remove();
    arrowDecorator = null;
  }
}

export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  if (!navigator.geolocation) {
    alert('Trình duyệt không hỗ trợ định vị!');
    return null;
  }
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
    );
  });
}

export async function fillMissingPointWithCurrentLocation(
  point_start: { lat: number; lon: number } | null,
  point_end: { lat: number; lon: number } | null,
) {
  // Bỏ spread, dùng thẳng tham số
  if (!point_start && point_end) {
    try {
      const curr = await getCurrentLocation();
      return { point_start: curr, point_end: point_end };
    } catch {
      return { point_start: point_end, point_end: point_end };
    }
  } else if (!point_end && point_start) {
    try {
      const curr = await getCurrentLocation();
      return { point_start: point_start, point_end: curr };
    } catch {
      return { point_start: point_start, point_end: point_start };
    }
  } else if (!point_start && !point_end) {
    try {
      const curr = await getCurrentLocation();
      return { point_start: curr, point_end: curr };
    } catch {
      return { point_start: { lat: 0, lon: 0 }, point_end: { lat: 0, lon: 0 } };
    }
  }
  return { point_start, point_end };
}

export async function DrawControl(
  map: L.Map,
  point_start: { lat: number; lon: number } | null,
  point_end: { lat: number; lon: number } | null,
) {
  if (!map) return;
  if (!point_start && !point_end) {
    clearRoute(map);
    return;
  }

  const isValid = (p: any) => p && p.lat != null && p.lon != null;

  const validStart = isValid(point_start) ? point_start : null;
  const validEnd = isValid(point_end) ? point_end : null;

  if (!validStart && !validEnd) {
    clearRoute(map);
    return;
  }

  const points = await fillMissingPointWithCurrentLocation(
    validStart,
    validEnd,
  );
  const start = points.point_start;
  const end = points.point_end;
  console.log(start, end);

  if (!start || !start.lat || !start.lon || !end || !end.lat || !end.lon) {
    clearRoute(map);
    return;
  }

  clearRoute(map);

  routingControl = L.Routing.control({
    waypoints: [L.latLng(start.lat, start.lon), L.latLng(end.lat, end.lon)],
    lineOptions: { styles: [Style] },
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    show: false,
    fitSelectedRoutes: false,
    createMarker: (i, wp) => {
      const iconUrl =
        'http://localhost:5000/uploads/avatars/4889286d-1732-48b4-8196-2c92dbb54306-1772812715326-49c08a57-9979-41cd-8af5-7def33b4ec28.webp';
      return L.marker(wp.latLng, {
        icon: createLogoMarker(iconUrl, [35, 35], 2, '#fff', 2),
      });
    },
  }).addTo(map);

  routingControl.on('routesfound', (e: any) => {
    const route = e.routes[0];
    if (!route) return;

    const coords = route.coordinates.map((c: any) => [c.lat, c.lng]);
    const line = L.polyline(coords, { color: 'transparent' });

    arrowDecorator = L.polylineDecorator(line, {
      patterns: [
        {
          offset: 25,
          repeat: 100,
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            polygon: true,
            pathOptions: { color: 'blueviolet', fillOpacity: 0.8 },
          }),
        },
      ],
    }).addTo(map);
  });

  const bounds = L.latLngBounds([
    [start.lat, start.lon],
    [end.lat, end.lon],
  ]);
  map.fitBounds(bounds, { padding: [50, 50] });
}
