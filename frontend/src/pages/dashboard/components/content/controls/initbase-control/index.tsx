// import L from "leaflet";

// export default function initBaseMap(mapRef) {
//     if (mapRef.current) return () => {};

//     const map = L.map("map", {
//         center: [21.0, 105.7542],
//         zoom: 10,
//         minZoom: 1,
//         maxZoom: 100,
//         zoomControl: false,
//         attributionControl: false,
//     });

//     mapRef.current = map;

//     L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
//     L.control.zoom({ position: "bottomright" }).addTo(map);

//     const streets = L.tileLayer(
//         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//         { maxZoom: 100 },
//     ).addTo(map);

//     const satellite = L.tileLayer(
//         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         { maxZoom: 100 },
//     );

//     const terrain = L.tileLayer(
//         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
//         { maxZoom: 100 },
//     );

//     L.control
//         .layers(
//             {
//                 Streets: streets,
//                 Satellite: satellite,
//                 Terrain: terrain,
//             },
//             undefined,
//             { position: "bottomleft" },
//         )
//         .addTo(map);

//     return () => {
//         map.remove();
//         mapRef.current = null;
//     };
// }

import L from 'leaflet';
import 'leaflet-routing-machine';
import { places } from '../places';

const CATEGORY_CONFIG: Record<
  string,
  { gradient: [string, string]; stroke: string }
> = {
  history: { gradient: ['#ff6b6b', '#c0392b'], stroke: '#a93226' },
  nature: { gradient: ['#6bcf8f', '#1e8449'], stroke: '#1a6e3c' },
  museum: { gradient: ['#b388ff', '#6a1b9a'], stroke: '#4a148c' },
  architecture: { gradient: ['#ffb347', '#d35400'], stroke: '#a04000' },
  street: { gradient: ['#ffe066', '#b8860b'], stroke: '#8a6300' },
  park: { gradient: ['#64b5f6', '#1565c0'], stroke: '#0d47a1' },
  village: { gradient: ['#d4a26b', '#7b4f1e'], stroke: '#5a3510' },
};

const ICON_INNER: Record<string, string> = {
  history: `<text x="34" y="33" text-anchor="middle" font-size="11" font-weight="600" fill="#c0392b" font-family="sans-serif">Di</text>`,

  nature: `<path d="M34 21Q41 25 41 30Q41 37 34 37Q27 37 27 30Q27 25 34 21Z" fill="#1e8449" opacity=".85"/>`,

  museum: `
    <rect x="27" y="22" width="3" height="12" rx="1" fill="#6a1b9a"/>
    <rect x="32.5" y="22" width="3" height="12" rx="1" fill="#6a1b9a"/>
    <rect x="38" y="22" width="3" height="12" rx="1" fill="#6a1b9a"/>
    <rect x="25" y="34" width="18" height="2" rx="1" fill="#6a1b9a"/>`,

  architecture: `
    <rect x="27" y="26" width="14" height="10" rx="1" fill="none" stroke="#d35400" stroke-width="1.4"/>
    <path d="M27 26L34 20L41 26" fill="none" stroke="#d35400" stroke-width="1.4"/>
    <rect x="31" y="29" width="6" height="7" rx=".5" fill="#d35400" opacity=".5"/>`,

  street: `
    <circle cx="34" cy="21" r="3" fill="#b8860b"/>
    <line x1="34" y1="24" x2="34" y2="32" stroke="#b8860b" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="34" y1="27" x2="30" y2="31" stroke="#b8860b" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="34" y1="27" x2="38" y2="31" stroke="#b8860b" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="34" y1="32" x2="31" y2="36" stroke="#b8860b" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="34" y1="32" x2="37" y2="36" stroke="#b8860b" stroke-width="1.5" stroke-linecap="round"/>`,

  park: `
    <polygon points="34,19 41,32 27,32" fill="#1565c0" opacity=".85"/>
    <rect x="32.5" y="32" width="3" height="5" rx="1" fill="#1565c0" opacity=".7"/>`,

  village: `
    <rect x="28" y="27" width="12" height="8" rx=".5" fill="none" stroke="#7b4f1e" stroke-width="1.3"/>
    <path d="M26 27L34 21L42 27" fill="none" stroke="#7b4f1e" stroke-width="1.3"/>
    <rect x="32" y="29" width="4" height="6" rx=".5" fill="#7b4f1e" opacity=".5"/>`,
};

