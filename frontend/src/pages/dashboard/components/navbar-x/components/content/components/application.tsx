import { useEditor } from "../../../../../../../state/useEditor";
import styles from "./../../../navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Application() {
    const { state, dispatch } = useEditor();

    return (
        <>
            <button
                onClick={() => {
                    dispatch({
                        type: "SET_NAVBAR_X",
                        payload: {
                            active: { type: null, value: "application" },
                        },
                    });
                    console.log("Ứng dụng");
                }}
                className={cx("application", {
                    active: state.navbar_x.active.value === "application",
                })}
            >
                <div className={cx("icon")}>
                    <i className={cx("far", "fa-frown")}></i>
                </div>
                <span className={cx("text")}>Ứng dụng</span>
            </button>
        </>
    );
}
