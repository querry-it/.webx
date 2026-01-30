import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { } from "lucide-react";
import { useRef } from "react";

const cx = classNames.bind(styles);

export default function PlaceReview() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    return (
        <div className={cx("place-reviews__wrapper")}>
            
        </div>
    );
}