import classNames from "classnames/bind";
import styles from "./dynamic.module.css";

const cx = classNames.bind(styles);

export default function DynamicComponent() {
    return <div className={cx("location__option")}></div>;
}
