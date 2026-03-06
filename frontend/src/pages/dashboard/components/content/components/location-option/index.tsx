import { Clock, Home, MapPinCheck, Search, X, List, Icon } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './location.module.css';
import { useRef, useState } from 'react';
import { useEditor } from '../../../../../../state/useEditor';

const cx = classNames.bind(styles);

const places = [
  {
    id: 1,
    name: 'Hoàng thành Thăng Long',
    rating: 4.6,
    reviews: 15432,
    type: 'Di tích lịch sử',
    savedAt: ['favorite', 'wishlist'],
  },
  {
    id: 2,
    name: 'Văn Miếu - Quốc Tử Giám',
    rating: 4.5,
    reviews: 20345,
    type: 'Di tích văn hóa',
    savedAt: ['visited'],
  },
  {
    id: 3,
    name: 'Cố đô Huế',
    rating: 4.7,
    reviews: 18721,
    type: 'Di sản văn hóa thế giới',
    savedAt: ['wishlist', 'favorite', 'visited'],
  },
  {
    id: 4,
    name: 'Phố cổ Hội An',
    rating: 4.8,
    reviews: 25467,
    type: 'Di sản văn hóa thế giới',
    savedAt: [],
  },
  {
    id: 5,
    name: 'Thánh địa Mỹ Sơn',
    rating: 4.4,
    reviews: 11234,
    type: 'Di tích tôn giáo',
    savedAt: ['visited'],
  },
  {
    id: 6,
    name: 'Địa đạo Củ Chi',
    rating: 4.6,
    reviews: 16789,
    type: 'Di tích chiến tranh',
    savedAt: ['wishlist'],
  },
  {
    id: 7,
    name: 'Nhà tù Hỏa Lò',
    rating: 4.7,
    reviews: 14321,
    type: 'Di tích lịch sử',
    savedAt: ['favorite', 'visited'],
  },
  {
    id: 8,
    name: 'Thành nhà Hồ',
    rating: 4.3,
    reviews: 8456,
    type: 'Di sản văn hóa thế giới',
    savedAt: [],
  },
  {
    id: 9,
    name: 'Đền Hùng',
    rating: 4.6,
    reviews: 19234,
    type: 'Di tích tâm linh',
    savedAt: ['wishlist', 'favorite'],
  },
  {
    id: 10,
    name: 'Chùa Một Cột',
    rating: 4.5,
    reviews: 21098,
    type: 'Di tích tôn giáo',
    savedAt: ['favorite'],
  },
];

export default function LocationComponent() {
  const { dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

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
            onClick={() => setActiveItems(place.id)}
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
              <div className={cx('action__wrapper')}>
                <button className={cx('action__btn')}>
                  <MapPinCheck
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                  ></MapPinCheck>
                </button>
              </div>
              <span className={cx('action__switch')}>Đường đi</span>
            </div>
            {place.savedAt.length > 0 && (
              <div className={cx('location-content__list-save')}>
                <div className={cx('list-icon')}>
                  <List size={12} strokeWidth={IconRef.current.y} />
                </div>
                <div className={cx('list-save')}>{saveList(place.savedAt)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
