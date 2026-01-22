import classNames from "classnames/bind";
import styles from "./search.module.css";
import { useRef } from "react";
import {
    Amphora,
    Building2,
    Ellipsis,
    Landmark,
    Map,
    ReceiptText,
    Search,
    SquareArrowOutUpRight,
    Trees,
} from "lucide-react";

const cx = classNames.bind(styles);

export default function SearchComponent() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    return (
        <div className={cx("search")}>
            <div className={cx("search__input")}>
                <div className={cx("search__input--title")}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm trên IchigoMazone Maps"
                    />
                </div>
                <div className={cx("search__input--icon")}>
                    <Search
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                    />
                </div>
                <div className={cx("search__input--road")}>
                    <SquareArrowOutUpRight
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                    />
                </div>
            </div>
            <div className={cx("search__sightseeing")}>
                <ReceiptText size={20} strokeWidth={1.6} />
                <p>Tất cả các điểm </p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Landmark
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Di tích</p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Trees
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Thiên nhiên</p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Amphora
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Bảo tàng</p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Building2
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Kiến trúc</p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Map size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                <p>Khu phố</p>
            </div>
            <div className={cx("search__sightseeing")}>
                <Ellipsis
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Lựa chọn khác</p>
            </div>
        </div>
    );
}
