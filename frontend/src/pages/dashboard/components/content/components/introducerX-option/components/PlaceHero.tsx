import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { Star } from "lucide-react";
import { useRef } from "react";
const cx = classNames.bind(styles);

export default function PlaceHero({ place }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    return (
        <div className={("placehero__wrapper")}>
            <div className={cx("place__img")}>
                <img alt="" src={place.img} />
            </div>

            <div className={cx("place__items")}>
                <div className={cx("place__name")}>
                    <h1>{place.name}</h1>
                </div>
                <div className={cx("place__menu")}>
                    <div className={cx("place__rate")}>
                        <span>{place.rating}</span>
                        <Star size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        <span>({place.reviews})</span>
                    </div>
                    <span>
                        <button >Điểm mốc lịch sử</button>
                    </span>
                </div>
            </div>

        </div>

    );
}