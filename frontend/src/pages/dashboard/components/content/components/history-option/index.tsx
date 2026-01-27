import { useEffect, useRef, useState } from "react";
import { Clock, Home, Search, X } from "lucide-react";
import { useEditor } from "../../../../../../state/useEditor";
import classNames from "classnames/bind";
import styles from "./history.module.css";

const cx = classNames.bind(styles);

export default function HistoryComponent() {
    const { dispatch } = useEditor();
    const IconRef = useRef({ x: 20, y: 1.6 });

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    return (
        <>
            <div className={cx("history__bgr")}></div>
        </>
    );
}
