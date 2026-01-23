import L from "leaflet";

const Style = {
    color: "blueviolet",
    weight: 2,
    fillColor: "#FFAAAA",
    fillOpacity: 0.25,
};

export default function HanoiGeoLayer(map, data) {
    if (!data || data.type !== "FeatureCollection") {
        return () => {};
    }

    const layer = L.geoJSON(data, {
        style: Style,
        onEachFeature: (feature, layer) => {
            if (feature.properties?.name) {
                layer.bindPopup(`<b>${feature.properties.name}</b>`);
            }
        },
    });

    layer.addTo(map);

    return () => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    };
}
