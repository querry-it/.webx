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

const cx = classNames.bind(styles);

export default function Content() {
  const { state } = useEditor();
  const mapRef = useRef<L.Map | null>(null);
  const [option, setOption] = useState<String | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [dynamic, setDynamic] = useState<boolean>(false);

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
    const map = mapRef.current;

    if (!map) return;

    const lat = state.information.lat;
    const lon = state.information.lon;

    if (!lat || !lon) return;

    const cleanupMarker = control.MarkerControl(map, lat, lon);

    return cleanupMarker;
  }, [state.information.lat, state.information.lon]);

  useEffect(() => {
    setOption(state.navbar_x.activeX);
    setDynamic(state.navbar_x.dynamic);
    setLocationId(state.information.locationid);
  }, [
    state.navbar_x.activeX,
    state.navbar_x.dynamic,
    state.information.locationid,
  ]);
  return (
    <div className={cx('content')}>
      <div id="map" className={cx('map')} />
      <options.SearchComponent />
      {option === 'roadmap' && <options.RoadMapComponent />}
      {option === 'save' && <options.SaveComponent />}
      {option === 'history' && <options.HistoryComponent />}
      {option == 'introducer' && <options.BrandComponent />}
      {option == 'help' && <options.SupportComponent />}
      {dynamic && <options.DynamicComponent />}
      {option == 'result' && <options.LocationComponent />}
      {locationId && (
        <options.IntroducerComponent key={locationId} locationId={locationId} />
      )}
      {state.navbar_x.introducerX && <options.IntroducerXComponent />}
      {false && <options.ImageComponent />}
      {state.navbar_x.detail && <options.DetaiConponent />}
    </div>
  );
}
