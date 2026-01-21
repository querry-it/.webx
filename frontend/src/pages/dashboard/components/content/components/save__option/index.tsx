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
import { useRef, useState } from "react";
import Label from "./components/Label";
import List from "./components/List";
import AddPlace from "./components/AddPlace";
import PlaceList from "./components/PlaceList";

const cx = classNames.bind(styles);

export default function Save() {

    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [activeTab, setActiveTab] = useState("list");

    return (
        <>
            <div className={cx("save__option")}>
                {/* {true && (
                    <div className="w-[372px] h-screen relative bg-white flex flex-col">
                        <div className="flex items-end w-full h-[130px] shrink-0 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.4)]">
                            <button onClick={() => setActiveTab("list")} className={`${activeTab === "list" ? "hover:bg-blue-100" : ""} mx-auto hover:bg-gray-200 h-[48px] p-4`}>
                                <div className={` relative w-fit`}>
                                    <div className={`${activeTab === "list" ? "text-teal-600" : ""} whitespace-nowrap text-gray-500 font-semibold text-[14px]`}>
                                        Danh sách
                                    </div>
                                    <div className={`${activeTab === "list" ? "bg-teal-600" : "hidden"} h-[3px] absolute top-[30px] left-0 right-0 rounded-t-[3px]`}/>
                                </div>
                            </button>

                            <button onClick={() => setActiveTab("label")} className={`${activeTab == "label" ? "hover:bg-blue-100" : ""} mx-auto hover:bg-gray-200 h-[48px] p-4`}>
                                <div className="relative w-fit">
                                    <div className={`${activeTab === "label" ? "text-teal-600" : ""} whitespace-nowrap text-gray-500 font-semibold text-[14px]`}>
                                        Đã gắn nhãn
                                    </div>
                                < div className={`${activeTab === "label" ? "bg-teal-600" : "hidden"}  h-[3px] absolute top-[30px] left-0 right-0 rounded-t-[3px]`} />
                                </div>
                            </button>

                        </div>

                        {activeTab === "list" && (<List />)}

                        {activeTab === "label" && (<Label />)}

                    </div>
                )} */}
                {/* {false && (<PlaceList />)} */}
                {/* </div>
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
                </div> */}
                {/* <div className={cx("items")}>
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
                </div> */}
                {true && <AddPlace />}
            </div>
        </>
    );
}
