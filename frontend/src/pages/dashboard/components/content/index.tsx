import classNames from "classnames/bind";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
import styles from "./content.module.css";

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

    const redIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const blueIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const greenIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const orangeIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const violetIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });


    // L.marker([21.0278, 105.8342], { icon: redIcon })
    //     .addTo(map)
    //     .bindPopup("Hà Nội");



    // L.control.scale({ imperial: false }).addTo(map);
    //I. Di tích lịch sử – văn hóa 
    const m1 = L.marker([21.029649, 105.852391], { icon: redIcon }).bindPopup("Hồ Gươm");
    const m2 = L.marker([21.0282716,105.8351749], { icon: redIcon }).bindPopup("Văn Miếu – Quốc Tử Giám");
    const m3 = L.marker([21.03708754172572, 105.83466669702568], { icon: redIcon }).bindPopup("Lăng Chủ tịch Hồ Chí Minh");
    const m4 = L.marker([21.035847701804062, 105.83339458168251], { icon: redIcon }).bindPopup("Chùa Một Cột");
    const m5 = L.marker([21.035403330012095, 105.84024866818984], { icon: redIcon }).bindPopup("Hoàng Thành Thăng Long");
    const m6 = L.marker([21.03088856381647, 105.85235391051818], { icon: redIcon }).bindPopup("Đền Ngọc Sơn");
    const m7 = L.marker([21.036239, 105.833180], { icon: redIcon }).bindPopup("Cột cờ Hà Nội");
    const m8 = L.marker([21.025489912948366, 105.84654247004018], { icon: redIcon }).bindPopup("Nhà tù Hỏa Lò");
    const m9 = L.marker([21.043187707244712, 105.83649255284674], { icon: redIcon }).bindPopup("Đền Quán Thánh");
    const m10 = L.marker([21.055301430969163, 105.81968588168283], { icon: redIcon }).bindPopup("Phủ Tây Hồ");
    const m11 = L.marker([21.048179227826175, 105.8366964561122], { icon: redIcon }).bindPopup("Chùa Trấn Quốc");
    const m12 = L.marker([21.1866, 105.7407], { icon: redIcon }).bindPopup("Đền thờ Hai Bà Trưng");
    const m13 = L.marker([20.5610, 105.7434], { icon: redIcon }).bindPopup("Chùa Hương");
    const m14 = L.marker([21.023085, 105.646341], { icon: redIcon }).bindPopup("Chùa Thầy");

    //II. Danh lam thắng cảnh – không gian tự nhiên
    const m15 = L.marker([21.05294533692013, 105.81716997497028], { icon: blueIcon }).bindPopup("Hồ Tây");
    const m16 = L.marker([21.014461170625268, 105.84392948168215], { icon: blueIcon }).bindPopup("Công viên Thống Nhất");
    const m17 = L.marker([20.964521122581512, 105.85462843935309], { icon: blueIcon }).bindPopup("Công viên Yên Sở");
    const m18 = L.marker([21.031288896878284, 105.80377538627002], { icon: blueIcon }).bindPopup("Vườn thú Hà Nội");
    const m19 = L.marker([21.078732210361288, 105.83523461051885], { icon: blueIcon }).bindPopup("Bãi đá sông Hồng");
    const m20 = L.marker([21.084768159640916, 105.81503572586227], { icon: blueIcon }).bindPopup("Vườn hoa Nhật Tân");
    const m21 = L.marker([21.2686, 105.8069], { icon: blueIcon }).bindPopup("Hồ Hàm Lợn");
    const m22 = L.marker([20.8833, 105.6436], { icon: blueIcon }).bindPopup("Đồi Bù");
    const m23 = L.marker([21.0767, 105.3719], { icon: blueIcon }).bindPopup("Vườn quốc gia Ba Vì");

    //III. Bảo tàng – giáo dục – nghệ thuật
    const m24 = L.marker([21.040542450831676, 105.79874612586154], { icon: greenIcon }).bindPopup("Bảo tàng Dân tộc học Việt Nam");
    const m25 = L.marker([21.024749660184863, 105.85928648538342], { icon: greenIcon }).bindPopup("Bảo tàng Lịch sử Quốc gia");
    const m26 = L.marker([21.03080466422437, 105.83654862033596], { icon: greenIcon }).bindPopup("Bảo tàng Mỹ thuật Việt Nam");
    const m27 = L.marker([21.023573673651455, 105.8515002528465], { icon: greenIcon }).bindPopup("Bảo tàng Phụ nữ Việt Nam");
    const m28 = L.marker([21.035847701804062, 105.83339458168251], { icon: greenIcon }).bindPopup("Bảo tàng Hồ Chí Minh");

    //IV. Công trình kiến trúc – biểu tượng đô thị
    const m29 = L.marker([21.02444407248131, 105.8576253970255], { icon: orangeIcon }).bindPopup("Nhà hát Lớn Hà Nội");
    const m30 = L.marker([21.041974135480455, 105.85450259702567], { icon: orangeIcon }).bindPopup("Cầu Long Biên");
    const m31 = L.marker([21.028775938034077, 105.84886059702563], { icon: orangeIcon }).bindPopup("Nhà thờ Lớn Hà Nội");
    const m32 = L.marker([21.037553286113557, 105.83612411828467], { icon: orangeIcon }).bindPopup("Quảng trường Ba Đình");
    const m33 = L.marker([21.03206780587155, 105.85156496818975], { icon: orangeIcon }).bindPopup("Quảng trường Đông Kinh – Nghĩa Thục");

    //V. Khu phố – điểm tham quan trải nghiệm
    const m34 = L.marker([21.034085276428925, 105.85068849133326], { icon: violetIcon }).bindPopup("Khu Phố cổ Hà Nội");
    const m35 = L.marker([21.031988969028003, 105.8514998834726], { icon: violetIcon }).bindPopup("Phố đi bộ Hồ Gươm");
    const m36 = L.marker([21.025162097871412, 105.84786796272483], { icon: violetIcon }).bindPopup("Phố sách Hà Nội");
    const m37 = L.marker([20.97467522346447, 105.9133841664678], { icon: violetIcon }).bindPopup("Làng gốm Bát Tràng");
    const m38 = L.marker([21.157433541252747, 105.47257281380062], { icon: violetIcon }).bindPopup("Làng cổ Đường Lâm");


    const group = L.featureGroup([
      m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14,
      m15, m16, m17, m18, m19, m20, m21, m22, m23,
      m24, m25, m26, m27, m28,
      m29, m30, m31, m32, m33,
      m34, m35, m36, m37, m38,
    ]).addTo(map);


    // Zoom để thấy cả 2 điểm
    map.fitBounds(group.getBounds());



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
    <div className={cx("content")}>
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
      <div className={cx("search")}>
        <input type="text" />
      </div>
    </div>
  );
}
