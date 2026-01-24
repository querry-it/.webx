import classNames from "classnames/bind";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
import * as options from "./components";
import * as control from "./controls";
import styles from "./content.module.css";

const cx = classNames.bind(styles);

export default function Content() {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const cleanupMap = control.InitBaseControl(mapRef);
        const map = mapRef.current;
        const cleanupHanoi = control.GeoLayerControl(map, HaNoiGeoMap);
        const cleanupLocate = control.LocateControl(map);

        return () => {
            cleanupLocate();
            cleanupHanoi();
            cleanupMap();
        };
    }, []);

    return (
        <div className={cx("content")}>
            <div id="map" className={cx("map")} />
            {true && <options.SearchComponent />}
            {false && <options.SearchXComponent />}
            {false && <options.SearchYComponent />}
            {false && <options.RoadMapComponent />}
            {false && <options.SaveComponent />}
            {false && <options.HistoryComponent />}
            {true && <options.DynamicComponent />}
            {false && <options.IntroducerComponent />}
            {false && <options.IntroducerXComponent />}
            {false && <options.ImageComponent />}
        </div>
    );
}
