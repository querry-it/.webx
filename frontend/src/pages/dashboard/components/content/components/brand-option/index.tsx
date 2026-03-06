import { Clock, Home, Search, X, ThumbsUp } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './brand.module.css';
import { useRef, useState, useEffect } from 'react';
import { useEditor } from '../../../../../../state/useEditor';

const cx = classNames.bind(styles);

const feedbacks = [
  {
    id: 1,
    location: {
      name: 'Văn Miếu – Quốc Tử Giám',
      address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Việt Nam',
      avatar:
        'https://mautranhve.vn/wp-content/uploads/2025/10/avatar-cute-vo-tri-3.jpg',
    },
    rating: 5,
    content: `  Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
    images: [
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400',
    ],
    createdAt: '2026-02-01T14:30:00',
    likes: 10,
    liked: false,
  },

  {
    id: 2,
    location: {
      name: 'Văn Miếu – Quốc Tử Giám',
      address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Việt Nam',
      avatar:
        'https://mautranhve.vn/wp-content/uploads/2025/10/avatar-cute-vo-tri-3.jpg',
    },
    rating: 4,
    content: `
                Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
    images: [
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400',
    ],
    createdAt: '2024-12-02T12:30:30',
    likes: 121,
    liked: false,
  },

  {
    id: 3,
    location: {
      name: 'Văn Miếu – Quốc Tử Giám',
      address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Việt Nam',
      avatar:
        'https://mautranhve.vn/wp-content/uploads/2025/10/avatar-cute-vo-tri-3.jpg',
    },
    rating: 5,
    content: `
                Không gian ở đây rất trang nghiêm và yên tĩnh.
                Mọi khu vực đều được giữ gìn sạch sẽ, gọn gàng.
                Nhân viên hướng dẫn nhiệt tình, giải thích rõ ràng từng chi tiết lịch sử.
                Mình cảm thấy rất tự hào khi được đến tham quan nơi này.
                Đây là địa điểm mà mỗi người Việt Nam nên ghé thăm ít nhất một lần.
                `,
    images: [
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6eyEgRG3Tx70IlZGe_aeLj0gquNRECqQzPs5mvputDbV7_01duzpKXX-z-ix3N1HWacrxSv-FHycvmwK_6S_NfA7w6Wdd7cYe2P6pVaB3SkJN1i3wyk9ebWQNpsJgC5oOIEsw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwerx0nziz0IBXcPGc2wXZYc0U2MGAxfFjTFrDOTk51MpJo3836BwDDjQSMlWNcx8Gb36BHWNAedRMBQ9OjqVUj6HVSQgXP0bipFEKcvJ5KAcEqDo1eBXekJR91iexu69KEf8TZdw=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7LOP9L8Bs18Z87cJ6k4x_syz_exvxfph_8gbzMAfWd6ovsFY1vXGCcq7jcc6wiGjJzqobCw95y69Vqn2_Rr-FvNJLbddK6mnCm8diush5WB-BXguG7Lht2fAXkQGMoWMe-nrOBxwBaRrm=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAwept0fabouImcvvhZbvLjFkiHB0T3lat0RQE03WAJvxe0ELrKzQLQS7QdVoo8NmYH3kil7M9WwNyUPXevpzKar1_Jwr8f0C-90VpefZkvWG_Te4nxnSdDO_9TyrmaAhRpcvl89gZBB38fxrN=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZn-OajcEYopzjo7qoD1326w0-z3NRaiag-W0bggFtIMsJz1DXFGCOhvhm2fdodZtDvdBnhQWFtxseNLpAreIMTTdTLNTyioWJS_VoGUlvveLyqM9Diwj-cKsHmG5UDEKVEOFcsjTcbABu=w400',
      'https://lh3.googleusercontent.com/gps-cs-s/AHVAweootfSRmSXOEjE9bHrSHUdKgrGOfE_YPbotzt794vGt9l-WIHbLlaE9N5oBlXg0qLfJ0KNn0duhwub6KZouoiNvdP9D_wtFYEjo9_tsczb2_IzXp2-2IKWwlYkmUJKmImpuI0y6lw2k2b0=w400',
    ],
    createdAt: '2024-12-15T07:03:31',
    likes: 11,
    liked: false,
  },
];

export default function BrandComponent() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
  const contentRef = useRef(null);
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const options = [
    { label: 'Bài đánh giá', value: 'review' },
    { label: 'Ảnh', value: 'image' },
  ];

  const [seeMore, setSeeMore] = useState(false);
  const [openGalleryId, setOpenGalleryId] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [list, setList] = useState(feedbacks);
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
        return [...list]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 10);

      case 'image':
        return [...list]
          .filter((f) => Array.isArray(f.images) && f.images.length > 0)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

      default:
        return feedbacks;
    }
  };

  const filterList = getFilterList();
  
  const totalFeedback = (list) => {
    let sum = 0;
    for(let i = 1; i <= feedbacks.length; i++) {
       sum += 1;
    }
    return sum;
  }

  return (
    <div className={cx('location__bgr')}>
      <div className={cx('location-search')}></div>

      <div className={cx('location-introducer')}>
        <div className={cx('location-img')}>
          <img
            src="https://www.lemon8-app.com/seo/image?item_id=7381094404980851217&index=2&sign=f353babbbe07e53ea367272688735525"
            alt=""
          />
        </div>
        <div className={cx('location-name')}>Nguyen Van A</div>
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
              <div className={cx('space-line-none', {'space-line' : state.navbar_x.brand === option.value })}></div>
            </div>
          </div>
        ))}
      </div>

      <div className={cx('location-content')}>
        {state.navbar_x.brand === 'review' && (
          <div className={cx('location__review')}>
            <div className={cx('feedback-total')}>
              <span className={cx('feedback-total__title')}>
                {totalFeedback(list)} bài đánh giá
              </span>
            </div>

            <div className={cx('location-content__wrapper')}>
              {filterList.map((feedback) => (
                <div key={feedback.id} className={cx('content-review__items')}>
                  <div className={cx('content-review__header')}>
                    <div className={cx('avatar__wrapper')}>
                      <img src={feedback.location.avatar} alt="Ảnh đại diện" />
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
                          <img src={img} alt="" />

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
                  <img src={f.location.avatar} alt="" />
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
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
