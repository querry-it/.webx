import L from 'leaflet';

export default function MarkerControl(map, lat, lon) {
  if (!map || !lat || !lon) return () => {};

  const marker = L.marker([lat, lon]).addTo(map);

  map.setView([lat, lon], 16);

  return () => {
    if (map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  };
}
