import classNames from 'classnames/bind';
import styles from './loader.module.css';

const cx = classNames.bind(styles);

export default function Loader() {
  return (
    <div className={cx('spinner')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
