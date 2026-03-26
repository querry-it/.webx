// import classNames from 'classnames/bind';
// import L from 'leaflet';
// import 'leaflet-control-geocoder';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useRef, useState } from 'react';
// import { useEditor } from '../../../../state/useEditor';
// import HaNoiGeoMap from './../../../../assets/HaNoiGeoMap.json';
// import * as options from './components';
// import styles from './content.module.css';
// import * as control from './controls';

// const cx = classNames.bind(styles);

// export default function Content() {
//   const { state } = useEditor();
//   const mapRef = useRef<L.Map | null>(null);
//   const [option, setOption] = useState<String | null>(null);
//   const [locationId, setLocationId] = useState<string | null>(null);
//   const [dynamic, setDynamic] = useState<boolean>(false);

//   useEffect(() => {
//     const cleanupMap = control.InitBaseControl(mapRef);
//     const map = mapRef.current;
//     const cleanupHanoi = control.GeoLayerControl(map, HaNoiGeoMap);
//     const cleanupLocate = control.LocateControl(map);

//     return () => {
//       cleanupLocate();
//       cleanupHanoi();
//       cleanupMap();
//     };
//   }, []);

//   useEffect(() => {
//     const map = mapRef.current;

//     if (!map) return;

//     const lat = state.information.lat;
//     const lon = state.information.lon;

//     if (!lat || !lon) return;
//     const cleanupMarker = control.MarkerControl(map, lat, lon);

//     return cleanupMarker;
//   }, [state.information.lat, state.information.lon]);

//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     const start = state.information.point_start;
//     const end = state.information.point_end;

//     if (state.information.point_start && state.information.point_end) {
//       if (
//         state.information.point_start.lat === state.information.point_end.lat &&
//         state.information.point_start.lon === state.information.point_end.lon
//       ) {
//         alert('Điểm bắt đầu và điểm đến không thể giống nhau!');
//         return;
//       }

//       control.DrawControl(
//         map,
//         state.information.point_start,
//         state.information.point_end,
//       );
//     }
//   }, [state.information.point_start, state.information.point_end]);

//   useEffect(() => {
//     setOption(state.navbar_x.activeX);
//     setDynamic(state.navbar_x.dynamic);
//     setLocationId(state.information.locationid);
//   }, [
//     state.navbar_x.activeX,
//     state.navbar_x.dynamic,
//     state.information.locationid,
//   ]);
//   return (
//     <div className={cx('content')}>
//       <div id="map" className={cx('map')} />
//       <options.SearchComponent />
//       {option === 'roadmap' && <options.RoadMapComponent />}
//       {option === 'save' && <options.SaveComponent />}
//       {option === 'history' && <options.HistoryComponent />}
//       {option == 'introducer' && <options.BrandComponent />}
//       {option == 'help' && <options.SupportComponent />}
//       {dynamic && <options.DynamicComponent />}
//       {option == 'result' && <options.LocationComponent />}
//       {locationId && (
//         <options.IntroducerComponent key={locationId} locationId={locationId} />
//       )}
//       {state.navbar_x.introducerX && <options.IntroducerXComponent />}
//       {false && <options.ImageComponent />}
//       {state.navbar_x.detail && <options.DetaiConponent />}
//     </div>
//   );
// }

import classNames from 'classnames/bind';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useEditor } from '../../../../state/useEditor';
import HaNoiGeoMap from './../../../../assets/HaNoiGeoMap.json';
import * as options from './components';
import styles from './content.module.css';
import * as control from './controls';
import { DrawControl, clearRoute } from './controls/draw-control';

const cx = classNames.bind(styles);

export default function Content() {
  const { state, dispatch } = useEditor();
  const mapRef = useRef<L.Map | null>(null);
  const [option, setOption] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [dynamic, setDynamic] = useState<boolean>(false);

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  // Init map, base layer, Hanoi layer, locate control
  useEffect(() => {
    const cleanupMap = control.InitBaseControl(mapRef);
    const map = mapRef.current;
    const cleanupHanoi = map
      ? control.GeoLayerControl(map, HaNoiGeoMap)
      : () => {};
    const cleanupLocate = map ? control.LocateControl(map) : () => {};

    return () => {
      cleanupLocate();
      cleanupHanoi();
      cleanupMap();
      // Xóa route khi unmount
      if (map) clearRoute(map);
    };
  }, []);

  // Marker hiện tại
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const { lat, lon } = state.information;
    if (!lat || !lon) return;

    const cleanupMarker = control.MarkerControl(map, lat, lon);
    return cleanupMarker;
  }, [state.information.lat, state.information.lon]);

  // Draw route khi point_start và point_end thay đổi
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const start = state.information.point_start;
    const end = state.information.point_end;

    // Nếu 1 trong 2 điểm null → xóa route
    if (!start || !end) {
      clearRoute(map);
      return;
    }

    // Nếu 2 điểm trùng nhau → cảnh báo
    if (start.lat === end.lat && start.lon === end.lon) {
      alert('Điểm bắt đầu và điểm đến không thể giống nhau!');
      return;
    }

    const draw = async () => {
      try {
        await DrawControl(map, start, end);
      } catch (err) {
        console.error('Error drawing route:', err);
      }
    };

    draw();

    // Cleanup khi effect chạy lại hoặc unmount
    return () => {
      clearRoute(map);
    };
  }, [state.information.point_start, state.information.point_end]);

  // Cập nhật các option
  useEffect(() => {
    setOption(state.navbar_x.activeX);
    setDynamic(state.navbar_x.dynamic);
  }, [state.navbar_x.activeX, state.navbar_x.dynamic]);

  useEffect(() => {
    setLocationId(state.information.locationid);
  }, [state.information.locationid]);

  // Reset point chỉ khi activeX thay đổi (đổi tab/mode)
  useEffect(() => {
    setState('SET_INFORMATION', 'point_start', null);
    setState('SET_INFORMATION', 'point_end', null);
  }, [state.navbar_x.activeX]);

  return (
    <div className={cx('content')}>
      <div id="map" className={cx('map')} />
      <options.SearchComponent />
      {option === 'roadmap' && <options.RoadMapComponent />}
      {option === 'save' && <options.SaveComponent />}
      {option === 'history' && <options.HistoryComponent />}
      {option === 'introducer' && <options.BrandComponent />}
      {option === 'help' && <options.SupportComponent />}
      {dynamic && <options.DynamicComponent />}
      {option === 'result' && <options.LocationComponent />}
      {locationId && (
        <options.IntroducerComponent key={locationId} locationId={locationId} />
      )}
      {state.navbar_x.introducerX && <options.IntroducerXComponent />}
      {false && <options.ImageComponent />}
      {state.navbar_x.detail && <options.DetaiConponent />}
    </div>
  );
}
