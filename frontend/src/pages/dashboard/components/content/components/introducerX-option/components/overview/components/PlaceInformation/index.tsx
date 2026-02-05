
import classNames from "classnames/bind";
import styles from "./PlaceInformation.module.css";
import { MapPin, Copy, Clock, ChevronDown, Dot, History } from "lucide-react";
import { useRef, useState, useMemo } from "react";

const cx = classNames.bind(styles);


export default function PlaceInformation({ place }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(prev => !prev);
    };

    const dayMap = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
    ];

    const todayName = dayMap[new Date().getDay()];

    const sortedOpenList = useMemo(() => {
        if (!Array.isArray(place?.open)) return [];

        const todayIndex = place.open.findIndex(
            item => item.day === todayName
        );

        if (todayIndex === -1) return place.open;

        return [
            ...place.open.slice(todayIndex),
            ...place.open.slice(0, todayIndex),
        ];
    }, [place?.open, todayName]);

    const todayOpen = sortedOpenList[0];

    const nowMinutes =
        new Date().getHours() * 60 + new Date().getMinutes();

    const isOpenNow = useMemo(() => {
        if (!todayOpen || todayOpen.time === "Đóng cửa") return false;

        const [open, close] = todayOpen.time.split(" - ");
        const [oh, om] = open.split(":").map(Number);
        const [ch, cm] = close.split(":").map(Number);

        const openMinutes = oh * 60 + om;
        const closeMinutes = ch * 60 + cm;

        return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
    }, [todayOpen, nowMinutes]);

    const openStatus = {
        text: isOpenNow ? "Đang mở cửa" : "Đang đóng cửa",
        status: isOpenNow ? "open" : "closed",
    };



    return (
        <div className={cx("place-information__wrapper")}>
            <div className={cx("place-information__grid")}>
                <div className={cx("place-information__address", "items")}>
                    <div className={cx("address-items__wrapper")}>
                        <div className={cx("place-information__icon")}>
                            <MapPin size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>

                        <div className={cx("place-information__address-wrapper")}>
                            <div className={cx("place-information__link")}>
                                {place?.address}
                            </div>

                            <button
                                className={cx("place-information__copy")}
                                onClick={() => navigator.clipboard.writeText(place?.address)}
                                title="Sao chép địa chỉ"
                            >
                                <Copy size={16} strokeWidth={IconRef.current.y} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className={cx("place-information__timeline", "items")}>
                    <div onClick={toggleDropdown} className={cx("timeline-information__wrapper")}>
                        <div className={cx("timeline-information__icon")}>
                            <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                        <div className={cx("timeline-information__title")}>
                            <div
                                className={cx(
                                    "open-status",
                                    openStatus.status === "open" ? "open" : "closed"
                                )}
                            >{openStatus.text}</div>
                            {!openDropdown && (
                                <>
                                    <Dot size={10} />
                                    <div>{todayOpen?.time}</div>
                                </>
                            )}
                        </div>
                        <div className={cx("timeline__icon")}>
                            <ChevronDown size={16} strokeWidth={IconRef.current.y}
                                style={{
                                    transform: openDropdown ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "0.2s"
                                }} />
                        </div>
                    </div>
                    {openDropdown && (
                        <div className={cx("dropdown__wrapper")}>
                            <div className={cx("dropdown__items")}>
                                {sortedOpenList.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx("dropdown__item", {
                                            "is-today": index === 0,
                                        })}
                                    >
                                        <span className={cx("item-day")}>{item.day}</span>
                                        <span className={cx("item-time")}>{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={cx("place-information__history", "items")}>
                    <div className={cx("placehistory__wrapper")}>
                        <div className={cx("history-information__icon")}>
                            <History size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                        <div className={cx("placehistory__content")}>Hoạt động của bạn trên Maps</div>
                    </div>
                </div>
            </div>
        </div>
    );
}