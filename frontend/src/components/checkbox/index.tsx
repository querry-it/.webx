import classNames from 'classnames/bind';
import styles from './checkbox.module.css';

const cx = classNames.bind(styles);

export function CheckBox({ checked, onChange }) {
  return (
    <div className={cx('checkbox-wrapper-2')}>
      <input
        type="checkbox"
        className={cx('sc-gJwTLC', 'ikxBAC')}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
