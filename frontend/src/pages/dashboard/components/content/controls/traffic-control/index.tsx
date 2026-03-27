import L from 'leaflet';

const layerMap = new WeakMap();

function getTrafficColor(fclass, maxspeed) {
  let speed = maxspeed || 0;

  if (speed === 0) {
    if (fclass === 'motorway' || fclass === 'motorway_link') speed = 80;
    else if (fclass === 'trunk' || fclass === 'trunk_link') speed = 70;
    else if (fclass === 'primary' || fclass === 'primary_link') speed = 50;
    else if (fclass === 'secondary' || fclass === 'secondary_link') speed = 40;
    else speed = 30;
  }

  if (speed <= 40) return '#ff4444';
  else if (speed <= 60) return '#ffaa33';
  else return '#44cc44';
}

function getTrafficLevel(fclass, maxspeed) {
  let speed = maxspeed || 0;

  if (speed === 0) {
    if (fclass === 'motorway' || fclass === 'motorway_link') speed = 80;
    else if (fclass === 'trunk' || fclass === 'trunk_link') speed = 70;
    else if (fclass === 'primary' || fclass === 'primary_link') speed = 50;
    else if (fclass === 'secondary' || fclass === 'secondary_link') speed = 40;
    else speed = 30;
  }

  if (speed <= 40) return 'Mật độ cao - Ùn tắc nhiều';
  else if (speed <= 60) return 'Mật độ trung bình - Lưu lượng đông';
  else return 'Mật độ thấp - Thông thoáng';
}

function getRoadName(properties) {
  if (properties.name && properties.name !== '') return properties.name;
  if (properties.ref && properties.ref !== '') return `Đường ${properties.ref}`;
  return 'Đường không tên';
}

function createPopupContent(properties) {
  const roadName = getRoadName(properties);
  const trafficLevel = getTrafficLevel(properties.fclass, properties.maxspeed);

  let borderColor = '#ff4444';
  if (trafficLevel.includes('Trung bình')) borderColor = '#ffaa33';
  if (trafficLevel.includes('Thấp')) borderColor = '#44cc44';

  return `
        <div style="min-width: 220px; font-family: 'Segoe UI', sans-serif;">
            <div style="font-size: 15px; font-weight: bold; margin-bottom: 8px; padding-bottom: 5px; border-bottom: 2px solid ${borderColor};">
                ${roadName}
            </div>
            <div style="padding: 6px 8px; border-radius: 5px; background: ${borderColor}20; color: ${borderColor}; font-weight: bold; text-align: center;">
                ${trafficLevel}
            </div>
        </div>
    `;
}

function getFeatureStyle(feature) {
  const props = feature.properties;
  const color = getTrafficColor(props.fclass, props.maxspeed);

  let weight = 3;
  if (props.fclass === 'motorway' || props.fclass === 'motorway_link')
    weight = 5;
  else if (props.fclass === 'trunk' || props.fclass === 'trunk_link')
    weight = 4.5;
  else if (props.fclass === 'primary' || props.fclass === 'primary_link')
    weight = 4;
  else if (props.fclass === 'secondary' || props.fclass === 'secondary_link')
    weight = 3.5;
  else weight = 3;

  return { color: color, weight: weight, opacity: 0.85 };
}

function onEachFeature(feature, layer) {
  if (feature.properties) {
    layer.bindPopup(createPopupContent(feature.properties));

    layer.on('mouseover', function () {
      const style = getFeatureStyle(feature);
      this.setStyle({ weight: style.weight + 2, opacity: 1 });
    });

    layer.on('mouseout', function () {
      const style = getFeatureStyle(feature);
      this.setStyle({ weight: style.weight, opacity: style.opacity });
    });
  }
}

function processData(data) {
  if (Array.isArray(data)) {
    return { type: 'FeatureCollection', features: data };
  }
  return data;
}

export function toggleTrafficLayer(map, data, show) {
  if (!map || !data) return;

  const existing = layerMap.get(map);

  if (show) {
    if (existing && map.hasLayer(existing)) return;

    const layer = L.geoJSON(processData(data), {
      style: getFeatureStyle,
      onEachFeature: onEachFeature,
      coordsToLatLng: (coords) => L.latLng(coords[1], coords[0]),
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
