import classNames from "classnames/bind";
import styles from "./OptionFeedback.module.css";
import { } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useEditor } from "../../../../../../../../../../state/useEditor";
const cx = classNames.bind(styles);


export default function OptionFeedback() {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const { state, dispatch } = useEditor();
    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

    return (
        <div className={cx("tab__wrapper")}>
            <button className={cx("btn__items-overview")}
                onClick={() => {
                    if (state.navbar_x.Xreview === "feedback") {
                        setState("SET_NAVBAR_X", "Xreview", "overview");
                    }
                }}
            >
                <div className={cx("content__wrapper")}>
                    <div className={cx("bg")}></div>
                    <span className={cx("content-overview")}>Tổng quan</span>
                    <div className={cx("bottom-btn-overview")}></div>
                </div>
            </button>

            <button
                className={cx("btn__items")}
                onClick={() => {
                    if (state.navbar_x.Xreview !== "feedback") {
                        setState("SET_NAVBAR_X", "Xreview", "feedback");
                    }
                }}
            >
                <div className={cx("content__wrapper")}>
                    <div className={cx("bg")}></div>
                    <span className={cx("content")}>Bài đánh giá</span>
                    <div className={cx("bottom-btn")}></div>
                </div>
            </button>
        </div>
    );
}

