import { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
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
    type: 'Điểm mốc lịch sử',
    rating: 4.8,
    reviews: 125430,
    searchedAt: '2026-02-10T08:30:00',
    mapUrl: 'https://maps.app.goo.gl/5U1cGyHVZDhAAigB7',
  },
  {
    id: 2,
    name: 'Chùa Một Cột',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Chùa / Di tích lịch sử',
    rating: 4.6,
    reviews: 89320,
    searchedAt: '2026-02-09T09:10:00',
    mapUrl: 'https://maps.app.goo.gl/7Qe6H2o9xJpQmA6K9',
  },
  {
    id: 3,
    name: 'Văn Miếu – Quốc Tử Giám',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Di tích lịch sử',
    rating: 4.7,
    reviews: 102540,
    searchedAt: '2026-02-08T16:45:00',
    mapUrl: 'https://maps.app.goo.gl/Wr1z9Q9bB7ePp3gY8',
  },
  {
    id: 4,
    name: 'Bảo tàng Lịch sử Quân sự Việt Nam',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Bảo tàng quân sự',
    rating: 4.5,
    reviews: 45670,
    searchedAt: '2026-02-07T14:20:00',
    mapUrl: 'https://maps.app.goo.gl/9K4qXcRz8oYx3H4E7',
  },
  {
    id: 5,
    name: 'Hoàng thành Thăng Long',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Di sản lịch sử',
    rating: 4.6,
    reviews: 67890,
    searchedAt: '2026-02-06T10:00:00',
    mapUrl: 'https://maps.app.goo.gl/q8JZy4F6D7B5N3V2A',
  },
  {
    id: 6,
    name: 'Nhà tù Hỏa Lò',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Bảo tàng lịch sử',
    rating: 4.4,
    reviews: 51230,
    searchedAt: '2026-02-05T18:30:00',
    mapUrl: 'https://maps.app.goo.gl/3N8kL7V4YH1J6E2D9',
  },
  {
    id: 7,
    name: 'Đền Ngọc Sơn',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Đền / Tâm linh',
    rating: 4.5,
    reviews: 73450,
    searchedAt: '2026-02-04T07:50:00',
    mapUrl: 'https://maps.app.goo.gl/2A6R5F8M4Z9B1E7XQ',
  },
  {
    id: 8,
    name: 'Bảo tàng Dân tộc học Việt Nam',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Bảo tàng văn hóa',
    rating: 4.7,
    reviews: 84210,
    searchedAt: '2026-01-31T15:40:00',
    mapUrl: 'https://maps.app.goo.gl/V8R9Z3M6N2Y1A4X7P',
  },
  {
    id: 9,
    name: 'Nhà hát Lớn Hà Nội',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Công trình kiến trúc',
    rating: 4.6,
    reviews: 65980,
    searchedAt: '2026-01-30T20:15:00',
    mapUrl: 'https://maps.app.goo.gl/6H7B9M2X8N1Z4P5R3',
  },
  {
    id: 10,
    name: 'Phố cổ Hà Nội',
    img: 'https://ik.imagekit.io/tvlk/blog/2022/08/van-mieu-quoc-tu-giam-1.jpg',
    type: 'Khu du lịch / Di sản văn hóa',
    rating: 4.5,
    reviews: 158900,
    searchedAt: '2026-01-30T09:05:00',
    mapUrl: 'https://maps.app.goo.gl/Y3M6Z9P8A7N2R5X4B',
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
  const [sharePlace, setSharePlace] = useState<places | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  const hasSelected = selectedIds.length > 0;
  const isAllSelected = selectedIds.length === items.length;
  const hasSelectedMap = selectedIds.length === 1 || selectedIds.length === 2;

  const handleDeleted = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelect = (places) => {
    setSelectedIds((prev) => {
      const next = prev.includes(places.id)
        ? prev.filter((x) => x !== places.id)
        : [...prev, places.id];
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.length > 0) {
      setSelectedIds([]);
      setSharePlace(null);
      setIsSelectAll(false);
    } else {
      const allIds = items.map((item) => item.id);
      setSelectedIds(allIds);
      setSharePlace(null);
      setIsSelectAll(true);
    }
  };

  const isItemActive = (id) => {
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
        <div className={cx('history__header')}>
          <div></div>
          <div className={cx('history-header__wrapper')}>
            <div></div>
            <span className={cx('history-title__header')}>Gần đây</span>
            <div className={cx('space__footer')}>
              <div className={cx('space__green')}></div>
            </div>
          </div>
        </div>
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
                        isItemActive(place.id) && 'history-items__hover',
                        activeId === place.id && 'history-items__active',
                      )}
                      onClick={() => setActiveId(place.id)}
                      onMouseEnter={() => setHoverId(place.id)}
                      onMouseLeave={() => setHoverId(null)}
                    >
                      <div
                        className={cx(
                          'delete-items',
                          hoverId === place.id && 'delete-items--show',
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
                          <span>({place.reviews.toLocaleString('vi-VN')})</span>
                        </div>
                        <div className={cx('place-type')}>{place.type}</div>
                        <div className={cx('place-save')}>
                          <BookmarkCheck
                            size={16}
                            className={cx('bookmarkcheck__icon')}
                          />
                          <span className={cx('place-save__items')}>
                            Da luu vao abc va danh sach cac tieu de chua co ten
                          </span>
                        </div>
                      </div>
                      <div className={cx('place-save')}>
                        <button
                          className={cx('save__btn')}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(place);
                          }}
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
                        isItemActive(place.id) && 'history-items__hover',
                        activeId === place.id && 'history-items__active',
                      )}
                      onClick={() => setActiveId(place.id)}
                      onMouseEnter={() => setHoverId(place.id)}
                      onMouseLeave={() => setHoverId(null)}
                    >
                      <div
                        className={cx(
                          'delete-items',
                          hoverId === place.id && 'delete-items--show',
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
                          <span>({place.reviews.toLocaleString('vi-VN')})</span>
                        </div>
                        <div className={cx('place-type')}>{place.type}</div>
                        <div className={cx('place-save')}>
                          <BookmarkCheck
                            size={16}
                            className={'bookmarkcheck__icon'}
                          />
                          <span className={cx('place-save__items')}>
                            Da luu vao abc va danh sach cac tieu de chua co ten
                          </span>
                        </div>
                      </div>
                      <div className={cx('place-save')}>
                        <button
                          className={cx('save__btn')}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(place);
                          }}
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
              <button
                className={cx(
                  'btn-items',
                  'btn-l',
                  !hasSelected && 'btn-disabled',
                )}
                disabled={!hasSelected}
              >
                <Bookmark className={cx('bookmark__icon')} size={16} />
                <span>Lưu</span>
              </button>

              <button
                className={cx(
                  'btn-items',
                  'btn-mid',
                  !hasSelectedMap && 'btn-disabled',
                )}
                disabled={!hasSelectedMap}
              >
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
                {!hasSelected
                  ? 'Chọn tất cả'
                  : isAllSelected
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
