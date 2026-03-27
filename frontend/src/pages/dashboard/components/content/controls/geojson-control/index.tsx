import L from 'leaflet';

// Lưu layer theo map để tránh conflict
const layerMap = new WeakMap();

// Toggle layer GeoJSON giống class_01
export function toggleGeoJSONLayer(map, data, show) {
  if (!map || !data) return;

  const existing = layerMap.get(map);

  if (show) {
    if (existing && map.hasLayer(existing)) return;

    const layer = L.geoJSON(data, {
      style: () => ({
        color: '#3498db',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.1,
      }),
    });

    layer.addTo(map);
    layerMap.set(map, layer);
  } else {
    if (existing && map.hasLayer(existing)) {
      map.removeLayer(existing);
      layerMap.delete(map);
    }
  }
}
