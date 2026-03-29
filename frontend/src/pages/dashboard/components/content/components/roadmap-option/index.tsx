import classNames from 'classnames/bind';
import styles from './roadmap.module.css';
import { useEffect, useRef, useState } from 'react';
import { useEditor } from '../../../../../../state/useEditor';
import {
  Bike,
  Bus,
  Car,
  Footprints,
  Plane,
  SquareArrowOutUpRight,
  X,
  MapPin,
  Circle,
  EllipsisVertical,
  Clock,
  LocateFixed,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import { useFetchHistory } from '../../../../../../utils/fetchhistory';
import { fetchKeyword } from '../../../../../../utils/fetchkeyword';
import { isUUID } from '../../../../../../utils/validateuuid';

const cx = classNames.bind(styles);

interface Place {
  id: number;
  value: string;
  locationId: string | null;
  lat: number | null;
  lon: number | null;
}

export default function RoadMapComponent() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const pointStartRef = useRef<HTMLInputElement>(null);
  const pointEndRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>([
    {
      id: 1,
      value: 'Vị trí của bạn',
      lat: null,
      lon: null,
      locationId: '8f6c9d74-3e2a-4c0c-8b13-92e0e7b6f4c1',
    },
    { id: 2, value: '', lat: null, lon: null, locationId: null },
  ]);

  useEffect(() => {
    if (!state.navbar_x.point_end) return;
    const { lat, lon, locationId, value } = state.navbar_x.point_end;
    setPlaces([
      { ...places[0], value: '', lat: null, lon: null, locationId: null },
      {
        ...places[1],
        value: value,
        lat: lat,
        lon: lon,
        locationId: locationId,
      },
    ]);
    console.log('Roadmap: ', lat, lon);
  }, [state.navbar_x.point_end]);

  useEffect(() => {
    const change = setTimeout(() => {
      if (isUUID(places[0].locationId!) && isUUID(places[1].locationId!)) {
        setState('SET_INFORMATION', 'point_start', {
          lat: places[0].lat!,
          lon: places[0].lon!,
        });
        setState('SET_INFORMATION', 'point_end', {
          lat: places[1].lat!,
          lon: places[1].lon!,
        });
      }
      console.log(
        'state: ',
        state.information.point_end,
        state.information.point_start,
      );
    }, 300);
    return () => clearTimeout(change);
  }, [places]);

  const [locations, setLocations] = useState<
    { id: string; query: string; locationId: string }[]
  >([]);

  const handleChange = (id: number, key: keyof Place, value: any) => {
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, [key]: value } : place,
      ),
    );
  };

  const [fetchModel, setFetchModel] = useState<'history' | 'keyword' | null>(
    null,
  );
  const { fetchHistory } = useFetchHistory();

  useEffect(() => {
    setFetchModel('history');
    fetchHistory(setLocations);
    if (places[0].value) {
      pointEndRef.current?.focus();
    } else {
      pointStartRef.current?.focus();
    }
    setFocus(2);
  }, []);

  useEffect(() => {
    const index = focus === 1 ? 0 : 1;
    const keyword = places[index].value;

    if (places[index].locationId) {
      return;
    }

    if (places[index].value === '') {
      setFetchModel('history');
      fetchHistory(setLocations);
      return;
    }

    if (!keyword.trim()) {
      setLocations([]);
      return;
    }

    const timer = setTimeout(() => {
      setFetchModel('keyword');
      fetchKeyword(keyword, setLocations);
    }, 300);

    return () => clearTimeout(timer);
  }, [places, focus]);

  const clearFocus = (focus: number | null) => {
    handleChange(focus, 'value', '');
    handleChange(focus, 'locationId', null);
    handleChange(focus, 'lat', null);
    handleChange(focus, 'lon', null);
    setFocus(null);
  };

  return (
    <div className={cx('roadmap')}>
      <div className={cx('out')}>
        <SquareArrowOutUpRight
          size={IconRef.current.x}
          strokeWidth={IconRef.current.y}
        />
        <Car size={IconRef.current.x} strokeWidth={IconRef.current.y} />
        <Bus size={IconRef.current.x} strokeWidth={IconRef.current.y} />
        <Footprints size={IconRef.current.x} strokeWidth={IconRef.current.y} />
        <Bike size={IconRef.current.x} strokeWidth={IconRef.current.y} />
        <Plane size={IconRef.current.x} strokeWidth={IconRef.current.y} />
        <X
          size={IconRef.current.x}
          strokeWidth={IconRef.current.y}
          onClick={() => {
            setState('SET_NAVBAR_X', 'activeX', null);
            setState('SET_INFORMATION', 'point_start', null);
            setState('SET_INFORMATION', 'point_end', null);
            setState(
              'SET_NAVBAR_X',
              'clear_query',
              !state.navbar_x.clear_query,
            );
            setState('SET_NAVBAR_X', 'point_end', null);
            clearFocus(1);
            clearFocus(2);
          }}
          className="cursor-pointer"
        />
      </div>

      <div className="w-full mt-2 h-[112px] relative shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-[1fr_68%_1fr] justify-center gap-2 h-[110px]">
          <div className="grid grid-rows-3 pr-2">
            <div className="flex justify-end items-end">
              <Circle
                size={IconRef.current.x - 3}
                strokeWidth={IconRef.current.y}
              />
            </div>
            <div className="flex justify-end items-center">
              <EllipsisVertical
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
            </div>
            <div className="flex justify-end items-start">
              <MapPin
                size={IconRef.current.x - 3}
                strokeWidth={IconRef.current.y}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 py-3 relative">
            <input
              type="text"
              ref={pointStartRef}
              placeholder="Chọn điểm bắt đầu và điểm đến..."
              className="w-full h-full border border-gray-500 rounded-[6px] p-2 placeholder:text-gray-500 placeholder:font-normal outline-none focus:outline-3 focus:outline-blue-500"
              value={places[0].value}
              onChange={(e) => handleChange(1, 'value', e.target.value)}
              onClick={() => setFocus(1)}
            />
            <input
              type="text"
              ref={pointEndRef}
              placeholder="Chọn điểm đến..."
              className="w-full h-full border border-gray-500 rounded-[6px] p-2 placeholder:text-gray-500 placeholder:font-normal outline-none focus:outline-3 focus:outline-blue-500"
              value={places[1].value}
              onChange={(e) => handleChange(2, 'value', e.target.value)}
              onClick={() => setFocus(2)}
            />
            {((focus == 1 && places[0].value.trim()) ||
              (focus == 2 && places[1].value.trim())) && (
              <div
                className={`cursor-pointer absolute bg-white pl-2 ${focus == 1 ? 'top-[21px]' : 'bottom-[22px]'} right-2`}
              >
                <X
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                  onClick={() => {
                    clearFocus(focus);
                    if (focus === 1) {
                      pointStartRef.current?.focus();
                    } else {
                      pointEndRef.current?.focus();
                    }
                    setFocus(focus);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-start items-center">
            <div
              className="w-10 h-10 rounded-[50%] hover:bg-blue-100 flex justify-center items-center cursor-pointer"
              onClick={() => {
                handleChange(1, 'value', places[1].value);
                handleChange(1, 'locationId', places[1].locationId);
                handleChange(1, 'lat', places[1].lat);
                handleChange(1, 'lon', places[1].lon);
                handleChange(2, 'value', places[0].value);
                handleChange(2, 'locationId', places[0].locationId);
                handleChange(2, 'lat', places[0].lat);
                handleChange(2, 'lon', places[0].lon);
              }}
            >
              <ArrowUpDown
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y - 0.3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cx('mt-2 max-h-[74%] overflow-y-auto', 'hideScrollBar')}>
        {locations.map((place, index) => (
          <div
            key={index}
            className="flex p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              handleChange(focus, 'value', place.name);
              handleChange(focus, 'locationId', place.locationId);
              handleChange(focus, 'lat', place.lat);
              handleChange(focus, 'lon', place.lon);
            }}
          >
            {/* Icon */}
            <div className="w-[60px] flex justify-center pt-2 shrink-0">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex justify-center items-center">
                {place.locationId === '8f6c9d74-3e2a-4c0c-8b13-92e0e7b6f4c1' ? (
                  <LocateFixed
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                  />
                ) : fetchModel === 'history' ? (
                  <Clock
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                  />
                ) : (
                  <Search
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col min-w-0">
              <div className="text-[14px] font-medium truncate">
                {place.name}
              </div>

              <div className="text-[14px] text-gray-600 truncate">
                {place.address}
              </div>

              <div className="flex items-center gap-1 text-[14px]">
                <span
                  className={place.open ? 'text-green-600' : 'text-red-600'}
                >
                  {place.status === null ? '' : place.status}
                </span>
                <span className="text-gray-600">
                  {place.openTime
                    ? ` - Mở cửa lúc ${place.openTime}`
                    : 'Giờ mở cửa chưa xác định'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
