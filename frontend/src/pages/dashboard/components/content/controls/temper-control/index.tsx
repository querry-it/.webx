import L from 'leaflet';

const layerMap = new WeakMap();
const colorStops = [
  { temp: 5, color: { r: 173, g: 216, b: 230 } }, // xanh da trời nhạt
  { temp: 15, color: { r: 0, g: 0, b: 139 } }, // xanh da trời đậm
  { temp: 25, color: { r: 144, g: 238, b: 144 } }, // xanh lá nhạt
  { temp: 30, color: { r: 0, g: 100, b: 0 } }, // xanh lá đậm
  { temp: 38, color: { r: 255, g: 182, b: 193 } }, // đỏ nhạt
  { temp: 45, color: { r: 139, g: 0, b: 0 } }, // đỏ đậm
];

function interpolateColorBetween(temp, stop1, stop2) {
  const ratio = (temp - stop1.temp) / (stop2.temp - stop1.temp);
  const r = Math.round(stop1.color.r + (stop2.color.r - stop1.color.r) * ratio);
  const g = Math.round(stop1.color.g + (stop2.color.g - stop1.color.g) * ratio);
  const b = Math.round(stop1.color.b + (stop2.color.b - stop1.color.b) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

function interpolateColor(temp) {
  for (let i = 0; i < colorStops.length - 1; i++) {
    if (temp >= colorStops[i].temp && temp <= colorStops[i + 1].temp) {
      return interpolateColorBetween(temp, colorStops[i], colorStops[i + 1]);
    }
  }
  if (temp <= colorStops[0].temp) {
    const c = colorStops[0].color;
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
  const c = colorStops[colorStops.length - 1].color;
  return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

const realTempMin = 25;
const realTempMax = 28;

const tempCache = new Map();
let featureIndex = 0;

function getRealTemperatureForFeature(featureId) {
  if (tempCache.has(featureId)) return tempCache.get(featureId);
  const step = (realTempMax - realTempMin) / 100;
  const temp = realTempMin + (featureIndex % 100) * step;
  featureIndex++;
  tempCache.set(featureId, temp);
  return temp;
}

function getStyleForFeature(feature, showTemp) {
  const featureId = feature.properties?.GID_3 || `f_${Math.random()}`;
  const realTemp = getRealTemperatureForFeature(featureId);
  return {
    fillColor: showTemp ? interpolateColor(realTemp) : '#e0e0e0',
    weight: 0.2,
    opacity: 0.8,
    color: '#ffffff',
    fillOpacity: 0.7,
  };
}

function onEachFeature(feature, layer) {
  const name2 = feature.properties?.NAME_2 || '';
  const name3 = feature.properties?.NAME_3 || '';
  const featureId = feature.properties?.GID_3 || `f_${Math.random()}`;
  const realTemp = getRealTemperatureForFeature(featureId);
  layer.bindPopup(`${name2} - ${name3}<br>${realTemp.toFixed(1)}°C`);
}

export function toggleTemperLayer(map, data, show) {
  if (!map || !data) return;

  const existing = layerMap.get(map);

  if (show) {
    if (existing && map.hasLayer(existing)) return;

    const layer = L.geoJSON(data, {
      style: (feature) => getStyleForFeature(feature, show),
      onEachFeature: onEachFeature,
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
