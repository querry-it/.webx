
// import classNames from "classnames/bind";
// import styles from "./search.module.css";
// import { useRef } from "react";
// import {
//     Amphora,
//     Building2,
//     Ellipsis,
//     Landmark,
//     Map,
//     ReceiptText,
//     Search,
//     SquareArrowOutUpRight,
//     Trees,
// } from "lucide-react";
// import { useEditor } from "../../../../../../state/useEditor";

// const cx = classNames.bind(styles);

// export default function SearchComponent() {
//     const { state, dispatch } = useEditor();
//     const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

//     const setState = (option: string, key: string, value: boolean) => {
//         dispatch({
//             type: option,
//             payload: { [key]: value },
//         });
//     };

//     return (
//         <div className={cx("search")}>
//             <div className={cx("search__input")}>
//                 <div className={cx("search__input--title")}>
//                     <input
//                         type="text"
//                         placeholder="Tìm kiếm trên IchigoMazone Maps"
//                     />
//                 </div>
//                 <div className={cx("search__input--icon")}>
//                     <Search
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                     />
//                 </div>
//                 <div
//                     className={cx("search__input--road")}
//                     onClick={() =>
//                         setState("SET_NAVBAR_X", "activeX", "roadmap")
//                     }
//                 >
//                     <SquareArrowOutUpRight
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                     />
//                 </div>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <ReceiptText size={20} strokeWidth={1.6} />
//                 <p>Tất cả các điểm </p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Landmark
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <p>Di tích</p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Trees
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <p>Thiên nhiên</p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Amphora
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <p>Bảo tàng</p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Building2
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <p>Kiến trúc</p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Map size={IconRef.current.x} strokeWidth={IconRef.current.y} />
//                 <p>Khu phố</p>
//             </div>
//             <div className={cx("search__sightseeing")}>
//                 <Ellipsis
//                     size={IconRef.current.x}
//                     strokeWidth={IconRef.current.y}
//                 />
//                 <p>Lựa chọn khác</p>
//             </div>
//         </div>
//     );
// }

import classNames from "classnames/bind";
import styles from "./search.module.css";
import { useRef, useState, useMemo, useEffect } from "react";
import {
    Clock,
    Home,
    MapPin,
    Search,
    SquareArrowOutUpRight,
    X,
    Landmark,
    Trees,
    Amphora,
    Building2,
    Map,
    Leaf,
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
} from "lucide-react";
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SearchComponent() {
    const { state, dispatch } = useEditor();
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    const recentSearches = [
        "Nhà riêng",
        "Quán cà phê gần đây",
        "Hồ Gươm",
        "Bảo tàng Hà Nội",
    ];

    const suggestions = [
        "Hồ Gươm, Hà Nội",
        "Hồ Tây, Hà Nội",
        "Hoàng Thành Thăng Long",
        "Nhà hát Lớn Hà Nội",
        "Bưu điện Hà Nội",
        "Văn Miếu Quốc Tử Giám",
    ];

    const menuOptions = [
        { icon: LayoutGrid, label: "Tất cả" },
        { icon: Landmark, label: "Di tích" },
        { icon: Trees, label: "Thiên nhiên" },
        { icon: Amphora, label: "Bảo tàng" },
        { icon: Building2, label: "Kiến trúc" },
        { icon: Map, label: "Khu phố" },
        { icon: Leaf, label: "Công viên" },
        { icon: Home, label: "Làng cổ" },
    ];

    const filteredSuggestions = useMemo(() => {
        return suggestions.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    const showSuggestions = query.trim().length > 0;

    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScroll();

        el.addEventListener("scroll", checkScroll);
        return () => el.removeEventListener("scroll", checkScroll);
    }, []);


    const scroll = (x) => {
        scrollRef.current.scrollBy({
            left: x,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className={cx("search", { active: focused })}>
                <div className={cx("search__input")}>
                    <div className={cx("search__input--title")}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên IchigoMazone Maps"
                            value={query}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setTimeout(() => setFocused(false), 150)}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className={cx("search__input--icon")}>
                        <Search
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                    </div>

                    <div
                        className={cx("search__input--road")}
                        onClick={() =>
                            setState("SET_NAVBAR_X", "activeX", "roadmap")
                        }
                    >
                        <SquareArrowOutUpRight
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                    </div>
                </div>
                {focused && (
                    <>
                        {showSuggestions ? (
                            filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((item) => (
                                    <div
                                        key={item}
                                        className={cx("items")}
                                        onMouseDown={() => setQuery(item)}
                                    >
                                        <MapPin className={cx("icon")} size={20} />
                                        <p className={cx("title")}>{item}</p>
                                    </div>
                                ))
                            ) : (
                                <div className={cx("items_x")}>
                                    <p className={cx("title")}>
                                        Không tìm thấy kết quả
                                    </p>
                                </div>
                            )
                        ) : (
                            <>
                                {recentSearches.map((item, i) => (
                                    <div key={i} className={cx("items")}>
                                        <Clock className={cx("icon")} size={20} />
                                        <p className={cx("title")}>{item}</p>
                                        <X className={cx("icon_x")} size={18} />
                                    </div>
                                ))}

                                <div className={cx("items_x")}>
                                    <p className={cx("title")}>
                                        Nội dung tìm kiếm khác gần đây
                                    </p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>



            <div className={cx("dynamic")}>
                <div className={cx("dynamic__wrapper")}>
                    {showLeft && (
                        <div
                            className={cx("btn__scroll", "left")}
                            onClick={() => scroll(-200)}
                        >
                            <ChevronLeft size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                    )}

                    <div className={cx("dynamic__list")} ref={scrollRef}>
                        {menuOptions.map((option, index) => (
                            <div key={index} className={cx("dynamic__option")}>
                                <option.icon
                                    size={IconRef.current.x}
                                    strokeWidth={IconRef.current.y}
                                />

                                <span>{option.label}</span>


                            </div>
                        ))}
                    </div>
                    {showRight && (
                        <div
                            className={cx("btn__scroll", "right")}
                            onClick={() => scroll(200)}
                        >
                            <ChevronRight size={IconRef.current.x} strokeWidth={IconRef.current.y} />
                        </div>
                    )}
                </div>


            </div>

        </>
    );
}