const CATEGORY_LABEL: Record<string, string> = {
  history: 'Di tích lịch sử',
  nature: 'Thiên nhiên',
  museum: 'Bảo tàng',
  architecture: 'Kiến trúc',
  street: 'Khu phố',
  park: 'Công viên',
  village: 'Làng cổ',
};

function createMarkerIcon(category: string): L.DivIcon {
  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.history;
  const { gradient, stroke } = config;
  const uid = `g-${category}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 84" width="26" height="34">
    <defs>
      <radialGradient id="${uid}" cx="40%" cy="30%" r="60%">
        <stop offset="0%" stop-color="${gradient[0]}"/>
        <stop offset="100%" stop-color="${gradient[1]}"/>
      </radialGradient>
    </defs>
    <path d="M34 4C14 4 10 20 10 30C10 50 34 80 34 80C34 80 58 50 58 30C58 20 54 4 34 4Z"
          fill="url(#${uid})" stroke="${stroke}" stroke-width="1.5"/>
    <circle cx="34" cy="28" r="15" fill="white"/>
    ${ICON_INNER[category] ?? ICON_INNER.history}
  </svg>`;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -34],
  });
}

const iconCache = new Map<string, L.DivIcon>();

function getIcon(category: string): L.DivIcon {
  if (!iconCache.has(category)) {
    iconCache.set(category, createMarkerIcon(category));
  }
  return iconCache.get(category)!;
}

function injectPopupStyles() {
  if (document.getElementById('map-popup-style')) return;
  const style = document.createElement('style');
  style.id = 'map-popup-style';
  style.textContent = `
    .map-popup .leaflet-popup-content-wrapper {
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    .map-popup .leaflet-popup-content { margin: 0; }
    .map-popup .leaflet-popup-tip-container { display: none; }
  `;
  document.head.appendChild(style);
}

export default function initBaseMap(
  mapRef: React.MutableRefObject<L.Map | null>,
) {
  if (mapRef.current) return () => {};

  const map = L.map('map', {
    center: [21.0, 105.7542],
    zoom: 10,
    minZoom: 1,
    maxZoom: 100,
    zoomControl: false,
    attributionControl: false,
  });

  mapRef.current = map;

  injectPopupStyles();

  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const streets = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 100 },
  ).addTo(map);

  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 100 },
  );

  const terrain = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 100 },
  );

  L.control
    .layers(
      { Streets: streets, Satellite: satellite, Terrain: terrain },
      undefined,
      { position: 'bottomleft' },
    )
    .addTo(map);

  places.forEach((place) => {
    const icon = getIcon(place.category);
    const popup = L.popup({ closeButton: false, className: 'map-popup' })
      .setContent(`
        <div style="font-family:sans-serif;min-width:130px;padding:10px">
          <p style="font-weight:600;font-size:14px;color:#1f2937;margin:0 0 4px">${place.label}</p>
          <p style="font-size:12px;color:#9ca3af;margin:0 0 12px">${CATEGORY_LABEL[place.category] ?? place.category}</p>
          <button
            onclick="window.__learnMore?.('${place.id}')"
            style="width:100%;padding:6px 0;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500"
            onmouseover="this.style.background='#1d4ed8'"
            onmouseout="this.style.background='#2563eb'"
          >Tìm hiểu</button>
        </div>
      `);

    const marker = L.marker([place.lat, place.lon], { icon }).addTo(map);
    marker.bindPopup(popup);
    marker.on('click', () => console.log(place.label));
  });

  (window as any).__learnMore = (id: string) => {
    const place = places.find((p) => String(p.id) === id);
    if (!place) return;
    console.log('Tìm hiểu:', place.label);
  };

  let waypoints: L.LatLng[] = [];
  let routingControl: L.Routing.Control | null = null;

  map.on('click', (e) => {
    waypoints.push(e.latlng);

    if (waypoints.length === 2) {
      if (routingControl) map.removeControl(routingControl);

      routingControl = (L as any).Routing.control({
        waypoints,
        router: (L as any).Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          profile: 'driving',
        }),
        lineOptions: {
          styles: [{ color: '#2563eb', weight: 5, opacity: 0.8 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(map);

      waypoints = [];
    }
  });

  return () => {
    if (routingControl) map.removeControl(routingControl);
    map.remove();
    mapRef.current = null;
  };
}
