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

  useEffect(() => {
    console.log('travel_01: ', state.information.travel_01);
  }, [state.information.travel_01]);

  useEffect(() => {
    console.log('travel_02: ', state.information.travel_02);
  }, [state.information.travel_02]);

  useEffect(() => {
    console.log('travel_03: ', state.information.travel_03);
  }, [state.information.travel_03]);

  useEffect(() => {
    console.log('travel_04: ', state.information.travel_04);
  }, [state.information.travel_04]);

  useEffect(() => {
    console.log('travel_05: ', state.information.travel_05);
  }, [state.information.travel_05]);

  useEffect(() => {
    console.log('travel_06: ', state.information.travel_06);
  }, [state.information.travel_06]);

  useEffect(() => {
    console.log('travel_07: ', state.information.travel_07);
  }, [state.information.travel_07]);

  useEffect(() => {
    console.log('travel_08: ', state.information.travel_08);
  }, [state.information.travel_08]);

  useEffect(() => {
    console.log('travel_09: ', state.information.travel_09);
  }, [state.information.travel_09]);

  useEffect(() => {
    console.log('travel_10: ', state.information.travel_10);
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
