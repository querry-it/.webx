import classNames from "classnames/bind";
import styles from "./TitleFeedback.module.css";
import { ArrowLeft, X } from "lucide-react";
import { useRef } from "react";
import { useEditor } from "../../../../../../../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function TitleFeedback({ place, feedbacks }) {
    const { state, dispatch } = useEditor();
        const setState = (option: string, key: string, value: boolean) => {
            dispatch({
                type: option,
                payload: { [key]: value },
            });
        };
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });

    return (
        <div className={cx("title__feedback")}>
            <div
                className={cx("icon__left")}
                onClick={() => {
                    if (state.navbar_x.Xreview !== "overview") {
                        setState("SET_NAVBAR_X", "Xreview", "overview");
                    }
                }}
            >
                <ArrowLeft
                    size={IconRef.current.x}
                    strokeWidth={IconRef.current.y}
                />
            </div>
            <div className={cx("content")}>Lăng chủ tịch Hồ Chí Minh</div>
            <div
                className={cx("icon__right")}
                onClick={() => {
                    if (state.navbar_x.Xreview !== "overview") {
                        setState("SET_NAVBAR_X", "introducerX", false);
                    }
                }}
            >
                <X size={IconRef.current.x} strokeWidth={IconRef.current.y} />
            </div>
        </div>

    );
}

