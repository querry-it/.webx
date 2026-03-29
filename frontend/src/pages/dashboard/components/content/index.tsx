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
import DistMap from './../../../../assets/distmap_00.1.0.json';
import GeoJson from './../../../../assets/geojson_07.1.1.json';
import TrafficJson from './../../../../assets/random_roads.json';
import Hanoi from './../../../../assets/hanoi.json';
import * as options from './components';
import styles from './content.module.css';
import * as control from './controls';
import { DrawControl, clearRoute } from './controls/draw-control';
import { toggleGeoLayer } from './controls/geomap-control';
import { toggleDistMap } from './controls/dist-control';
import { toggleGeoJSONLayer } from './controls/geojson-control';
import { toggleTrafficLayer } from './controls/traffic-control';
import { toggleTemperLayer } from './controls/temper-control';
import {
  toggleMarkerLayer,
  registerMarkerHandlers,
} from './controls/points-control';
import { toggleRouteLayer } from './controls/travel-control';

const cx = classNames.bind(styles);

function useMarkerLayer(
  mapRef: React.RefObject<L.Map | null>,
  category: string,
  active: boolean,
) {
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleMarkerLayer(map, category, active);
    return () => {
      toggleMarkerLayer(map, category, false);
    };
  }, [active]);
}

function useRouteLayer(
  mapRef: React.RefObject<L.Map | null>,
  routeId: string,
  active: boolean,
  colorIndex: number,
) {
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleRouteLayer(map, routeId, active, true, colorIndex);
    return () => {
      toggleRouteLayer(map, routeId, false, true, colorIndex);
    };
  }, [active]);
}

export default function Content() {
  const { state, dispatch } = useEditor();
  const mapRef = useRef<L.Map | null>(null);
  const [option, setOption] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [dynamic, setDynamic] = useState<boolean>(false);

  const setState = (option: string, key: string, value: any) => {
    dispatch({ type: option, payload: { [key]: value } });
  };

  useEffect(() => {
    const cleanupMap = control.InitBaseControl(mapRef);
    const map = mapRef.current;
    const cleanupLocate = map ? control.LocateControl(map) : () => {};
    registerMarkerHandlers(dispatch, () => state.navbar_x.clear_query);
    return () => {
      cleanupLocate();
      cleanupMap();
      if (map) clearRoute(map);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleGeoLayer(map, HaNoiGeoMap, state.information.class_01);
  }, [state.information.class_01]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleDistMap(map, DistMap, state.information.class_02);
  }, [state.information.class_02]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleGeoJSONLayer(map, GeoJson, state.information.class_03);
  }, [state.information.class_03]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    toggleTrafficLayer(map, TrafficJson, state.information.class_04);
  }, [state.information.class_04]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    toggleTemperLayer(map, Hanoi, state.information.class_05);
  }, [state.information.class_05]);

  useMarkerLayer(mapRef, 'history', state.information.marker_01);
  useMarkerLayer(mapRef, 'nature', state.information.marker_02);
  useMarkerLayer(mapRef, 'museum', state.information.marker_03);
  useMarkerLayer(mapRef, 'architecture', state.information.marker_04);
  useMarkerLayer(mapRef, 'street', state.information.marker_05);
  useMarkerLayer(mapRef, 'park', state.information.marker_06);
  useMarkerLayer(mapRef, 'village', state.information.marker_07);
  useMarkerLayer(mapRef, 'bus', state.information.marker_08);
  useMarkerLayer(mapRef, 'cafe', state.information.marker_09);
  useMarkerLayer(mapRef, 'shop', state.information.marker_10);
  useMarkerLayer(mapRef, 'restaurant', state.information.marker_11);
  useMarkerLayer(mapRef, 'metro', state.information.marker_12);

  useRouteLayer(
    mapRef,
    '6f2c1a9d-4c11-4f2b-9c10-111111111111',
    state.information.travel_01,
    0,
  );
  useRouteLayer(
    mapRef,
    '7a3d2b8e-5d22-4c3b-8d21-222222222222',
    state.information.travel_02,
    1,
  );
  useRouteLayer(
    mapRef,
    '8b4e3c9f-6e33-4d4c-9e32-333333333333',
    state.information.travel_03,
    2,
  );
  useRouteLayer(
    mapRef,
    '9c5f4d0a-7f44-4e5d-8f43-444444444444',
    state.information.travel_04,
    3,
  );
  useRouteLayer(
    mapRef,
    'ad6e5f1b-8055-4f6e-9f54-555555555555',
    state.information.travel_05,
    4,
  );
  useRouteLayer(
    mapRef,
    'be7f601c-9166-4a7f-8b65-666666666666',
    state.information.travel_06,
    5,
  );
  useRouteLayer(
    mapRef,
    'cf80112d-a277-4b8a-9c76-777777777777',
    state.information.travel_07,
    6,
  );
  useRouteLayer(
    mapRef,
    'd081223e-b388-4c9b-8d87-888888888888',
    state.information.travel_08,
    7,
  );
  useRouteLayer(
    mapRef,
    'e192334f-c499-4dac-9d98-999999999999',
    state.information.travel_09,
    8,
  );
  useRouteLayer(
    mapRef,
    'f2a3445g-d5aa-4ebc-8e0a-aaaaaaaaaaaa',
    state.information.travel_10,
    9,
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const { lat, lon } = state.information;
    if (!lat || !lon) return;
    const cleanupMarker = control.MarkerControl(map, lat, lon);
    return cleanupMarker;
  }, [state.information.lat, state.information.lon]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const start = state.information.point_start;
    const end = state.information.point_end;

    if (!start || !end) {
      clearRoute(map);
      return;
    }

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

    return () => {
      clearRoute(map);
    };
  }, [state.information.point_start, state.information.point_end]);

  useEffect(() => {
    setOption(state.navbar_x.activeX);
    setDynamic(state.navbar_x.dynamic);
  }, [state.navbar_x.activeX, state.navbar_x.dynamic]);

  useEffect(() => {
    setLocationId(state.information.locationid);
  }, [state.information.locationid]);

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
