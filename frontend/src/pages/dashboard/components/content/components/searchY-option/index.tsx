import classNames from "classnames/bind";
import styles from "./searchY.module.css";
import { useRef } from "react";
import { Home, Leaf } from "lucide-react";

const cx = classNames.bind(styles);

export default function SearchYComponent() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    return (
        <div className={cx("options__input")}>
            <div className={cx("item")}>
                <Leaf
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Công viên</p>
            </div>
            <div className={cx("item")}>
                <Home
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
                <p>Làng cổ</p>
            </div>
        </div>
    );
}
