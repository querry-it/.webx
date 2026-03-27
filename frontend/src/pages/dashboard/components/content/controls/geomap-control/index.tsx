import L from 'leaflet';

const layerMap = new WeakMap();

export function GeoLayerControl(map, data) {
  if (!map || !data) return () => {};

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
    if (existing && map.hasLayer(existing)) return;
    GeoLayerControl(map, data);
  } else {
    if (existing && map.hasLayer(existing)) {
      map.removeLayer(existing);
      layerMap.delete(map);
    }
  }
}
