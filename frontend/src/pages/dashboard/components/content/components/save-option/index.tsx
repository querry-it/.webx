import {
    Bookmark,
    BriefcaseBusiness,
    EllipsisVertical,
    Flag,
    Heart,
    House,
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
    const { dispatch } = useEditor();
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
                    <div className={cx("add_item")}>
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
                            <div key={index} className={cx("item")}>
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

    return (
        <>
            <div className={cx("save__bgr")}>
                <div className={cx("save__header")}></div>
                <div className={cx("save__content")}>
                    <div
                        className={cx("content", { active: active === "list" })}
                        onClick={() => {
                            if (active !== "list") {
                                setActive("list");
                            }
                        }}
                    >
                        <span className={cx("content__title")}>Danh sách</span>
                        <span className={cx("content__active")}></span>
                    </div>
                    <div
                        className={cx("content", {
                            active: active === "label",
                        })}
                        onClick={() => {
                            if (active !== "label") {
                                setActive("label");
                            }
                        }}
                    >
                        <span className={cx("content__title")}>
                            Đã gắn nhãn
                        </span>
                        <span className={cx("content__active")}></span>
                    </div>
                </div>
                {active === "list" ? <List /> : <Label />}
            </div>
        </>
    );
}