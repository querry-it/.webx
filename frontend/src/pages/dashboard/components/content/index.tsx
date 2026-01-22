import classNames from "classnames/bind";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import {
    Amphora,
    Bike,
    Building2,
    Bus,
    Car,
    Clock,
    Ellipsis,
    Footprints,
    Home,
    Landmark,
    Leaf,
    Map,
    Plane,
    ReceiptText,
    Search,
    SquareArrowOutUpRight,
    Star,
    Trees,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
// import Save from "./components/save__option";
import styles from "./content.module.css";

const cx = classNames.bind(styles);

export default function Content() {
    const [options, SetOptions] = useState<boolean>(false);
    const [search, SetSearch] = useState<boolean>(true);
    const [roadmap, SetRoadMap] = useState<boolean>(false);
    const mapRef = useRef<L.Map | null>(null);
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

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
            {false && (
                <div className={cx("search")}>
                    <div className={cx("search__input")}>
                        <div className={cx("search__input--title")}>
                            <input
                                onFocus={() => SetSearch(false)}
                                onBlur={() => SetSearch(true)}
                                type="text"
                                placeholder="Tìm kiếm trên IchigoMazone Maps"
                            />
                        </div>
                        <div className={cx("search__input--icon")}>
                            <Search
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                            />
                        </div>
                        <div
                            className={cx("search__input--road")}
                            onClick={(e) => {
                                e.stopPropagation();
                                SetOptions(false);
                                SetSearch(false);
                                SetRoadMap(true);
                            }}
                        >
                            <SquareArrowOutUpRight
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                            />
                        </div>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <ReceiptText size={20} strokeWidth={1.6} />
                        <p>Tất cả các điểm </p>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <Landmark
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Di tích</p>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <Trees
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Thiên nhiên</p>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <Amphora
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Bảo tàng</p>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <Building2
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Kiến trúc</p>
                    </div>
                    <div className={cx("search__sightseeing")}>
                        <Map
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Khu phố</p>
                    </div>
                    <div
                        className={cx("search__sightseeing")}
                        onClick={() => {
                            SetOptions(!options);
                            console.log("Click");
                        }}
                    >
                        <Ellipsis
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Lựa chọn khác</p>
                    </div>
                </div>
            )}
            {false && (
                <div className={cx("search-x")}>
                    <div className={cx("search__input")}>
                        <div className={cx("search__input--title")}>
                            <input
                                onFocus={() => SetSearch(false)}
                                onBlur={() => SetSearch(true)}
                                type="text"
                                placeholder="Tìm kiếm trên IchigoMazone Maps"
                            />
                        </div>
                        <div className={cx("search__input--icon")}>
                            <Search
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                            />
                        </div>
                        <div className={cx("search__input--road")}>
                            <SquareArrowOutUpRight
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                            />
                        </div>
                    </div>
                    <div className={cx("items")}>
                        <Home
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items")}>
                        <Clock
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items")}>
                        <Clock
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items")}>
                        <Clock
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items")}>
                        <Clock
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items")}>
                        <Clock
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon")}
                        />
                        <p className={cx("title")}>Nhà riêng</p>
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            className={cx("icon_x")}
                        />
                    </div>
                    <div className={cx("items_x")}>
                        <p className={cx("title")}>
                            Nội dung tìm kiếm khác gần đây
                        </p>
                    </div>
                </div>
            )}
            {false && (
                <div className={cx("options__input")}>
                    <div className={cx("item")}>
                        <Star
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Biểu tượng</p>
                    </div>
                    <div className={cx("item")}>
                        <Leaf
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Công viên</p>
                    </div>
                    <div className={cx("item")}>
                        <Home
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <p>Làng cổ</p>
                    </div>
                </div>
            )}
            {false && (
                <div className={cx("roadmap")}>
                    <div className={cx("out")}>
                        <SquareArrowOutUpRight
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <Car
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <Bus
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <Footprints
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <Bike
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <Plane
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                            onClick={() => {
                                SetRoadMap(false);
                                SetSearch(true);
                            }}
                        />
                    </div>
                </div>
            )}
            {false && <Save />}
            {false && (
                <>
                    <div className={cx("save__option")}></div>
                    <div className={cx("search-x")}>
                        <div className={cx("search__input")}>
                            <div className={cx("search__input--title")}>
                                <input
                                    onFocus={() => SetSearch(false)}
                                    onBlur={() => SetSearch(true)}
                                    type="text"
                                    placeholder="Tìm kiếm trên IchigoMazone Maps"
                                />
                            </div>
                            <div className={cx("search__input--icon")}>
                                <Search
                                    size={IconRef.current.x}
                                    strokeWidth={IconRef.current.y}
                                />
                            </div>
                            <div className={cx("search__input--road")}>
                                <X
                                    size={IconRef.current.x}
                                    strokeWidth={IconRef.current.y}
                                />
                            </div>
                        </div>
                        <div className={cx("items")}>
                            <Home
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items")}>
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items")}>
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items")}>
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items")}>
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items")}>
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon")}
                            />
                            <p className={cx("title")}>Nhà riêng</p>
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className={cx("icon_x")}
                            />
                        </div>
                        <div className={cx("items_x")}>
                            <p className={cx("title")}>
                                Nội dung tìm kiếm khác gần đây
                            </p>
                        </div>
                    </div>
                </>
            )}
            {false && <div className={cx("location__option")}></div>}
            {true  && <div className={cx("location__add")}></div>}
            {false && <div className={cx("location__prev")}></div>}
            {false && <div className={cx("location__image")}></div>}
        </div>
    );
}
