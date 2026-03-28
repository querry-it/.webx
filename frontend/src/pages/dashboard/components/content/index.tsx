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
import * as options from './components';
import styles from './content.module.css';
import * as control from './controls';
import { DrawControl, clearRoute } from './controls/draw-control';
import { toggleGeoLayer } from './controls/geomap-control';
import { toggleDistMap } from './controls/dist-control';
import { toggleGeoJSONLayer } from './controls/geojson-control';
import { toggleTrafficLayer } from './controls/traffic-control';
import { toggleMarkerLayer } from './controls/points-control';
import { toggleRouteLayer } from './controls/travel-control';

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

  useEffect(() => {
    const cleanupMap = control.InitBaseControl(mapRef);
    const map = mapRef.current;
    const cleanupLocate = map ? control.LocateControl(map) : () => {};
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
    console.log('class_05: ', state.information.class_05);
  }, [state.information.class_05]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'history', state.information.marker_01);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'history', false);
    };
  }, [state.information.marker_01]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'nature', state.information.marker_02);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'nature', false);
    };
  }, [state.information.marker_02]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'museum', state.information.marker_03);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'museum', false);
    };
  }, [state.information.marker_03]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'architecture', state.information.marker_04);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'architecture', false);
    };
  }, [state.information.marker_04]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'street', state.information.marker_05);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'street', false);
    };
  }, [state.information.marker_05]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'park', state.information.marker_06);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'park', false);
    };
  }, [state.information.marker_06]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'village', state.information.marker_07);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'village', false);
    };
  }, [state.information.marker_07]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'bus', state.information.marker_08);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'bus', false);
    };
  }, [state.information.marker_08]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'cafe', state.information.marker_09);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'cafe', false);
    };
  }, [state.information.marker_09]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'shop', state.information.marker_10);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'shop', false);
    };
  }, [state.information.marker_10]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'restaurant', state.information.marker_11);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'restaurant', false);
    };
  }, [state.information.marker_11]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleMarkerLayer(map, 'metro', state.information.marker_12);
    };
    toggle();

    return () => {
      toggleMarkerLayer(map, 'metro', false);
    };
  }, [state.information.marker_12]);

  // travel_01
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        '6f2c1a9d-4c11-4f2b-9c10-111111111111',
        state.information.travel_01,
        true,
        0,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        '6f2c1a9d-4c11-4f2b-9c10-111111111111',
        false,
        true,
        0,
      );
    };
  }, [state.information.travel_01]);

  // travel_02
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        '7a3d2b8e-5d22-4c3b-8d21-222222222222',
        state.information.travel_02,
        true,
        1,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        '7a3d2b8e-5d22-4c3b-8d21-222222222222',
        false,
        true,
        1,
      );
    };
  }, [state.information.travel_02]);

  // travel_03
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        '8b4e3c9f-6e33-4d4c-9e32-333333333333',
        state.information.travel_03,
        true,
        2,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        '8b4e3c9f-6e33-4d4c-9e32-333333333333',
        false,
        true,
        2,
      );
    };
  }, [state.information.travel_03]);

  // travel_04
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        '9c5f4d0a-7f44-4e5d-8f43-444444444444',
        state.information.travel_04,
        true,
        3,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        '9c5f4d0a-7f44-4e5d-8f43-444444444444',
        false,
        true,
        3,
      );
    };
  }, [state.information.travel_04]);

  // travel_05
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'ad6e5f1b-8055-4f6e-9f54-555555555555',
        state.information.travel_05,
        true,
        4,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'ad6e5f1b-8055-4f6e-9f54-555555555555',
        false,
        true,
        4,
      );
    };
  }, [state.information.travel_05]);

  // travel_06
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'be7f601c-9166-4a7f-8b65-666666666666',
        state.information.travel_06,
        true,
        5,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'be7f601c-9166-4a7f-8b65-666666666666',
        false,
        true,
        5,
      );
    };
  }, [state.information.travel_06]);

  // travel_07
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'cf80112d-a277-4b8a-9c76-777777777777',
        state.information.travel_07,
        true,
        6,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'cf80112d-a277-4b8a-9c76-777777777777',
        false,
        true,
        6,
      );
    };
  }, [state.information.travel_07]);

  // travel_08
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'd081223e-b388-4c9b-8d87-888888888888',
        state.information.travel_08,
        true,
        7,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'd081223e-b388-4c9b-8d87-888888888888',
        false,
        true,
        7,
      );
    };
  }, [state.information.travel_08]);

  // travel_09
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'e192334f-c499-4dac-9d98-999999999999',
        state.information.travel_09,
        true,
        8,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'e192334f-c499-4dac-9d98-999999999999',
        false,
        true,
        8,
      );
    };
  }, [state.information.travel_09]);

  // travel_10
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const toggle = async () => {
      await toggleRouteLayer(
        map,
        'f2a3445g-d5aa-4ebc-8e0a-aaaaaaaaaaaa',
        state.information.travel_10,
        true,
        9,
      );
    };
    toggle();

    return () => {
      toggleRouteLayer(
        map,
        'f2a3445g-d5aa-4ebc-8e0a-aaaaaaaaaaaa',
        false,
        true,
        9,
      );
    };
  }, [state.information.travel_10]);

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
