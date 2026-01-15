import { FeatureCollection } from 'geojson';
import hanoiBoundaryGeoJSON from '../assets/HaNoiGeoMap.json';

const getHanoiBoundaryGeoJSON = (): FeatureCollection => {
  return hanoiBoundaryGeoJSON as FeatureCollection;
};

export default getHanoiBoundaryGeoJSON;
