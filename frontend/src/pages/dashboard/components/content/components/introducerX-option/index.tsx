import classNames from "classnames/bind";
import styles from "./introducerX.module.css";

const cx = classNames.bind(styles);

export default function IntroducerXComponent() {
    return <div className={cx("location__prev")}></div>;
}
