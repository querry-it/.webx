import classNames from 'classnames/bind';
import styles from './search.module.css';
import { useRef, useState, useMemo, useEffect } from 'react';
import {
  Clock,
  Home,
  MapPin,
  Search,
  SquareArrowOutUpRight,
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
  Squirrel,
  ArrowLeft,
} from 'lucide-react';
import { useEditor } from '../../../../../../state/useEditor';
import { Api } from '../../../../../../utils/api';
import { accessToken } from '../../../../../../utils/accessToken';
import { UserHook } from '../../../../../../hook/user';

const cx = classNames.bind(styles);

export default function SearchComponent() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');

  const { getAccessToken, setAccessToken } = accessToken();
  const { setUserId, getUserId } = UserHook();

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const blockList = ['save', 'history', 'location'];

  // const recentSearches = [
  //   'Nhà riêng',
  //   'Quán cà phê gần đây',
  //   'Hồ Gươm',
  //   'Bảo tàng Hà Nội',
  // ];

  const menuOptions = [
    { icon: Squirrel, label: 'Tất cả' },
    { icon: Landmark, label: 'Di tích' },
    { icon: Trees, label: 'Thiên nhiên' },
    { icon: Amphora, label: 'Bảo tàng' },
    { icon: Building2, label: 'Kiến trúc' },
    { icon: Map, label: 'Khu phố' },
    { icon: Leaf, label: 'Công viên' },
    { icon: Home, label: 'Làng cổ' },
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
    { query: string; locationId: string }[]
  >([]);

  useEffect(() => {
    console.log(getUserId());
    const fetchHistory = async () => {
      try {
        const data = await Api<{
          success: boolean;
          data: { locationId: String; query: string }[];
        }>(
          {
            method: 'GET',
            url: `/locations/history/${getUserId()}`,
          },
          { token: getAccessToken(), setToken: setAccessToken, setUserId },
        );

        if (data.success && data.data) {
          setRecentSearches(
            data.data.map((item) => ({
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
  }, []);

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
                {recentSearches.map((item) => (
                  <div
                    key={item.locationId}
                    className={cx('items')}
                    onClick={() => {
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
                    <X className={cx('icon_x')} size={18} />
                  </div>
                ))}

                <div className={cx('items_x')}>
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
              <div key={index} className={cx('dynamic__option')}>
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
