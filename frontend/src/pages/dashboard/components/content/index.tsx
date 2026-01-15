import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";

const hanoiBoundaryGeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { name: "Hà Nội" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [105.3, 20.6],
                        [106.0, 20.6],
                        [106.0, 21.4],
                        [105.3, 21.4],
                        [105.3, 20.6],
                    ],
                ],
            },
        },
    ],
};

export default function Content() {
    useEffect(() => {
        console.log(HaNoiGeoMap);
    }, []);

    useEffect(() => {
        if (L.DomUtil.get("map")?._leaflet_id) return;

        const map = L.map("map").setView([21.0278, 105.8342], 11);

        // 3 bản đồ toggle
        const streets = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { maxZoom: 19 }
        ).addTo(map);
        const satellite = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { maxZoom: 19 }
        );
        const terrain = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            { maxZoom: 19 }
        );

        L.control
            .layers({
                Streets: streets,
                Satellite: satellite,
                Terrain: terrain,
            })
            .addTo(map);

        // Ranh giới Hà Nội
        L.geoJSON(hanoiBoundaryGeoJSON, {
            style: {
                color: "#FF0000",
                weight: 3,
                fillColor: "#FFAAAA",
                fillOpacity: 0.2,
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`<b>${feature.properties.name}</b>`);
            },
        }).addTo(map);

        // Scale
        L.control.scale({ imperial: false }).addTo(map);

        // Search box
        L.Control.geocoder({
            defaultMarkGeocode: true,
            placeholder: "Tìm địa điểm...",
        }).addTo(map);

        // Routing
        L.Routing.control({
            waypoints: [L.latLng(21.0278, 105.8342), L.latLng(21.035, 105.85)],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
            showAlternatives: true,
            lineOptions: {
                styles: [{ color: "red", opacity: 0.8, weight: 6 }],
            },
        }).addTo(map);

        // 🔹 Thêm nút bấm "Vị trí của tôi"
        const locateControl = L.control({ position: "topright" });
        locateControl.onAdd = function () {
            const div = L.DomUtil.create(
                "div",
                "leaflet-bar leaflet-control leaflet-control-custom"
            );
            div.innerHTML = `<button style="padding:4px 8px; cursor:pointer;">📍 Vị trí của tôi</button>`;
            div.onclick = () => {
                map.locate({ setView: true, maxZoom: 16 });
            };
            return div;
        };
        locateControl.addTo(map);

        // Xử lý sự kiện locationfound / locationerror
        map.on("locationfound", function (e) {
            L.marker(e.latlng)
                .addTo(map)
                .bindPopup("Bạn đang ở đây")
                .openPopup();
        });
        map.on("locationerror", function () {
            alert("Không thể xác định vị trí của bạn!");
        });
    }, []);

    return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}
