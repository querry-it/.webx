// import classNames from "classnames/bind";
// import styles from "./history.module.css";
// import { useRef } from "react";
// import { Clock, Home, Search, X } from "lucide-react";

// const cx = classNames.bind(styles);

// export default function HistoryComponent() {
//     const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
//     return (
//         <>
//             <div className={cx("save__option")}></div>
//             <div className={cx("search-x")}>
//                 <div className={cx("search__input")}>
//                     <div className={cx("search__input--title")}>
//                         <input
//                             type="text"
//                             placeholder="Tìm kiếm trên IchigoMazone Maps"
//                         />
//                     </div>
//                     <div className={cx("search__input--icon")}>
//                         <Search
//                             size={IconRef.current.x}
//                             strokeWidth={IconRef.current.y}
//                         />
//                     </div>
//                     <div className={cx("search__input--road")}>
//                         <X
//                             size={IconRef.current.x}
//                             strokeWidth={IconRef.current.y}
//                         />
//                     </div>
//                 </div>
//                 <div className={cx("items")}>
//                     <Home
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items")}>
//                     <Clock
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items")}>
//                     <Clock
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items")}>
//                     <Clock
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items")}>
//                     <Clock
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items")}>
//                     <Clock
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon")}
//                     />
//                     <p className={cx("title")}>Nhà riêng</p>
//                     <X
//                         size={IconRef.current.x}
//                         strokeWidth={IconRef.current.y}
//                         className={cx("icon_x")}
//                     />
//                 </div>
//                 <div className={cx("items_x")}>
//                     <p className={cx("title")}>
//                         Nội dung tìm kiếm khác gần đây
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// }






// import classNames from "classnames/bind";
// import styles from "./history.module.css";
// import { useEffect, useRef, useState } from "react";
// import { Clock, Home, Search, X } from "lucide-react";

// const cx = classNames.bind(styles);

// type HistoryItem = {
//     id: number;
//     title: string;
//     type: "home" | "recent";
// };

// export default function HistoryComponent() {
//     const IconRef = useRef({ x: 20, y: 1.6 });

//     const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
//     const [close, setClose] = useState<number | null>(null);

//     useEffect(() => {
//         setTimeout(() => {
//             setHistoryList([
//                 { id: 1, title: "Nhà riêng", type: "home" },
//                 { id: 2, title: "Quán cà phê", type: "recent" },
//                 { id: 3, title: "Trường học", type: "recent" },
//                 { id: 4, title: "Siêu thị", type: "recent" },
//                 { id: 5, title: "Bệnh viện", type: "recent" },
//             ]);
//             setLoading(false);
//         }, 500);
//     }, []);

//     return (
//         <>
//             <div className={cx("save__option")} />

//             <div className={cx("search-x")}>
//                 <div className={cx("search__input")}>
//                     <div className={cx("search__input--title")}>
//                         <input
//                             type="text"
//                             placeholder="Tìm kiếm trên IchigoMazone Maps"
//                         />
//                     </div>

//                     <div className={cx("search__input--icon")}>
//                         <Search
//                             size={IconRef.current.x}
//                             strokeWidth={IconRef.current.y}
//                         />
//                     </div>

//                     <div className={cx("search__input--road")}>
//                         <X
//                             size={IconRef.current.x}
//                             strokeWidth={IconRef.current.y}
//                         />
//                     </div>
//                 </div>

//                 {historyList.map((item) => (
//                     <div key={item.id} 
//                         className={cx("items")}
//                         onMouseEnter={() => setClose(item.id)}
//                         onMouseLeave={() => setClose(null)}
//                     >
//                         {item.type === "home" ? (
//                             <Home
//                                 size={IconRef.current.x}
//                                 strokeWidth={IconRef.current.y}
//                                 className={cx("icon")}
//                             />
//                         ) : (
//                             <Clock
//                                 size={IconRef.current.x}
//                                 strokeWidth={IconRef.current.y}
//                                 className={cx("icon")}
//                             />
//                         )}

//                         <p className={cx("title")}>{item.title}</p>

//                         {close === item.id && (<X
//                             size={IconRef.current.x}
//                             strokeWidth={IconRef.current.y}
//                             className={cx("icon_x")}
//                         />)}
//                     </div>
//                 ))}

//                 {historyList.length > 0 && (
//                     <div className={cx("items_x")}>
//                         <p className={cx("title")}>
//                             Nội dung tìm kiếm khác gần đây
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }



import { useEffect, useRef, useState } from "react";
import { Clock, Home, Search, X } from "lucide-react";

type HistoryItem = {
    id: number;
    title: string;
    type: "home" | "recent";
};

export default function HistoryComponent() {
    const IconRef = useRef({ x: 20, y: 1.6 });

    const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
    const [close, setClose] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setHistoryList([
                { id: 1, title: "Nhà riêng", type: "home" },
                { id: 2, title: "Quán cà phê", type: "recent" },
                { id: 3, title: "Trường học", type: "recent" },
                { id: 4, title: "Siêu thị", type: "recent" },
                { id: 5, title: "Bệnh viện", type: "recent" },
            ]);
        }, 500);
    }, []);

    return (
        <>
            <div className="absolute top-0 bottom-0 w-[372px] bg-white border-r border-gray-300 z-[1000]" />

            <div className="absolute top-2.5 ml-2.5 z-[1001] rounded-2xl bg-white shadow-[0_0_0_1px_#cacaca]">
                <div className="w-[350px] h-12 px-4 flex items-center">
                    <div className="w-[280px] h-[70%] text-sm">
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên IchigoMazone Maps"
                            className="w-[95%] h-full outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="w-[50px] flex justify-end items-center cursor-pointer">
                        <Search
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                    </div>

                    <div className="w-[50px] flex justify-end items-center cursor-pointer">
                        <X
                            size={IconRef.current.x}
                            strokeWidth={IconRef.current.y}
                        />
                    </div>
                </div>

                {historyList.map((item) => (
                    <div
                        key={item.id}
                        className="relative h-12 flex items-center hover:bg-gray-200"
                        onMouseEnter={() => setClose(item.id)}
                        onMouseLeave={() => setClose(null)}
                    >
                        {item.type === "home" ? (
                            <Home
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className="flex-1"
                            />
                        ) : (
                            <Clock
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className="flex-1"
                            />
                        )}

                        <p className="flex-[5] text-sm">{item.title}</p>

                        {close === item.id && (
                            <X
                                size={IconRef.current.x}
                                strokeWidth={IconRef.current.y}
                                className="absolute right-4"
                            />
                        )}
                    </div>
                ))}

                {historyList.length > 0 && (
                    <div className="h-10 flex items-center justify-center text-sm text-gray-500">
                        <p>Nội dung tìm kiếm khác gần đây</p>
                    </div>
                )}
            </div>
        </>
    );
}
