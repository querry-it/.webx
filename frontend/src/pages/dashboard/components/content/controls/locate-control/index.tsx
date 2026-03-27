import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import { Locate } from 'lucide-react';
import { createLogoMarker } from '../components/icon';

export default function LocationControl(map: L.Map) {
  let root = null;
  let currentMarker: L.Marker | null = null;
  const control = L.control({ position: 'bottomright' });

  const onLocationError = () => {
    alert('Không thể xác định vị trí của bạn!');
  };

  control.onAdd = () => {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

    const btn = L.DomUtil.create(
      'button',
      'p-[4px] bg-white rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center',
      div,
    );

    root = createRoot(btn);
    root.render(<Locate size={20} strokeWidth={1.6} />);

    btn.onclick = () => {
      map.locate({ setView: true, maxZoom: 16 });

      map.once('locationfound', (e) => {
        const { latitude, longitude } = e;

        if (currentMarker && map.hasLayer(currentMarker)) {
          map.removeLayer(currentMarker);
        }

        const icon = createLogoMarker(
          'http://localhost:5000/uploads/avatars/4889286d-1732-48b4-8196-2c92dbb54306-1772812715326-49c08a57-9979-41cd-8af5-7def33b4ec28.webp', // Icon mặc định
          [35, 35],
          2,
          '#2563eb',
          2,
        );

        currentMarker = L.marker([latitude, longitude], { icon }).addTo(map);
      });
    };

    L.DomEvent.disableClickPropagation(btn);
    map.on('locationerror', onLocationError);

    return div;
  };

  control.onRemove = () => {
    map.off('locationerror', onLocationError);
    if (currentMarker && map.hasLayer(currentMarker)) {
      map.removeLayer(currentMarker);
    }
    root?.unmount();
  };

  control.addTo(map);
  return () => control.remove();
}
