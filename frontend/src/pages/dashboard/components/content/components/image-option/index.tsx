import classNames from 'classnames/bind';
import styles from './image.module.css';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useEditor } from '../../../../../../state/useEditor';

const cx = classNames.bind(styles);

const navbarImg = ['Tất cả', 'Mới nhất', 'Ảnh của tôi'];

const imgs = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    title: 'Văn Miếu buổi sáng',
    avatar: 'https://i.pravatar.cc/40?img=1',
    date: '2024-01-02',
    type: 'my',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
    title: 'Khuê Văn Các',
    avatar: 'https://i.pravatar.cc/40?img=2',
    date: '2024-01-10',
    type: 'my',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    title: 'Kiến trúc cổ kính',
    avatar: 'https://i.pravatar.cc/40?img=3',
    date: '2026-02-24',
    type: 'other',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800',
    title: 'Di sản văn hóa',
    avatar: 'https://i.pravatar.cc/40?img=4',
    date: '2026-02-23',
    type: 'other',
  },
];

export default function ImageComponent() {
  const { state, dispatch } = useEditor();
  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  const [activeImg, setActiveImg] = useState(0);

  const getFilteredImages = () => {
    switch (state.navbar_x.image) {
      case 0: 
        return imgs;

      case 1: 
        return [...imgs]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 10);

      case 2: 
        return imgs;

      default:
        return imgs;
    }
  };

  const filteredImgs = getFilteredImages();

  useEffect(() => {
    setActiveImg(0);
  }, [state.navbar_x.image]);

  return (
    <div className={cx('location__image')}>
      <div className={cx('location-left__image')}>
        <div className={cx('image-header')}>
          <div></div>
          <div className={cx('image-navbar')}>
            {navbarImg.map((navbar, index) => (
              <div
                key={index}
                className={cx('navbar-items', {
                  active: state.navbar_x.image === index,
                })}
                onClick={() => {
                  setState('SET_NAVBAR_X', 'image', index);
                }}
              >
                <div></div>
                <span className={cx('navbar-title')}>{navbar}</span>
                <div className={cx('spacefooter-navbar')}>
                  <div
                    className={cx(
                      state.navbar_x.image === index
                        ? 'space-line'
                        : 'space-noline',
                    )}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx('image-content')}>
          {filteredImgs.map((img, index) => (
            <div
              key={img.id}
              className={cx('image-items', {
                imageItemsActive: activeImg === index,
              })}
              onClick={() => setActiveImg(index)}
            >
              <img src={img.image} alt={img.title} />
            </div>
          ))}
        </div>
      </div>
      <div className={cx('add-img__btn')}>
        <button className={cx('btn')}>
          <Plus size={16}></Plus>
          <span>Thêm ảnh</span>
        </button>
      </div>

      <div className={cx('location-right__image')}>
        {filteredImgs && (
          <div>
            <div className={cx('img')}>
              <img src={filteredImgs[activeImg].image} alt={filteredImgs[activeImg].title} />
            </div>
            <div className={cx('infor-image')}>
              <div className={cx('infor-image__title')}>
                {filteredImgs[activeImg].title}
              </div>

              <div className={cx('infor-image__content')}>
                <div className={cx('infor-image__avatar')}>
                  <img src={filteredImgs[activeImg].avatar} alt="" />
                </div>
                <span>Nguyen Van A</span>
              </div>

              <div className={cx('infor-image__timeline')}>
                {new Date(filteredImgs[activeImg].date).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        )}

        {filteredImgs.length > 0 && (
          <div className={cx('image-slider')}>
            <button
              className={cx('arrow', 'left')}
              onClick={() =>
                setActiveImg((prev) =>
                  prev > 0 ? prev - 1 : filteredImgs.length - 1,
                )
              }
            >
              <ChevronLeft />
            </button>
            <button
              className={cx('arrow', 'right')}
              onClick={() =>
                setActiveImg((prev) =>
                  prev < filteredImgs.length - 1 ? prev + 1 : 0,
                )
              }
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className={cx('close')}>
        <button onClick={() => {
          dispatch({
            type: 'SET_NAVBAR_X',
            payload: { image: false },
          })
        }}>
          <X></X>
        </button>
      </div>
    </div>
  );
}
