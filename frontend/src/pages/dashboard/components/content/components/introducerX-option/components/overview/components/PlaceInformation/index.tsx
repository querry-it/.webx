// import classNames from "classnames/bind";
// import styles from "./PlaceInformation.module.css";
// import { MapPin, Copy, Clock, ChevronDown, Dot, History } from "lucide-react";
// import { useRef, useState } from "react";

// const cx = classNames.bind(styles);


// export default function PlaceInformation({ place }) {
//     const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
//     const [openDropdown, setOpenDropdown] = useState(false);

//     const toggleDropdown = () => {
//         setOpenDropdown(prev => !prev);
//     };
//     return (
//         <div className={cx("place-information__wrapper")}>
//             <div className={cx("place-information__grid")}>
//                 <div className={cx("place-information__address", "items")}>
//                     <div className={cx("address-items__wrapper")}>
//                         <div className={cx("place-information__icon")}>
//                             <MapPin size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                         </div>
//                         <div className={cx("place-information__link")}>
//                             {place?.address}
//                         </div>
//                         <div className={cx("place-information__copy")}>
//                             <Copy size={16} strokeWidth={IconRef.current.y} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className={cx("place-information__timeline", "items")}>
//                     <div className={cx("timeline-information__wrapper")}>
//                         <div className={cx("timeline-information__icon")}>
//                             <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                         </div>
//                         <div className={cx("timeline-information__title")}>
//                             <div>{place.status}</div>
//                             <Dot size={10} />
//                             <div>{place.open}</div>
//                         </div>
//                         <div className={cx("timeline__icon")}>
//                             <ChevronDown size={16} strokeWidth={IconRef.current.y}
//                                 style={{
//                                     transform: openDropdown ? "rotate(180deg)" : "rotate(0deg)",
//                                     transition: "0.2s"
//                                 }} />
//                         </div>
//                     </div>
//                     {openDropdown &&
//                         place[0]?.open &&
//                         typeof place[0].open === "object" && (
//                             <div className={cx("dropdown__wrapper")}>
//                                 <div className={cx("dropdown__items")}>
//                                     {Object.entries(place[0].open).map(([day, time]) => (
//                                         <div key={day} className={cx("dropdown__item")}>
//                                             <span>{day}</span>
//                                             <span>{time}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )
//                     }


//                 </div>


//                 <div className={cx("place-information__history", "items")}>
//                     <div className={cx("placehistory__wrapper")}>
//                         <div className={cx("history-information__icon")}>
//                             <History size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                         </div>
//                         <div className={cx("placehistory__content")}>Hoạt động của bạn trên Maps</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import classNames from "classnames/bind";
import styles from "./PlaceInformation.module.css";
import { MapPin, Copy, Clock, ChevronDown, Dot, History } from "lucide-react";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);


export default function PlaceInformation({ place }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(prev => !prev);
    };
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
                            <Copy size={16} strokeWidth={IconRef.current.y} />
                        </div>
                    </div>
                </div>

                <div className={cx("place-information__timeline", "items")}>
                    <div className={cx("timeline-information__wrapper")}>
                        <div className={cx("timeline-information__icon")}>
                            <Clock size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                        <div className={cx("timeline-information__title")}>
                            <div>{place.status}</div>
                            <Dot size={10} />
                            <div>{place.open}</div>
                        </div>
                        <div className={cx("timeline__icon")}>
                            <ChevronDown size={16} strokeWidth={IconRef.current.y}
                                style={{
                                    transform: openDropdown ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "0.2s"
                                }} />
                        </div>
                    </div>
                    {/* {openDropdown && Array.isArray(place.open) && (
                        <div className={cx("dropdown__wrapper")}>
                            <div className={cx("dropdown__items")}>
                                {place.open.map((item) => (
                                    <div key={item.day} className={cx("dropdown__item")}>
                                        <span>{item.day}</span>
                                        <span>
                                            {item.open && item.close
                                                ? `${item.open} – ${item.close}`
                                                : "Đóng cửa"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}

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