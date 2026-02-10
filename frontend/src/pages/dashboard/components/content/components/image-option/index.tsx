import classNames from "classnames/bind";
import styles from "./image.module.css";

const cx = classNames.bind(styles);

export default function ImageComponent() {
    return <div className={cx("location__image")}></div>;
}
