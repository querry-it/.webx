import classNames from 'classnames/bind';
import styles from './image.module.css';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
const cx = classNames.bind(styles);

const navbarImg = ['Tất cả', 'Mới nhất', 'Ảnh của tôi'];
const imgs = [
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
  'https://icdn.dantri.com.vn/thumb_w/1280/2017/1kvc-7-1491911328754.jpg',
];

export default function ImageComponent() {
  const [activeNavbar, setActiveNavbar] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  return (
    <div className={cx('location__image')}>
      <div className={cx('location-left__image')}>
        <div className={cx('image-header')}>
          <div></div>
          <div className={cx('image-navbar')}>
            {navbarImg.map((navbar, index) => (
              <div
                key={index}
                className={cx('navbar-items')}
                onClick={() => setActiveNavbar(index)}
              >
                <div></div>
                <span className={cx('navbar-title')}>{navbar}</span>
                <div className={cx('spacefooter-navbar')}>
                  <div
                    className={cx(
                      activeNavbar === index ? 'space-line' : 'space-noline',
                    )}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx('image-content')}>
          {imgs.map((img, index) => (
            <div
              key={index}
              className={cx('image-items', {
                imageItemsActive: activeImg === index,
              })}
              onClick={() => setActiveImg(index)}
            >
              <img src={img} alt="" />
            </div>
          ))}

          <div className={cx('add-img__btn')}>
            <button className={cx('btn')}>
              <Plus size={16}></Plus>
              <span>Thêm ảnh</span>
            </button>
          </div>
        </div>
      </div>

      <div className={cx('location-right__image')}>
        {imgs.map((img) => (
          <div key={img} className={cx('img')}>
            <img src={img} alt="" />
          </div>
        ))}

        <div className={cx('image-slider')}>
          <button className={cx("arrow", "left")}>
            <ChevronLeft />
          </button>
          <button className={cx("arrow", "right")}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className={cx("close")}>
        <button>
          <X ></X>
        </button>
      </div>
    </div>
  );
}
