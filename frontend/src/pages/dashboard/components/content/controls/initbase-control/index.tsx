import L from "leaflet";

export default function initBaseMap(mapRef) {
    if (mapRef.current) return () => {};

    const map = L.map("map", {
        center: [21.0, 105.7542],
        zoom: 10,
        minZoom: 1,
        maxZoom: 100,
        zoomControl: false,
        attributionControl: false,
    });

    mapRef.current = map;

    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    const streets = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { maxZoom: 100 },
    ).addTo(map);

    const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 100 },
    );

    const terrain = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 100 },
    );

    L.control
        .layers(
            {
                Streets: streets,
                Satellite: satellite,
                Terrain: terrain,
            },
            undefined,
            { position: "bottomleft" },
        )
        .addTo(map);

    return () => {
        map.remove();
        mapRef.current = null;
    };
}
