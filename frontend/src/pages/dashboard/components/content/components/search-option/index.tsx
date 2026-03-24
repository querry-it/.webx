import classNames from 'classnames/bind';
import styles from './search.module.css';
import { useRef, useState, useEffect } from 'react';
import {
  Clock,
  Home,
  MapPin,
  Search,
  X,
  Landmark,
  Trees,
  Amphora,
  Building2,
  Map,
  Leaf,
  ChevronLeft,
  ChevronRight,
  MapPinCheck,
  Bus,
  Coffee,
  Store,
  Hotel,
  Train,
  ArrowLeft,
} from 'lucide-react';
import { useEditor } from '../../../../../../state/useEditor';
import { Api } from '../../../../../../utils/api';
import { accessToken } from '../../../../../../utils/accessToken';
import { UserHook } from '../../../../../../hook/user';
import { domain } from '../../../../../../utils/domain';

const cx = classNames.bind(styles);

export default function SearchComponent() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [query, setQuery] = useState('');

  const { getAccessToken, setAccessToken } = accessToken();
  const { setUserId, getUserId } = UserHook();

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const blockList = ['save', 'history', 'location', 'result'];

  const menuOptions = [
    { icon: Landmark, label: 'Di tích', category: 'history' },
    { icon: Trees, label: 'Thiên nhiên', category: 'nature' },
    { icon: Amphora, label: 'Bảo tàng', category: 'museum' },
    { icon: Building2, label: 'Kiến trúc', category: 'architecture' },
    { icon: Map, label: 'Khu phố', category: 'street' },
    { icon: Leaf, label: 'Công viên', category: 'park' },
    { icon: Home, label: 'Làng cổ', category: 'village' },
    { icon: Bus, label: 'Bến xe', category: 'bus' },
    { icon: Coffee, label: 'Quán cà phê', category: 'cofe' },
    { icon: Store, label: 'Cửa hàng', category: 'shop' },
    { icon: Hotel, label: 'Khách sạn', category: 'restaurant' },
    { icon: Train, label: 'Bến tàu điện', category: 'metro' },
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await Api<{
          success: boolean;
          data: { id: number; name: string }[];
        }>(
          {
            method: 'GET',
            url: `/locations/search`,
            params: { q: query },
          },
          { token: getAccessToken(), setToken: setAccessToken, setUserId },
        );
        setFilteredSuggestions(
          data.data.map((item) => ({
            id: item.id,
            name: item.name,
          })),
        );
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const [recentSearches, setRecentSearches] = useState<
    { id: string; query: string; locationId: string }[]
  >([]);

  useEffect(() => {
    if (!focusCount) return;

    const fetchHistory = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const data = await Api<{
          success: boolean;
          data: { id: String; location_id: string; query: string }[];
        }>(
          {
            method: 'GET',
            url: `/locations/history/${userId}`,
          },
          { token: getAccessToken(), setToken: setAccessToken, setUserId },
        );

        if (data.success && data.data) {
          setRecentSearches(
            data.data.map((item) => ({
              id: item.id,
              query: item.query,
              locationId: item.location_id,
            })),
          );
        }
      } catch (error) {
        console.error('Lỗi lấy lịch sử:', error);
      }
    };

    fetchHistory();
  }, [focusCount]);

  const showSuggestions = query.trim().length > 0;

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener('scroll', checkScroll);
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (x) => {
    scrollRef.current.scrollBy({
      left: x,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={cx('search', { active: focused })}>
        <div className={cx('search__input')}>
          {state.navbar_x.back && (
            <div
              className={cx('search__input--back')}
              onClick={() => {
                setState('SET_NAVBAR_X', 'back', false);
                setState('SET_NAVBAR_X', 'save', 'list');
              }}
            >
              <ArrowLeft
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
            </div>
          )}
          <div className={cx('search__input--title')}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm trên IchigoMazone Maps"
              value={query}
              onFocus={() => {
                setFocused(true);
                setFocusCount((c) => c + 1);
                setState('SET_NAVBAR_X', 'dynamic', false);
              }}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div
            className={cx('search__input--icon')}
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <Search size={IconRef.current.x} strokeWidth={IconRef.current.y} />
          </div>

          <div
            className={cx('search__input--road')}
            onClick={() => {
              if (blockList.every((v) => v !== state.navbar_x.activeX)) {
                setState('SET_NAVBAR_X', 'activeX', 'roadmap');
              } else {
                setState('SET_NAVBAR_X', 'activeX', null);
                setState('SET_NAVBAR_X', 'save', 'list');
                setState('SET_NAVBAR_X', 'back', false);
                setState('SET_INFORMATION', 'locationid', null);
                setState('SET_INFORMATION', 'lat', null);
                setState('SET_INFORMATION', 'lon', null);
                setState('SET_NAVBAR_X', 'detail', false);
                setQuery('');
              }
            }}
          >
            {blockList.some((v) => v === state.navbar_x.activeX) ? (
              <X size={IconRef.current.x} strokeWidth={IconRef.current.y} />
            ) : (
              <MapPinCheck
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
            )}
          </div>
        </div>
        {focused && (
          <>
            {showSuggestions && !state.navbar_x.dynamic ? (
              filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item) => (
                  <div
                    key={item.id}
                    className={cx('items')}
                    onMouseDown={() => {
                      setQuery(item.name);
                      setState('SET_INFORMATION', 'locationid', item.id);
                      setState('SET_NAVBAR_X', 'activeX', 'location');
                    }}
                  >
                    <MapPin className={cx('icon')} size={20} />
                    <p className={cx('title')}>{item.name}</p>
                  </div>
                ))
              ) : (
                <div className={cx('items_x')}>
                  <p className={cx('title', 'title-footer')}>
                    Không tìm thấy kết quả
                  </p>
                </div>
              )
            ) : (
              <>
                {recentSearches.map((item, index) => (
                  <div
                    key={`${item.id}`}
                    className={cx('items')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(item.query);
                      setState(
                        'SET_INFORMATION',
                        'locationid',
                        item.locationId,
                      );
                      setState('SET_NAVBAR_X', 'activeX', 'location');
                    }}
                  >
                    <Clock className={cx('icon')} size={20} />
                    <p className={cx('title')}>{item.query}</p>
                    <X
                      className={cx('icon_x')}
                      size={18}
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                          await fetch(`${domain}/locations/delete/${item.id}`, {
                            method: 'DELETE',
                          });
                          setRecentSearches((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                          inputRef.current?.focus();
                        } catch (err) {
                          console.error('Lỗi xóa history:', err);
                        }
                      }}
                    />
                  </div>
                ))}

                <div
                  className={cx('items_x')}
                  onClick={() => {
                    setState('SET_NAVBAR_X', 'activeX', 'history');
                  }}
                >
                  <span className={cx('title', 'title-footer')}>
                    Nội dung tìm kiếm khác gần đây
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {state.navbar_x.option !== null && (
        <div className={cx('location__pin')}>
          <div className={cx('pin__title')}>
            <div className={cx('title__icon')}>
              {state.navbar_x.option === 'home' ? (
                <Home
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />
              ) : (
                <Home
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />
              )}
            </div>
            <div className={cx('title__content')}>
              Chỉnh sửa địa chị{' '}
              {state.navbar_x.option === 'home' ? 'nhà riêng' : 'nơi làm việc'}
            </div>
            <div className={cx('title__btn')}>
              <div
                className={cx('btn__save')}
                onClick={() => {
                  setState('SET_NAVBAR_X', 'option', null);
                }}
              >
                LƯU
              </div>
              <div className={cx('btn__space')}></div>
              <div
                className={cx('btn__cancel')}
                onClick={() => {
                  setState('SET_NAVBAR_X', 'option', null);
                }}
              >
                HỦY
              </div>
            </div>
          </div>
          <div className={cx('pin__info')}>
            <div className={cx('info__icon')}>
              <div className={cx('icon__avatar')}>
                <span>NN</span>
              </div>
            </div>
            <div className={cx('info__content')}>
              <span>ichigo.amz27@zz.kg</span>
            </div>
          </div>
          <div className={cx('pin__content')}>
            Địa chỉ nhà riêng và nơi làm việc của bạn được dùng để mang đến trải
            nghiệm phù hợp cho bạn trên các sản phẩm của Google và cho mục đích
            quảng cáo theo mô tả trong Chính sách quyền riêng tư của Google. Bạn
            có thể quản lý các địa chỉ đó trong Tài khoản Google của mình. Tìm
            hiểu thêm
          </div>
          <div className={cx('pin__map')}>
            <div className={cx('map__btn')}>
              <input type="text" placeholder="Kinh độ, vĩ độ" readOnly />
            </div>
          </div>
          <div className={cx('pin__btn')}>
            <div className={cx('btn__left')}>
              <MapPin
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
              <span>Vị trí hiện tại</span>
            </div>
            <div className={cx('btn__right')}>
              <Map size={IconRef.current.x} strokeWidth={IconRef.current.y} />
              <span>Chọn từ map</span>
            </div>
          </div>
        </div>
      )}

      <div className={cx('dynamic')}>
        <div className={cx('dynamic__wrapper')}>
          {showLeft && (
            <div
              className={cx('btn__scroll', 'left')}
              onClick={() => scroll(-200)}
            >
              <ChevronLeft
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
            </div>
          )}

          <div className={cx('dynamic__list')} ref={scrollRef}>
            {menuOptions.map((option, index) => (
              <div
                key={index}
                className={cx('dynamic__option')}
                onClick={() => {
                  setState('SET_NAVBAR_X', 'activeX', 'result');
                }}
              >
                <option.icon
                  size={IconRef.current.x}
                  strokeWidth={IconRef.current.y}
                />

                <span>{option.label}</span>
              </div>
            ))}
          </div>
          {showRight && (
            <div
              className={cx('btn__scroll', 'right')}
              onClick={() => scroll(200)}
            >
              <ChevronRight
                size={IconRef.current.x}
                strokeWidth={IconRef.current.y}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
