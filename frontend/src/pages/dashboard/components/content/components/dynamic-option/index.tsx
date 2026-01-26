import classNames from "classnames/bind";
import styles from "./dynamic.module.css";

const cx = classNames.bind(styles);

export default function DynamicComponent() {
    return <div className={cx("location__option")}>        
        <div className={cx("grid grid-rows-5 grid-flow-col auto-cols-[120px] overflow-x-auto gap-x-1 gap-y-1", "hideScrollbar")}>
            {Array.from({ length: 40 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center h-[42px] hover:cursor-pointer rounded-[8px] px-2 hover:bg-gray-200 gap-2"
                >
                    <img
                        className="w-[28%] h-[70%] rounded-[8px]"
                        src="https://thegioidisan.vn/assets/media/2016/Thang%204/0142016/Ho-guom-2.jpg"
                        alt=""
                    />
                    <div className="text-[10px] overflow-hidden
                                    text-ellipsis
                                    line-clamp-2">
                        Hồ Gươm (Hồ Hoàn Kiếm)
                    </div>
                </div>
            ))}
        </div>
    </div>;
}
