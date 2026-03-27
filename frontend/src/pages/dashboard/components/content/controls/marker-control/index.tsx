import L from 'leaflet';
import { createLogoMarker } from '../components/icon';

export default function MarkerControl(
  map: L.Map,
  lat: number,
  lon: number,
  options?: {
    imgUrl?: string;
    size?: [number, number];
    padding?: number;
    borderColor?: string;
    borderWidth?: number;
    popupContent?: string;
  },
) {
  if (!map || !lat || !lon) return () => {};

  const icon = createLogoMarker(
    options?.imgUrl ||
      'http://localhost:5000/uploads/avatars/4889286d-1732-48b4-8196-2c92dbb54306-1772812715326-49c08a57-9979-41cd-8af5-7def33b4ec28.webp',
    options?.size || [35, 35],
    options?.padding ?? 2,
    options?.borderColor || '#2563eb',
    options?.borderWidth ?? 2,
  );

  const marker = L.marker([lat, lon], { icon }).addTo(map);

  if (options?.popupContent) {
    marker.bindPopup(options.popupContent);
  }

  map.setView([lat, lon], 16);

  return () => {
    if (map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  };
}
