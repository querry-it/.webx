import { useEffect, useRef, useState } from 'react';
import {
  BookmarkCheck,
  X,
  Square,
  Check,
  Share2,
  MapPinCheck,
} from 'lucide-react';
import { useEditor } from '../../../../../../state/useEditor';
import classNames from 'classnames/bind';
import styles from './history.module.css';

const cx = classNames.bind(styles);

const places = [
  {
    id: 1,
    name: 'Lăng Chủ tịch Hồ Chí Minh',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.8,
    reviews: 125430,
    type: 'Điểm mốc lịch sử',
    searchedAt: '2026-02-10T08:30:00',
  },
  {
    id: 2,
    name: 'Chùa Một Cột',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.6,
    reviews: 89320,
    type: 'Chùa / Di tích lịch sử',
    searchedAt: '2026-02-09T09:10:00',
  },
  {
    id: 3,
    name: 'Văn Miếu – Quốc Tử Giám',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.7,
    reviews: 102540,
    type: 'Di tích lịch sử',
    searchedAt: '2026-02-08T16:45:00',
  },
  {
    id: 4,
    name: 'Bảo tàng Lịch sử Quân sự Việt Nam',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.5,
    reviews: 45670,
    type: 'Bảo tàng quân sự',
    searchedAt: '2026-02-07T14:20:00',
  },
  {
    id: 5,
    name: 'Hoàng thành Thăng Long',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.6,
    reviews: 67890,
    type: 'Di sản lịch sử',
    searchedAt: '2026-02-06T10:00:00',
  },
  {
    id: 6,
    name: 'Nhà tù Hỏa Lò',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.4,
    reviews: 51230,
    type: 'Bảo tàng lịch sử',
    searchedAt: '2026-02-05T18:30:00',
  },
  {
    id: 7,
    name: 'Đền Ngọc Sơn',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.5,
    reviews: 73450,
    type: 'Đền / Tâm linh',
    searchedAt: '2026-02-04T07:50:00',
  },
  {
    id: 8,
    name: 'Bảo tàng Dân tộc học Việt Nam',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.7,
    reviews: 84210,
    type: 'Bảo tàng văn hóa',
    searchedAt: '2026-01-31T15:40:00',
  },
  {
    id: 9,
    name: 'Nhà hát Lớn Hà Nội',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.6,
    reviews: 65980,
    type: 'Công trình kiến trúc',
    searchedAt: '2026-01-30T20:15:00',
  },
  {
    id: 10,
    name: 'Phố cổ Hà Nội',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    rating: 4.5,
    reviews: 158900,
    type: 'Khu du lịch / Di sản văn hóa',
    searchedAt: '2026-01-30T09:05:00',
  },
];

