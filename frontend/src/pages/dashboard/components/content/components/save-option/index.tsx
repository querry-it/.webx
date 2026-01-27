import { Clock, Home, Search, X } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./save.module.css";
import { useRef, useState } from "react";
import { useEditor } from "../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SaveComponent() {
    const { dispatch } = useEditor();
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    return (
        <>
            <div className={cx("save__bgr")}></div>
        </>
    );
}
