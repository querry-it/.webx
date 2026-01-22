import classNames from "classnames/bind";
import styles from "./history.module.css";
import { useRef } from "react";
import { Clock, Home, Search, X } from "lucide-react";

const cx = classNames.bind(styles);

export default function HistoryComponent() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    return (
        <>
            <div className={cx("save__option")}></div>
            <div className={cx("search-x")}>
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