export default function HistoryComponent() {
  const { dispatch } = useEditor();
  const IconRef = useRef({ x: 20, y: 1.6 });

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const [items, setItems] = useState(places);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hoverId, setHoverId] = useState(null);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleDeleted = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      setIsSelectAll(next.length > 0);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      // Bỏ chọn tất cả
      setSelectedIds([]);
      setIsSelectAll(false);
      setHoverId(null);
    } else {
      // Chọn tất cả
      setSelectedIds(items.map((item) => item.id));
      setIsSelectAll(true);
      setHoverId(null); // hover global, không hover từng item
    }
  };

  const isItemActive = (id) => {
    if (isSelectAll) return true;
    if (hoverId === id) return true;
    return selectedIds.includes(id);
  };

  const isWithinLast3Days = (searchAt) => {
    if (!searchAt) return false;

    const now = new Date();
    const searchDate = new Date(searchAt);

    if (isNaN(searchDate.getTime())) return false;

    const diffTime = now - searchDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
  };

  const last3Days = items.filter((item) => isWithinLast3Days(item.searchedAt));

  const olderThan3Days = items.filter(
    (item) => !isWithinLast3Days(item.searchedAt),
  );

  return (
    <>
      <div className={cx('history__bgr')}>
        <div className={cx('history__header')}></div>
        <div className={cx('history__content')}>
          <div className={cx('history-grid__content')}>
            {last3Days.length > 0 && (
              <div className={cx('history-group')}>
                <div className={cx('history-title')}>
                  <div>
                    <span>3 ngày qua </span>
                    <span>({last3Days.length})</span>
                  </div>
                </div>
                <div className={cx('history-list')}>
                  {last3Days.map((place) => (
                    <div
                      key={place.id}
                      className={cx(
                        'history-items',
                        isItemActive(place.id) && 'history-items--hover',
                      )}
                      onMouseEnter={() => !isSelectAll && setHoverId(place.id)}
                      onMouseLeave={() => !isSelectAll && setHoverId(null)}
                    >
                      <div
                        className={cx(
                          'delete-items',
                          hoverId === place.id &&
                            !isSelectAll &&
                            'delete-items--show',
                        )}
                      >
                        <button
                          className={cx('delete__btn')}
                          onClick={() => handleDeleted(place.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className={cx('items-img')}>
                        <img src={place.img} alt="" />
                      </div>
                      <div className={cx('place-items')}>
                        <div className={cx('place-name')}>{place.name}</div>
                        <div className={cx('place-review')}>
                          <span>{place.rating}</span>
                          <div className={cx('rating-star')}>
                            {Array.from({
                              length: 5,
                            }).map((_, index) => {
                              const rating = place.rating;
                              const fullstar = Math.floor(rating);
                              const halfstar = (fullstar - rating) % 1 !== 0;
                              if (index < fullstar) {
                                return (
                                  <span
                                    key={index}
                                    className={cx('star', 'star-full')}
                                  >
                                    ★
                                  </span>
                                );
                              }
                              if (index === fullstar && halfstar) {
                                return (
                                  <span
                                    key={index}
                                    className={cx('star', 'star-half')}
                                  >
                                    ★
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={index}
                                  className={cx('star', 'star-empty')}
                                >
                                  ★
                                </span>
                              );
                            })}
                          </div>
                          <span>({place.reviews})</span>
                        </div>
                        <div className={cx('place-type')}>{place.type}</div>
                        <div className={cx('place-save')}>
                          <BookmarkCheck size={16} />
                          <span className={cx('place-save__items')}>
                            Da luu vao abc va danh sach cac tieu de chua co ten
                          </span>
                        </div>
                      </div>
                      <div className={cx('place-save')}>
                        <button
                          className={cx('save__btn')}
                          onClick={() => handleSelect(place.id)}
                        >
                          <Square size={20} />
                          {selectedIds.includes(place.id) && (
                            <Check size={18} className={cx('check__icon')} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {olderThan3Days.length > 0 && (
              <div className={cx('history-group')}>
                <div className={cx('history-title')}>
                  <div>
                    <span>Hơn 3 ngày trước </span>
                    <span>({olderThan3Days.length})</span>
                  </div>
                </div>
                <div className={cx('history-list')}>
                  {olderThan3Days.map((place) => (
                    <div
                      key={place.id}
                      className={cx(
                        'history-items',
                        isItemActive(place.id) && 'history-items--hover',
                      )}
                      onMouseEnter={() => !isSelectAll && setHoverId(place.id)}
                      onMouseLeave={() => !isSelectAll && setHoverId(null)}
                    >
                      <div
                        className={cx(
                          'delete-items',
                          hoverId === place.id &&
                            !isSelectAll &&
                            'delete-items--show',
                        )}
                      >
                        <button
                          className={cx('delete__btn')}
                          onClick={() => handleDeleted(place.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className={cx('items-img')}>
                        <img src={place.img} alt="" />
                      </div>
                      <div className={cx('place-items')}>
                        <div className={cx('place-name')}>{place.name}</div>
                        <div className={cx('place-review')}>
                          <span>{place.rating}</span>
                          <div className={cx('rating-star')}>
                            {Array.from({
                              length: 5,
                            }).map((_, index) => {
                              const rating = place.rating;
                              const fullstar = Math.floor(rating);
                              const halfstar = (fullstar - rating) % 1 !== 0;
                              if (index < fullstar) {
                                return (
                                  <span
                                    key={index}
                                    className={cx('star', 'star-full')}
                                  >
                                    ★
                                  </span>
                                );
                              }
                              if (index === fullstar && halfstar) {
                                return (
                                  <span
                                    key={index}
                                    className={cx('star', 'star-half')}
                                  >
                                    ★
                                  </span>
                                );
                              }
                              return (
                                <span
                                  key={index}
                                  className={cx('star', 'star-empty')}
                                >
                                  ★
                                </span>
                              );
                            })}
                          </div>
                          <span>({place.reviews})</span>
                        </div>
                        <div className={cx('place-type')}>{place.type}</div>
                        <div className={cx('place-save')}>
                          <BookmarkCheck size={16} />
                          <span className={cx('place-save__items')}>
                            Da luu vao abc va danh sach cac tieu de chua co ten
                          </span>
                        </div>
                      </div>
                      <div className={cx('place-save')}>
                        <button
                          className={cx('save__btn')}
                          onClick={() => handleSelect(place.id)}
                        >
                          <Square size={20} />
                          {selectedIds.includes(place.id) && (
                            <Check size={18} className={cx('check__icon')} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={cx('history__footer')}>
          <div className={cx('btn-footer__wrapper')}>
            <div className={cx('btn-left')}>
              <button className={cx('btn-items', 'btn-l')}>
                <BookmarkCheck
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />
                <span>Lưu</span>
              </button>
              <button className={cx('btn-items', 'btn-mid')}>
                <Share2
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />
              </button>
              <button className={cx('btn-items', 'btn-mid')}>
                <MapPinCheck
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />
              </button>
            </div>
            <div className={'btn-right'}>
              <button
                className={cx('btn-items', 'btn-sides')}
                onClick={handleSelectAll}
              >
                {selectedIds.length === 0
                  ? 'Chọn tất cả'
                  : selectedIds.length === items.length
                    ? 'Bỏ chọn tất cả'
                    : `Bỏ chọn tấ… (${selectedIds.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
