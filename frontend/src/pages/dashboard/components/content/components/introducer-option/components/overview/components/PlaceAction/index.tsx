import classNames from 'classnames/bind';
import styles from './PlaceAction.module.css';
import { MapPinCheck, BookmarkCheck, Share2, Info } from 'lucide-react';
import { useRef } from 'react';
import { useEditor } from '../../../../../../../../../../state/useEditor';
const cx = classNames.bind(styles);

export default function PlaceAction() {
  const { state, dispatch } = useEditor();
  const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

  const setState = (option: string, key: string, value: boolean) => {
    dispatch({
      type: option,
      payload: { [key]: value },
    });
  };

  return (
    <div className={cx('action__wrapper')}>
      <div className={cx('action__items')}>
        <button className={cx('action__btn')}>
          <div className={cx('btn__icon', 'primary')}>
            <MapPinCheck
              size={IconRef.current.x}
              strokeWidth={IconRef.current.y}
            />
          </div>
          <div className={cx('action__name')}>Đường đi</div>
        </button>
      </div>

      <div className={cx('action__items')}>
        <button className={cx('action__btn')}>
          <div className={cx('btn__icon', 'secondary')}>
            <BookmarkCheck
              size={IconRef.current.x}
              strokeWidth={IconRef.current.y}
            />
          </div>
          <div className={cx('action__name')}>Lưu</div>
        </button>
      </div>

      <div className={cx('action__items', 'secondary')}>
        <button className={cx('action__btn')}>
          <div className={cx('btn__icon', 'secondary')}>
            <Share2 size={IconRef.current.x} strokeWidth={IconRef.current.y} />
          </div>
          <div className={cx('action__name')}>Chia sẻ</div>
        </button>
      </div>

      <div className={cx('action__items')}>
        <button
          className={cx('action__btn')}
          onClick={() => {
            setState('SET_NAVBAR_X', 'detail', !state.navbar_x.detail);
          }}
        >
          <div className={cx('btn__icon', 'secondary')}>
            <Info size={IconRef.current.x} strokeWidth={IconRef.current.y} />
          </div>
          <div className={cx('action__name')}>Chi tiết</div>
        </button>
      </div>
    </div>
  );
}
