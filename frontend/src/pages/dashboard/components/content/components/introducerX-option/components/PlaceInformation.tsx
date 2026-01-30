import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { MapPin, Copy, Clock, ChevronDown, Dot, History, Icon } from "lucide-react";
import { useRef } from "react";

const cx = classNames.bind(styles);


export default function PlaceInformation({ place }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    return (
        <div className={cx("place-information__wrapper")}>
            <div className={cx("place-information__grid")}>

                <div className={cx("place-information__address", "items")}>
                    <div className={cx("address-items__wrapper")}>
                        <div className={cx("place-information__icon")}>
                            <MapPin size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                        <div className={cx("place-information__link")}>
                            {place?.address}
                        </div>
                        <div className={cx("place-information__copy")}>
                            <Copy size={16} strokeWidth={IconRef.current.y}/>
                        </div>
                    </div>
                </div>

                <div className={cx("place-information__timeline", "items")}>
                    <div className={cx("timeline-information__wrapper")}>
                        <div className={cx("timeline-information__icon")}>
                            <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y}/>
                        </div>
                        <div className={cx("timeline-information__title")}>
                            <div>{place.status}</div>
                            <Dot size={10}/>
                            <div>{place.open}</div>
                        </div>
                        <div className={cx("timeline__icon")}>
                            <ChevronDown size={16} strokeWidth={IconRef.current.y}/>
                        </div>
                    </div>
                </div>


                <div className={cx("place-information__history", "items")}>
                    <div className={cx("placehistory__wrapper")}>
                        <div className={cx("history-information__icon")}>
                            <History size={IconRef.current.x} strokeWidth={IconRef.current.y}/>
                        </div>
                        <div className={cx("placehistory__content")}>Hoạt động của bạn trên Maps</div>
                    </div>
                </div>
            </div>
        </div>
    );
}