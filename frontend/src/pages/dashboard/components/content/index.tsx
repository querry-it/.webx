import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";

export default function Content() {

    useEffect(() => {
        if (L.DomUtil.get("map")?._leaflet_id) return;

        const map = L.map("map").setView([21.0278, 105.8342], 11);

        // ================== BASE MAP ==================
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

        // ================== HÀ NỘI GEOJSON ==================
        if (
            HaNoiGeoMap &&
            HaNoiGeoMap.type === "FeatureCollection" &&
            Array.isArray(HaNoiGeoMap.features)
        ) {
            const hanoiLayer = L.geoJSON(HaNoiGeoMap as any, {
                style: {
                    color: "#FF0000",
                    weight: 3,
                    fillColor: "#FFAAAA",
                    fillOpacity: 0.2,
                },
                onEachFeature: (feature: any, layer) => {
                    if (feature.properties?.name) {
                        layer.bindPopup(`<b>${feature.properties.name}</b>`);
                    }
                },
            }).addTo(map);

            // fit map theo ranh giới Hà Nội
            map.fitBounds(hanoiLayer.getBounds());
        } else {
            console.error("GeoJSON Hà Nội không hợp lệ");
        }

        // ================== SCALE ==================
        L.control.scale({ imperial: false }).addTo(map);

        // ================== SEARCH ==================
        // L.Control.geocoder({
        //     defaultMarkGeocode: true,
        //     placeholder: "Tìm địa điểm...",
        // }).addTo(map);

        // ================== ROUTING ==================
        // L.Routing.control({
        //     waypoints: [
        //         L.latLng(21.0278, 105.8342),
        //         L.latLng(21.035, 105.85),
        //     ],
        //     routeWhileDragging: true,
        //     geocoder: L.Control.Geocoder.nominatim(),
        //     showAlternatives: true,
        //     lineOptions: {
        //         styles: [{ color: "red", opacity: 0.8, weight: 6 }],
        //     },
        // }).addTo(map);

        // ================== LOCATE BUTTON ==================
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

        // map.on("locationfound", function (e) {
        //     L.marker(e.latlng)
        //         .addTo(map)
        //         .bindPopup("Bạn đang ở đây")
        //         .openPopup();
        // });

        map.on("locationerror", function () {
            alert("Không thể xác định vị trí của bạn!");
        });
    }, []);

    return <div id="map" style={{ height: "100%", width: "100%" }} />;
}
