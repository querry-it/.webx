import L from 'leaflet';

// lưu layer theo map để tránh conflict nếu dùng nhiều map
const layerMap = new WeakMap();

export function GeoLayerControl(map, data) {
  if (!map || !data) return () => {};

  // Nếu đã có layer cho map này → xóa trước khi tạo mới
  const oldLayer = layerMap.get(map);
  if (oldLayer && map.hasLayer(oldLayer)) {
    map.removeLayer(oldLayer);
  }

  const layer = L.geoJSON(data, {
    style: {
      color: 'royalblue',
      weight: 2,
      fillColor: 'transparent',
      fillOpacity: 0,
    },
  });

  layer.addTo(map);
  layerMap.set(map, layer);

  return () => {
    if (layerMap.get(map) && map.hasLayer(layer)) {
      map.removeLayer(layer);
      layerMap.delete(map);
    }
  };
}

export function toggleGeoLayer(map, data, show) {
  if (!map) return;

  const existing = layerMap.get(map);

  if (show) {
    // đã bật rồi → không làm gì
    if (existing && map.hasLayer(existing)) return;
    GeoLayerControl(map, data);
  } else {
    // tắt layer
    if (existing && map.hasLayer(existing)) {
      map.removeLayer(existing);
      layerMap.delete(map);
    }
  }
}
