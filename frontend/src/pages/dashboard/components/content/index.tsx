import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
import styles from "./content.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Content() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    // Điểm móc ban đầu
    mapRef.current = L.map("map", {
      center: [20.98, 105.7942],
      zoom: 10,
      minZoom: 1,
      maxZoom: 100,
    });

    const map = mapRef.current;

    // Các options của map
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
      .layers(
        {
          Streets: streets,
          Satellite: satellite,
          Terrain: terrain,
        },
        undefined,
        { position: "topright" }
      )
      .addTo(map);

    // Ranh giới Hà Nội
    if (HaNoiGeoMap && HaNoiGeoMap.type === "FeatureCollection") {
      const hanoiLayer = L.geoJSON(HaNoiGeoMap as any, {
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

    L.control.scale({ imperial: false }).addTo(map);

    // Nút lấy vị trí của tôi
    const locateControl = L.control({ position: "topright" });
    locateControl.onAdd = () => {
      const div = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      div.innerHTML = `
                <button style="
                    padding:4px 8px;
                    cursor:pointer;
                    background:white;
                    border:none;
                ">
                    📍 Vị trí của tôi
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
    <div
      id="map"
      style={{
        height: "100%",
        width: "100%",
        border: "none",
        outline: "none",
        boxShadow: "none",
      }}
    />
  );
}
