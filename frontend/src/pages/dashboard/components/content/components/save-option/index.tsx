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
    Plus,
    Star,
} from "lucide-react";
import classNames from "classnames/bind";
import styles from "./save.module.css";
import { useRef, useState } from "react";
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SaveComponent() {
    const { state, dispatch } = useEditor();
    const Icon = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [active, setActive] = useState<String>("list");

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
        return (
            <div className={cx("add__bgr")}>
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
                    <input
                        type="text"
                        placeholder="Thêm nội dung mô tả danh sách"
                    />
                </div>
                <div className={cx("location__add")}>
                    <div className={cx("add_item")}>
                        <span>
                            <Plus
                                size={Icon.current.x}
                                strokeWidth={Icon.current.y}
                            />
                        </span>
                        <span>Thêm địa điểm</span>
                    </div>
                </div>
                <div className={cx("input__add")}></div>
                <div className={cx("content__add")}></div>
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
