import L from 'leaflet';
import { domain } from '../../../../../../utils/domain';

const markerLayerMap = new WeakMap();

export const MARKER_CONFIG = {
  history: { name: 'Di tích', color: '#ff6b6b', icon: '🏛️' },
  nature: { name: 'Thiên nhiên', color: '#6bcf8f', icon: '🌿' },
  street: { name: 'Khu phố', color: '#ffe066', icon: '🏘️' },
  cafe: { name: 'Quán cà phê', color: '#8b5a2b', icon: '☕' },
  metro: { name: 'Bến tàu điện', color: '#00acc1', icon: '🚆' },
  park: { name: 'Công viên', color: '#64b5f6', icon: '🌳' },
  restaurant: { name: 'Nhà hàng', color: '#ff6b6b', icon: '🍽️' },
  village: { name: 'Làng cổ', color: '#d4a26b', icon: '🏡' },
  bus: { name: 'Bến xe', color: '#2563eb', icon: '🚌' },
  architecture: { name: 'Kiến trúc', color: '#ffb347', icon: '🏛️' },
  shop: { name: 'Cửa hàng', color: '#e91e63', icon: '🛍️' },
  museum: { name: 'Bảo tàng', color: '#b388ff', icon: '🏺' },
};

const TOURIST_CATEGORIES = new Set([
  'history',
  'nature',
  'street',
  'park',
  'village',
  'architecture',
  'museum',
]);

const SERVICE_CATEGORIES = new Set([
  'cafe',
  'metro',
  'restaurant',
  'bus',
  'shop',
]);

function createMarkerIcon(category: string) {
  const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];
  return L.divIcon({
    html: `
      <div style="
        background: ${config.color};
        width: 28px; height: 28px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-size: 14px;
      ">${config.icon}</div>
    `,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

function createPopupContent(item: any, category: string): string {
  const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];
  const rating = parseFloat(item.rating_avg).toFixed(1);
  const ratingText =
    rating !== '0.0'
      ? `${rating} ⭐ (${item.rating_count || 0} đánh giá)`
      : 'Chưa có đánh giá';

  let buttonHtml = '';

  if (SERVICE_CATEGORIES.has(category)) {
    buttonHtml = `
      <button
        onclick="window.__navigateTo?.(${item.lat}, ${item.lon}, '${item.id}', '${item.name.replace(/'/g, "\\'")}')"
        style="width:100%;padding:6px 0;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;margin-top:8px;"
        onmouseover="this.style.background='#1d4ed8'"
        onmouseout="this.style.background='#2563eb'">
        🧭 Dẫn đường
      </button>`;
  } else if (TOURIST_CATEGORIES.has(category)) {
    buttonHtml = `
      <button
        onclick="window.__learnMore?.('${item.id}')"
        style="width:100%;padding:6px 0;background:#f59e0b;color:white;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;margin-top:8px;"
        onmouseover="this.style.background='#d97706'"
        onmouseout="this.style.background='#f59e0b'">
        📖 Tìm hiểu
      </button>`;
  }

  return `
    <div style="min-width:220px;font-family:'Segoe UI',sans-serif;padding:8px;">
      <div style="font-weight:bold;font-size:14px;margin-bottom:4px;color:#1f2937;display:flex;align-items:center;gap:6px;">
        <span>${config.icon}</span><span>${item.name}</span>
      </div>
      <div style="font-size:11px;color:#6b7280;margin-bottom:6px;">${item.address || 'Không có địa chỉ'}</div>
      <div style="font-size:11px;color:#f59e0b;margin-bottom:4px;">${ratingText}</div>
      <div style="font-size:10px;font-weight:600;color:${config.color};">${config.name}</div>
      ${buttonHtml}
    </div>
  `;
}

export function registerMarkerHandlers(
  dispatch: (action: any) => void,
  getCurrentClearQuery: () => boolean,
) {
  (window as any).__navigateTo = function (
    lat: number,
    lon: number,
    locationId: string,
    name: string,
  ) {
    dispatch({ type: 'SET_NAVBAR_X', payload: { activeX: 'roadmap' } });
    dispatch({
      type: 'SET_NAVBAR_X',
      payload: { clear_query: !getCurrentClearQuery() },
    });
    dispatch({ type: 'SET_INFORMATION', payload: { lat: null } });
    dispatch({ type: 'SET_INFORMATION', payload: { lon: null } });
    dispatch({
      type: 'SET_NAVBAR_X',
      payload: { point_end: { lat, lon, locationId, value: name } },
    });
  };

  (window as any).__learnMore = function (locationId: string) {
    dispatch({ type: 'SET_INFORMATION', payload: { locationid: locationId } });
    dispatch({ type: 'SET_NAVBAR_X', payload: { activeX: 'location' } });
  };
}

export async function toggleMarkerLayer(
  map: L.Map,
  category: string,
  show: boolean,
) {
  if (!map) return;

  const existing = markerLayerMap.get(map)?.[category];

  if (show) {
    if (existing && map.hasLayer(existing)) return;

    const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];
    if (!config) {
      console.error('Không tìm thấy category:', category);
      return;
    }

    try {
      const response = await fetch(`${domain}/locations/category/${category}`);
      const result = await response.json();

      if (!result.success) {
        console.error('Lỗi API:', result.message);
        return;
      }

      const items: any[] = result.data;
      if (!items || items.length === 0) return;

      const layerGroup = L.layerGroup();
      const icon = createMarkerIcon(category);

      items.forEach((item) => {
        const popup = L.popup({ maxWidth: 280 }).setContent(
          createPopupContent(item, category),
        );
        L.marker([item.lat, item.lon], { icon })
          .bindPopup(popup)
          .addTo(layerGroup);
      });

      layerGroup.addTo(map);

      if (!markerLayerMap.get(map)) {
        markerLayerMap.set(map, {});
      }
      markerLayerMap.get(map)[category] = layerGroup;

      const bounds = layerGroup.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error(`Lỗi fetch category "${category}":`, error);
    }
  } else {
    if (existing && map.hasLayer(existing)) {
      map.removeLayer(existing);
      const layers = markerLayerMap.get(map);
      if (layers) {
        delete layers[category];
        if (Object.keys(layers).length === 0) {
          markerLayerMap.delete(map);
        }
      }
    }
  }
}
