import classNames from "classnames/bind";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import HaNoiGeoMap from "./../../../../assets/HaNoiGeoMap.json";
import * as options from "./components";
import * as control from "./controls";
import styles from "./content.module.css";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function Content() {
    const { state } = useEditor();
    const mapRef = useRef<L.Map | null>(null);
    const [option, setOption] = useState<String | null>(null);

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

    useEffect(() => {
        setOption(state.navbar_x.activeX);
    }, [state.navbar_x.activeX]);

    return (
        <div className={cx("content")}>
            <div id="map" className={cx("map")} />
            {true && <options.SearchComponent />}
            {/* {true && <options.SearchXComponent />} */}
            {/* {true && <options.SearchYComponent />} */}
            {option === "roadmap" && <options.RoadMapComponent />}
            {option === "save" && <options.SaveComponent />}
            {option === "history" && <options.HistoryComponent />}
            {state.navbar_x.dynamic && <options.DynamicComponent />}
            {false && <options.IntroducerComponent />}
            {false && <options.IntroducerXComponent />}
            {false && <options.ImageComponent />}
        </div>
    );
}
