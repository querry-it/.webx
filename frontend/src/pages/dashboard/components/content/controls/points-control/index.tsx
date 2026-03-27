import L from 'leaflet';

const markerLayerMap = new WeakMap();
const MARKER_CONFIG = {
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

function createMarkerIcon(category: string) {
  const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];

  return L.divIcon({
    html: `
      <div style="
        background: ${config.color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-size: 14px;
      ">
        ${config.icon}
      </div>
    `,
    className: '',
    iconSize: [15, 15],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function createPopupContent(item: any, category: string) {
  const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];
  const rating = parseFloat(item.rating_avg).toFixed(1);
  const ratingText =
    rating !== '0.0'
      ? `⭐ ${rating} (${item.rating_count})`
      : 'Chưa có đánh giá';

  const touristCategories = [
    'history',
    'nature',
    'street',
    'park',
    'village',
    'architecture',
    'museum',
  ];

  const serviceCategories = ['cafe', 'metro', 'restaurant', 'bus', 'shop'];

  let buttonHtml = '';

  if (!touristCategories.includes(category)) {
    buttonHtml = `
      <button 
        onclick="window.__navigateTo?.(${item.lat}, ${item.lon}, '${item.name}')"
        style="
          width: 100%;
          padding: 6px 0;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          margin-top: 8px;
          transition: all 0.2s;
        "
        onmouseover="this.style.background='#1d4ed8'"
        onmouseout="this.style.background='#2563eb'"
      >
        Dẫn đường
      </button>
    `;
  } else if (!serviceCategories.includes(category)) {
    buttonHtml = `
      <button 
        onclick="window.__learnMore?.('${item.id}', '${category}')"
        style="
          width: 100%;
          padding: 6px 0;
          background: #f59e0b;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          margin-top: 8px;
          transition: all 0.2s;
        "
        onmouseover="this.style.background='#d97706'"
        onmouseout="this.style.background='#f59e0b'"
      >
        Tìm hiểu
      </button>
    `;
  }

  return `
    <div style="min-width: 220px; font-family: 'Segoe UI', sans-serif; padding: 8px;">
      <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #1f2937; display: flex; align-items: center; gap: 6px;">
        <span>${config.icon}</span>
        <span>${item.name}</span>
      </div>
      <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">
        ${item.address || 'Không có địa chỉ'}
      </div>
      <div style="font-size: 11px; color: #f59e0b; margin-bottom: 6px;">
        ${ratingText}
      </div>
      <div style="font-size: 10px; color: ${config.color}; margin-bottom: 8px;">
        ${config.name}
      </div>
      ${buttonHtml}
    </div>
  `;
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

    try {
      const config = MARKER_CONFIG[category as keyof typeof MARKER_CONFIG];
      if (!config) {
        console.error('Không tìm thấy category:', category);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/locations/category/${category}`,
      );
      const result = await response.json();

      if (!result.success) {
        console.error('Lỗi:', result.message);
        return;
      }

      const items = result.data;
      if (!items || items.length === 0) return;

      const layerGroup = L.layerGroup();
      const icon = createMarkerIcon(category);

      items.forEach((item: any) => {
        L.marker([item.lat, item.lon], { icon })
          .bindPopup(createPopupContent(item, category))
          .addTo(layerGroup);
      });

      layerGroup.addTo(map);

      if (!markerLayerMap.get(map)) {
        markerLayerMap.set(map, {});
      }
      markerLayerMap.get(map)[category] = layerGroup;

      if (layerGroup.getBounds().isValid()) {
        map.fitBounds(layerGroup.getBounds(), { padding: [50, 50] });
      }
    } catch (error) {
      console.error(`Lỗi fetch ${category}:`, error);
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
