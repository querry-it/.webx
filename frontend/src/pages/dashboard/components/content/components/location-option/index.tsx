import { Clock, Home, MapPinCheck, Search, X, List, Icon } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './location.module.css';
import { useEffect, useRef, useState } from 'react';
import { useEditor } from '../../../../../../state/useEditor';
import { domain } from '../../../../../../utils/domain';

const cx = classNames.bind(styles);

const categoryToVietnamese = (cat) => {
  const map = {
    history: 'Di tích',
    nature: 'Thiên nhiên',
    museum: 'Bảo tàng',
    architecture: 'Kiến trúc',
    street: 'Khu phố',
    park: 'Công viên',
    village: 'Làng cổ',
    bus: 'Bến xe',
    cafe: 'Quán cà phê',
    shop: 'Cửa hàng',
    restaurant: 'Khách sạn',
    metro: 'Bến tàu điện',
  };

  return map[cat] || 'Khác';
};

export interface Location {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  type: string;
  savedAt: string[];
}

export default function LocationComponent() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

  const [places, setPlaces] = useState<Location[]>([]);

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  useEffect(() => {
    const data = state.navbar_x.location_search;
    if (!Array.isArray(data)) return;

    const mapped = data.map((d) => ({
      id: d.id,
      name: d.name === '' ? d.address : d.name,
      rating: Number(d.rating_avg) || 0,
      reviews: Number(d.rating_count) || 0,
      type: categoryToVietnamese(d.category),
      savedAt: ['yêu thích của tôi.'],
      image:
        d.image === null
          ? 'avatars/4889286d-1732-48b4-8196-2c92dbb54306-1772812715326-49c08a57-9979-41cd-8af5-7def33b4ec28.webp'
          : d.image,
      lat: d.lat,
      lon: d.lon,
    }));

    setPlaces(mapped);
  }, [state.navbar_x.location_search]);

  const [activeItems, setActiveItems] = useState(null);

  const saveList = (savedAt) => {
    const firstSave = savedAt[0];
    if (savedAt.length === 1) {
      return `Đã lưu vào ${firstSave}`;
    } else if (savedAt.length === 2) {
      return `Đã lưu vào ${firstSave} và ${savedAt[1]}`;
    } else
      return `Đã lưu vào ${firstSave} và ${savedAt.length - 1} danh sách khác`;
  };

  return (
    <div className={cx('location__bgr')}>
      <div className={cx('location-search')}></div>

      <div className={cx('location-option')}>
        <div className={cx('location-option__grid')}>
          <div className={cx('space-above')}></div>
          <div className={cx('space-option')}>Kết quả</div>
          <div className={cx('space-below')}>
            <div className={cx('space-line')}></div>
          </div>
        </div>
      </div>

      <div className={cx('location-content')}>
        {places.map((place) => (
          <div
            key={place.id}
            className={cx('location-content__items', {
              'location-content__items-active': activeItems === place.id,
            })}
            onClick={() => {
              setActiveItems(place.id);
              setState('SET_INFORMATION', 'lat', place.lat);
              setState('SET_INFORMATION', 'lon', place.lon);
            }}
          >
            <div className={cx('location-content__information')}>
              <div className={cx('location-content__information-title')}>
                {place.name}
              </div>
              <div className={cx('location-content__information-review')}>
                <div className={cx('')}>{place.rating}</div>
                <div className={cx('star')}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const fill = Math.min(Math.max(place.rating - i, 0), 1);

                    return (
                      <span key={i} className={cx('star__icon')}>
                        <span className={cx('star-bg')}>★</span>
                        <span
                          className={cx('star-fg')}
                          style={{ width: `${fill * 100}%` }}
                        >
                          ★
                        </span>
                      </span>
                    );
                  })}
                </div>
                <div className="">{`(${place.reviews.toLocaleString('vi-VN')})`}</div>
              </div>
              <div className={cx('location-content__information-type')}>
                {place.type}
              </div>
            </div>
            <div className={cx('location-content__action')}>
              <img src={`${domain}/uploads/${place.image}`} alt="" />
            </div>

            <div className={cx('location-content__list-save')}>
              <div className={cx('list-icon')}>
                {place.savedAt.length > 0 ? (
                  <List size={12} strokeWidth={1.6} />
                ) : (
                  <div className={cx('icon-placeholder')} />
                )}
              </div>
              <div className={cx('list-save')}>
                {place.savedAt.length > 0 ? saveList(place.savedAt) : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
