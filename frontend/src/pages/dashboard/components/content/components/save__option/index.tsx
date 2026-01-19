import {
    Amphora,
    Bike,
    Building2,
    Bus,
    Car,
    Clock,
    Ellipsis,
    Footprints,
    Home,
    Landmark,
    Leaf,
    Map,
    Plane,
    ReceiptText,
    Search,
    SquareArrowOutUpRight,
    Star,
    Trees,
    X,
} from "lucide-react";
import classNames from "classnames/bind";
import styles from "./save.module.css";
import { useRef } from "react";

const cx = classNames.bind(styles);

export default function Save() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    return (
        <>
            <div className={cx("save__option")}></div>
            <div className={cx("search-x")}>
                <div className={cx("search__input")}>
                    <div className={cx("search__input--title")}>
                        <input
                            onFocus={() => SetSearch(false)}
                            onBlur={() => SetSearch(true)}
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
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                    </div>
                </div>
                <div className={cx("items")}>
                    <Home
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items")}>
                    <Clock
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items")}>
                    <Clock
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items")}>
                    <Clock
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items")}>
                    <Clock
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items")}>
                    <Clock
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon")}
                    />
                    <p className={cx("title")}>Nhà riêng</p>
                    <X
                        size={IconRef.current.x}
                        strokeWidth={IconRef.current.y}
                        className={cx("icon_x")}
                    />
                </div>
                <div className={cx("items_x")}>
                    <p className={cx("title")}>
                        Nội dung tìm kiếm khác gần đây
                    </p>
                </div>
            </div>
        </>
    );
}
