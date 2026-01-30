import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
const cx = classNames.bind(styles);

export default function PlaceIntroducer() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    return (
        <div className={cx("place-introducer__wrapper")}>
            <div className={cx("place-introducer__items")}>
                <div className={cx("place-introducer__desc")}>
                    Thi hài Chủ tịch Hồ Chí Minh, lãnh tụ
                    nước Việt Nam, được đặt tại lăng mộ và
                    khu di tích lịch sử này.
                </div>
            </div>
        </div>
    );
}