import classNames from "classnames/bind";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
import SearchComponent from "./components/search-option";
import styles from "./content.module.css";
import SearchXComponent from "./components/searchX-option";
import SearchYComponent from "./components/searchY-option";
import RoadMapComponent from "./components/roadmap-option";
import HistoryComponent from "./components/history-option";
import SaveComponent from "./components/save-option";

const cx = classNames.bind(styles);

export default function Content() {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) return;

        // Điểm móc ban đầu
        mapRef.current = L.map("map", {
            center: [21.0, 105.7542],
            zoom: 10,
            minZoom: 1,
            maxZoom: 100,
            zoomControl: false,
            attributionControl: false,
        });

        const map = mapRef.current;

        L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

        map.zoomControl?.remove();
        map.attributionControl?.remove();

        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Các options của map
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

        // Ranh giới Hà Nội
        if (HaNoiGeoMap && HaNoiGeoMap.type === "FeatureCollection") {
            L.geoJSON(HaNoiGeoMap as any, {
                style: {
                    color: "blueviolet",
                    weight: 2,
                    fillColor: "#FFAAAA",
                    fillOpacity: 0.25,
                },
                onEachFeature: (feature: any, layer) => {
                    if (feature.properties?.name) {
                        layer.bindPopup(`<b>${feature.properties.name}</b>`);
                    }
                },
            }).addTo(map);
        }

        // Nút lấy vị trí của tôi
        const locateControl = L.control({ position: "bottomright" });
        locateControl.onAdd = () => {
            const div = L.DomUtil.create(
                "div",
                "leaflet-bar leaflet-control leaflet-control-custom",
            );
            div.innerHTML = `
                <button style="
                    padding: 7px;
                    cursor:pointer;
                    background:white;
                    border:none;
                    border-radius: 5px;
                ">
                    📍
                </button>
            `;
            div.onclick = () => {
                map.locate({ setView: true, maxZoom: 16 });
            };
            return div;
        };
        locateControl.addTo(map);

        map.on("locationerror", () => {
            alert("Không thể xác định vị trí của bạn!");
        });

        // Return useEff
        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div className={cx("content")}>
            <div id="map" className={cx("map")} />
            {false && <SearchComponent />}
            {false && <SearchXComponent />}
            {false && <SearchYComponent />}
            {false && <RoadMapComponent />}
            {true && <SaveComponent />}
            {false && <HistoryComponent />}
            {false && <div className={cx("location__option")}></div>}
            {false && <div className={cx("location__add")}></div>}
            {false && <div className={cx("location__prev")}></div>}
            {false && <div className={cx("location__image")}></div>}
        </div>
    );
}
