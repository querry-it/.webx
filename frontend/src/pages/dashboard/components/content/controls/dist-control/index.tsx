import L from 'leaflet';

const palette = [
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
  '#e67e22',
  '#e91e63',
  '#00bcd4',
  '#8bc34a',
];

const districtColor = {};
let colorIdx = 0;

function getDistrictColor(name) {
  if (!name) return '#95a5a6';
  if (!districtColor[name]) {
    districtColor[name] = palette[colorIdx++ % palette.length];
  }
  return districtColor[name];
}

function getNameFromProps(props) {
  return (
    props.NAME_2 ||
    props.name ||
    props.NAME ||
    props.district ||
    props.ten ||
    props.TEN ||
    props.DISTRICT ||
    'Không xác định'
  );
}

const layerMap = new WeakMap();

export function createDistMapLayer(map, data) {
  if (!map || !data) return null;

  const oldLayer = layerMap.get(map);
  if (oldLayer && map.hasLayer(oldLayer)) map.removeLayer(oldLayer);

  const layer = L.geoJSON(data, {
    style: (feature) => {
      const name = getNameFromProps(feature.properties);
      return {
        color: '#333',
        weight: 1.8,
        opacity: 0.9,
        fillColor: getDistrictColor(name),
        fillOpacity: 0.45,
      };
    },
    onEachFeature: (feature, layer) => {
      const name = getNameFromProps(feature.properties);
      layer.bindTooltip(`<b>${name}</b>`, { sticky: true, direction: 'top' });

      layer.on({
        mouseover(e) {
          e.target.setStyle({ fillOpacity: 0.75, weight: 3 });
          e.target.bringToFront();
        },
        mouseout(e) {
          layerMap.get(map)?.resetStyle(e.target);
        },
      });
    },
  });

  layerMap.set(map, layer);

  return layer;
}

export function toggleDistMap(map, show) {
  const layer = layerMap.get(map);
  if (!map || !layer) return;

  if (show) {
    if (!map.hasLayer(layer)) map.addLayer(layer);
  } else {
    if (map.hasLayer(layer)) map.removeLayer(layer);
  }
}
