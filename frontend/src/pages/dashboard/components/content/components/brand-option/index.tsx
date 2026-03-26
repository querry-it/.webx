import { Clock, Home, Search, X, ThumbsUp } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './brand.module.css';
import { useRef, useState, useEffect } from 'react';
import { useEditor } from '../../../../../../state/useEditor';
import { UserHook } from '../../../../../../hook/user';
import { domain } from '../../../../../../utils/domain';
import { fetchReviews } from '../../../../../../utils/fetchreviews';

const cx = classNames.bind(styles);

export default function BrandComponent() {
  const { getUserId } = UserHook();
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const contentRef = useRef(null);
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };
  const { getAvatar, getFullName } = UserHook();
  const options = [
    { label: 'Bài đánh giá', value: 'review' },
    { label: 'Ảnh', value: 'image' },
  ];

  const [seeMore, setSeeMore] = useState(false);
  const [openGalleryId, setOpenGalleryId] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const userId = getUserId();

    fetchReviews(userId)
      .then((data) => {
        setList(data.data);
      })
      .catch((err) => console.error('API error:', err));
    setState('SET_NAVBAR_X', 'brand', 'review');
  }, []);

  const totalFeedback = () => list.length;

  const timeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const w = Math.floor(d / 7);
    const mo = Math.floor(d / 30);
    const y = Math.floor(d / 365);

    if (m < 1) return 'vừa đăng';
    if (m < 60) return `${m} phút trước`;
    if (h < 24) return `${h} giờ trước`;
    if (d < 7) return `${d} ngày trước`;
    if (w < 4) return `${w} tuần trước`;
    if (mo < 12) return `${mo} tháng trước`;

    return `${y} năm trước`;
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * 3;

    setShowButton(el.scrollHeight > maxHeight);
  }, []);

  const likeFeedback = (id: number) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
            }
          : item,
      ),
    );
  };

  const getFilterList = () => {
    switch (state.navbar_x.brand) {
      case 'review':
        return [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      case 'image':
        return [...list]
          .filter((f) => Array.isArray(f.images) && f.images.length > 0)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

      default:
        return list;
    }
  };

  const filterList = getFilterList();

  return (
    <div className={cx('location__bgr')}>
      <div className={cx('location-search')}></div>

      <div className={cx('location-introducer')}>
        <div className={cx('location-img')}>
          <img src={`${domain}/uploads/${getAvatar()}`} alt="" loading="lazy" />
        </div>
        <div className={cx('location-name')}>{getFullName()}</div>
      </div>

      <div className={cx('location-option')}>
        {options.map((option, index) => (
          <div
            key={index}
            className={cx('option__wrapper', {
              active: state.navbar_x.brand === option.value,
            })}
            onClick={() => {
              setState('SET_NAVBAR_X', 'brand', option.value);
            }}
          >
            <div></div>
            <div className={cx('option-title')}>{option.label}</div>
            <div className={cx('space-line__wrapper')}>
              <div
                className={cx('space-line-none', {
                  'space-line': state.navbar_x.brand === option.value,
                })}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className={cx('location-content')}>
        {state.navbar_x.brand === 'review' && (
          <div className={cx('location__review')}>
            <div className={cx('feedback-total')}>
              <span className={cx('feedback-total__title')}>
                {totalFeedback()} bài đánh giá
              </span>
            </div>

            <div className={cx('location-content__wrapper')}>
              {filterList.map((feedback) => (
                <div key={feedback.id} className={cx('content-review__items')}>
                  <div className={cx('content-review__header')}>
                    <div className={cx('avatar__wrapper')}>
                      <img
                        src={`${domain}/uploads/${feedback.location.avatar}`}
                        alt="Ảnh đại diện"
                        loading="lazy"
                      />
                    </div>
                    <div className={cx('title-review')}>
                      <div className={cx('title-review__name')}>
                        {feedback.location.name}
                      </div>
                      <div className={cx('title-review__address')}>
                        {feedback.location.address}
                      </div>
                    </div>
                  </div>

                  <div className={cx('title-content__wrapper')}>
                    <div className={cx('title-content__rate')}>
                      <div className={cx('star')}>
                        {Array.from({ length: 5 }).map((_, i) => {
                          const fill = Math.min(
                            Math.max(feedback.rating - i, 0),
                            1,
                          );

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

                      <div className={cx('time-ago')}>
                        <span>{timeAgo(feedback.createdAt)}</span>
                      </div>
                    </div>

                    <div className={cx('content__review')}>
                      <span
                        ref={contentRef}
                        className={cx(
                          'content-text',
                          seeMore ? 'expanded' : 'collapsed',
                        )}
                      >
                        {feedback.content.replace(/^\n+/, '')}
                      </span>

                      {showButton && (
                        <button
                          onClick={() => setSeeMore((prev) => !prev)}
                          className={cx('btn-more')}
                        >
                          {seeMore ? 'Rút gọn' : 'Xem thêm'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={cx('content-gallery__wrapper')}>
                    <div className={cx('content-gallery__grid')}>
                      {(openGalleryId === feedback.id
                        ? feedback.images
                        : feedback.images.slice(0, 4)
                      ).map((img, index) => (
                        <div
                          key={index}
                          className={cx(
                            'img-item',
                            openGalleryId !== feedback.id &&
                              index === 3 &&
                              feedback.images.length > 4 &&
                              'img-blur',
                          )}
                          onClick={() => {
                            if (index === 3 && feedback.images.length > 4) {
                              setOpenGalleryId(feedback.id);
                            }
                          }}
                        >
                          <img
                            src={`${domain}/uploads/${img}`}
                            alt=""
                            loading="lazy"
                          />

                          {openGalleryId !== feedback.id &&
                            index === 3 &&
                            feedback.images.length > 4 && (
                              <div className={cx('gallery__overlay')}>
                                +{feedback.images.length - 4} ảnh
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cx('like-content__wrapper')}>
                    <button
                      onClick={() => likeFeedback(feedback.id)}
                      className={cx(
                        !feedback.liked
                          ? 'like-content__btn'
                          : 'like-active__btn',
                      )}
                    >
                      <ThumbsUp
                        size={16}
                        strokeWidth={2.5}
                        className={cx(
                          !feedback.liked ? '' : 'like-active__icon',
                        )}
                      />
                      <span
                        className={cx(
                          !feedback.liked ? '' : 'like-active__count',
                        )}
                      >
                        {feedback.likes > 0 ? feedback.likes : 'Thích'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.navbar_x.brand === 'image' &&
          filterList.map((f) => (
            <div key={f.id} className={cx('image__items')}>
              <div className={cx('image__title')}>
                <div className={cx('image__avatar')}>
                  <img
                    src={`${domain}/uploads/${f.location.avatar}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className={cx('image__location')}>
                  <div className={cx('image__name')}>{f.location.name}</div>
                  <div className={cx('image__address')}>
                    {f.location.address}
                  </div>
                </div>
              </div>

              <div className={cx('image__content')}>
                {f.images.map((img, index) => (
                  <div key={index} className={cx('img-item')}>
                    <img
                      src={`${domain}/uploads/${img}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
