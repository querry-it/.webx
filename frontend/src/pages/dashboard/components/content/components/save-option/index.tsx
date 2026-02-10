import {
    Bookmark,
    BriefcaseBusiness,
    EllipsisVertical,
    Flag,
    Heart,
    House,
    LockKeyhole,
    Logs,
    Luggage,
    MapPin,
    Plus,
    Search,
    Star,
    X,
} from "lucide-react";
import classNames from "classnames/bind";
import styles from "./save.module.css";
import { useRef, useState, useMemo } from "react";
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SaveComponent() {
    const { state, dispatch } = useEditor();
    const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [query, setQuery] = useState("");

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    const typeIcon = {
        favorite: Heart,
        starred: Star,
        saved: Bookmark,
        wishlist: Flag,
        plan: Luggage,
        custom: Logs,
    };

    const list = [
        { name: "Mục ưa thích", option: "favorite", quantity: 9 },
        { name: "Mục ưa thích", option: "custom", quantity: 0 },
        { name: "Danh sách không có tiêu đề", option: "custom", quantity: 0 },
        { name: "Danh sách không có tiêu đề", option: "custom", quantity: 0 },
        { name: "Danh sách không có tiêu đề", option: "custom", quantity: 0 },
        { name: "Danh sách không có tiêu đề", option: "custom", quantity: 0 },
        { name: "Danh sách không có tiêu đề", option: "custom", quantity: 0 },
        { name: "Địa điểm muốn đến", option: "wishlist", quantity: 0 },
        { name: "Kế hoạch du lịch", option: "plan", quantity: 0 },
        { name: "Địa điểm đã gắn sao", option: "starred", quantity: 0 },
        { name: "Địa điểm đã lưu", option: "saved", quantity: 0 },
    ];

    function Label() {
        return (
            <>
                <div className={cx("save__footer")}>
                    <div className={cx("item")}>
                        <div className={cx("header")}>
                            <House
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </div>
                        <div className={cx("content")}>
                            <span className={cx("title")}>Nhà riêng</span>
                            <span className={cx("content")}>
                                Đặt địa chỉ nhà riêng của bạn
                            </span>
                        </div>
                        <div className={cx("footer")}>
                            <EllipsisVertical
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("header")}>
                            <BriefcaseBusiness
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </div>
                        <div className={cx("content")}>
                            <span className={cx("title")}>Nơi làm việc</span>
                            <span className={cx("content")}>
                                Đặt địa chỉ làm việc của bạn
                            </span>
                        </div>
                        <div className={cx("footer")}>
                            <EllipsisVertical
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function List() {
        return (
            <>
                <div className={cx("save__footer")}>
                    <div
                        className={cx("add_item")}
                        onClick={() => {
                            if (
                                state.navbar_x.save !== "add" &&
                                !state.navbar_x.back
                            ) {
                                setState("SET_NAVBAR_X", "save", "add");
                                setState("SET_NAVBAR_X", "back", true);
                            }
                        }}
                    >
                        <span>
                            <Plus
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </span>
                        <span>Danh sách mới</span>
                    </div>
                    {list.map((value, index) => {
                        const Logo = typeIcon[value.option];
                        return (
                            <div
                                key={index}
                                className={cx("item")}
                                onClick={() => {
                                    if (
                                        state.navbar_x.save !== "add" &&
                                        !state.navbar_x.back
                                    ) {
                                        setState("SET_NAVBAR_X", "save", "add");
                                        setState("SET_NAVBAR_X", "back", true);
                                    }
                                }}
                            >
                                <div className={cx("header")}>
                                    {Logo && (
                                        <Logo
                                            size={Icon.current.x}
                                            strokeWidth={Icon.current.y}
                                        />
                                    )}
                                </div>
                                <div className={cx("content")}>
                                    <span className={cx("title")}>
                                        {value.name}
                                    </span>
                                    <span className={cx("content")}>
                                        {`Riêng tư - ${value.quantity} địa điểm`}
                                    </span>
                                </div>
                                <div className={cx("footer")}>
                                    <EllipsisVertical
                                        size={Icon.current.x}
                                        strokeWidth={Icon.current.y}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    function Add() {
        const [inputValue, setInputValue] = useState<string>("");
        const [activeSearch, setActiveSearch] = useState<boolean>(false);
        const ref = useRef(null);
        const MAX_ROWS = 4;

        const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
            if (!el) return;

            el.style.height = "auto";

            const style = window.getComputedStyle(el);
            const lineHeight = parseFloat(style.lineHeight);
            const padding =
                parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

            const maxHeight = lineHeight * MAX_ROWS + padding;

            if (el.scrollHeight > maxHeight) {
                el.style.height = maxHeight + "px";
                el.style.overflowY = "auto";
            } else {
                el.style.height = el.scrollHeight + "px";
                el.style.overflowY = "hidden";
            }
        };

        const suggestions = [
            "Hồ Gươm, Hà Nội",
            "Hồ Tây, Hà Nội",
            "Phố cổ Hà Nội",
            "Chợ Đồng Xuân",
            "Nhà hát Lớn Hà Nội",
            "Lăng Chủ tịch Hồ Chí Minh",
            "Quảng trường Ba Đình",
            "Văn Miếu Quốc Tử Giám",
            "Hoàng Thành Thăng Long",
            "Chùa Một Cột",
            "Chùa Trấn Quốc",
            "Nhà thờ Lớn Hà Nội",
            "Cầu Long Biên",
            "Phố đi bộ Hồ Gươm",
            "Nhà tù Hỏa Lò",
            "Bảo tàng Dân tộc học Việt Nam",
            "Bảo tàng Lịch sử Quốc gia",
            "Bảo tàng Mỹ thuật Việt Nam",
            "Công viên Thống Nhất",
            "Công viên Yên Sở",
            "Hồ Thiền Quang",
            "Hồ Trúc Bạch",
            "Phủ Tây Hồ",
            "Làng gốm Bát Tràng",
            "Làng lụa Vạn Phúc",
            "Thiên đường Bảo Sơn",
            "Keangnam Landmark 72 Skywalk",
            "Tháp nước Hàng Đậu",
            "Ga Hà Nội",
            "Phố sách 19/12",
            "Phố bia Tạ Hiện",
            "Chợ hoa Quảng Bá",
            "Thung lũng hoa Hồ Tây",
            "Công viên nước Hồ Tây",
            "VinKE & Vinpearl Aquarium Times City",
            "Aeon Mall Long Biên",
            "Cầu Nhật Tân",
            "Bãi đá sông Hồng",
            "Đền Ngọc Sơn",
            "Nhà hát Múa rối nước Thăng Long",
        ];

        const filteredSuggestions = useMemo(() => {
            return suggestions.filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase()),
            );
        }, [inputValue]);

        const showSuggestions = inputValue.trim().length > 0;

        return (
            <div className={cx("add__bgr", { delete: activeSearch })}>
                <div className={cx("space__add")}></div>
                <div className={cx("name__add")}>
                    <div className={cx("name__content")}>
                        <div className={cx("content__input")}>
                            <input
                                type="text"
                                placeholder="Danh sách không có tiêu đề"
                            />
                        </div>
                    </div>
                    <div className={cx("name__btn")}>
                        <EllipsisVertical
                            size={Icon.current.x}
                            strokeWidth={Icon.current.y}
                        />
                    </div>
                </div>
                <div className={cx("quantity__add")}>
                    <span className={cx("quantity__icon")}>
                        <LockKeyhole
                            size={Icon.current.x - 3}
                            strokeWidth={Icon.current.y}
                        />
                    </span>
                    <span
                        className={cx("quantity__content")}
                    >{`Riêng tư - 0 địa điểm`}</span>
                </div>
                <div className={cx("note__add")}>
                    <textarea
                        ref={ref}
                        rows={1}
                        placeholder="Thêm nội dung mô tả danh sách"
                        onInput={(e) => autoResizeTextarea(e.currentTarget)}
                    />
                </div>
                <div className={cx("location__add")}>
                    <div
                        className={cx("add_item")}
                        onClick={() => {
                            setActiveSearch(!activeSearch);
                            setInputValue("");
                        }}
                    >
                        <span>
                            <Plus
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </span>
                        <span>Thêm địa điểm</span>
                    </div>
                </div>
                <div className={cx("input__add")}>
                    <div className={cx("input__content")}>
                        <div className={cx("icon__left")}>
                            <Search
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </div>
                        <div className={cx("content")}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm địa điểm cần thêm vào"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        {inputValue && (
                            <div
                                className={cx("icon__right")}
                                onClick={() => setInputValue("")}
                            >
                                <X
                                    size={Icon.current.x}
                                    strokeWidth={Icon.current.y}
                                />
                            </div>
                        )}
                    </div>
                    {showSuggestions && (
                        <div className={cx("suggestions")}>
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((item, index) => (
                                    <div
                                        key={`${item}-${index}`}
                                        className={cx("items")}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setInputValue(item);
                                        }}
                                    >
                                        <MapPin
                                            className={cx("icon")}
                                            size={18}
                                        />
                                        <p className={cx("title")}>{item}</p>
                                    </div>
                                ))
                            ) : (
                                <div className={cx("items_x")}>
                                    <p className={cx("title")}>
                                        Không tìm thấy kết quả
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <div
                        className={cx("input__btn")}
                        onClick={() => {
                            setActiveSearch(true);
                            setInputValue("");
                        }}
                    >
                        <span>Xong</span>
                    </div>
                </div>
                <div className={cx("content__add")}>
                    <div className={cx("content__space")}></div>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <LocationItem key={i} />
                    ))}
                    <div className={cx("content__space")}></div>
                </div>
            </div>
        );
    }

    function LocationItem() {
        const [hover, setHover] = useState<boolean>(false);
        const [active, setActive] = useState<boolean>(false);
        const refX = useRef(null);
        const MAX_ROWS = 4;

        const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
            if (!el) return;

            el.style.height = "auto";

            const style = window.getComputedStyle(el);
            const lineHeight = parseFloat(style.lineHeight);
            const padding =
                parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

            const maxHeight = lineHeight * MAX_ROWS + padding;

            if (el.scrollHeight > maxHeight) {
                el.style.height = maxHeight + "px";
                el.style.overflowY = "auto";
            } else {
                el.style.height = el.scrollHeight + "px";
                el.style.overflowY = "hidden";
            }
        };
        return (
            <div
                className={cx("item__location", { noteX: active })}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className={cx("location__img")}>
                    <img
                        src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwer_J5-qDA7caFQ9qQJ5W19Ia1qKoSj3WwepiYI6n7ZECYEoYExWYTYC8SJPxL3b9LcPum4168sm2kP7PE5AEDfWsnH-tYqFxJwj2OFN6580QkWhd6oXbGrko67manH6VRUZfwvZ=w100-h115-p-k-no"
                        alt="avatar"
                    />
                    {hover && (
                        <span className={cx("delete")}>
                            <X
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </span>
                    )}
                </div>
                <div className={cx("location__content")}>
                    <div className={cx("title")}>Lăng Chủ tịch Hồ Chí Minh</div>
                    <div className={cx("star")}>
                        4,7 <span className={cx("star__icon")}>★</span>
                        (19.895)
                    </div>
                    <div className={cx("no")}></div>
                    <div className={cx("type")}>Điểm mốc lịch sử</div>
                    {!active && (
                        <div
                            className={cx("note")}
                            onClick={() => {
                                setActive(true);
                            }}
                        >
                            <div className={cx("note__content")}>
                                <span className={cx("icon")}>
                                    <Plus
                                        size={Icon.current.x}
                                        strokeWidth={Icon.current.y}
                                    />
                                </span>
                                <span className={cx("content")}>Ghi chú</span>
                            </div>
                        </div>
                    )}
                </div>
                {active && (
                    <div className={cx("location__note")}>
                        <textarea
                            ref={refX}
                            rows={1}
                            placeholder="Thêm ghi chú"
                            onInput={(e) => autoResizeTextarea(e.currentTarget)}
                        ></textarea>
                    </div>
                )}
            </div>
        );
    }

    function Save() {
        return (
            <div className={cx("save__bgr")}>
                <div className={cx("save__header")}></div>
                <div className={cx("save__content")}>
                    <div
                        className={cx("content", {
                            active: state.navbar_x.save === "list",
                        })}
                        onClick={() => {
                            if (state.navbar_x.save !== "list") {
                                setState("SET_NAVBAR_X", "save", "list");
                            }
                        }}
                    >
                        <span className={cx("content__title")}>Danh sách</span>
                        <span className={cx("content__active")}></span>
                    </div>
                    <div
                        className={cx("content", {
                            active: state.navbar_x.save === "label",
                        })}
                        onClick={() => {
                            if (state.navbar_x.save !== "label") {
                                setState("SET_NAVBAR_X", "save", "label");
                            }
                        }}
                    >
                        <span className={cx("content__title")}>
                            Đã gắn nhãn
                        </span>
                        <span className={cx("content__active")}></span>
                    </div>
                </div>
                {state.navbar_x.save === "list" ? <List /> : <Label />}
            </div>
        );
    }

    return <>{state.navbar_x.save === "add" ? <Add /> : <Save />}</>;
}
