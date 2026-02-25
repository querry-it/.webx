import classNames from 'classnames/bind';
import styles from './loading.module.css';

const cx = classNames.bind(styles);

export default function Loading() {
  return (
    <div className={cx('container')}>
      <div className={cx('boxes')}>
        <div className={cx('box')}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx('box')}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx('box')}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={cx('box')}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
