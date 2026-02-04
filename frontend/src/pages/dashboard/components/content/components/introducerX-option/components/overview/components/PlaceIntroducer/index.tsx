import classNames from "classnames/bind";
import styles from "./PlaceIntroducer.module.css";
import { } from "lucide-react";
import { useRef } from "react";
const cx = classNames.bind(styles);

export default function PlaceIntroducer ({ place }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    return (
        <div className={cx("place-introducer__wrapper")}>
            <div className={cx("place-introducer__items")}>
                <div className={cx("place-introducer__desc")}>
                   {place.desc}
                </div>
            </div>
        </div>
    );
}