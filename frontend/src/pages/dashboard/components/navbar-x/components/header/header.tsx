import { useEditor } from "../../../../../../state/useEditor";
import styles from "./../../navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function HeaderNavbarX() {
    const { state, dispatch } = useEditor();

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    return (
        <>
            <div className={cx("header")}>
                <div className={cx("header__start")}>
                    <div
                        onClick={() =>
                            setState("SET_UTIL", "open", !state.util["open"])
                        }
                        className={cx("header__start--gpt")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                    <div
                        onClick={() =>
                            setState("SET_UTIL", "open", !state.util["open"])
                        }
                        className={cx("header__start--gpt")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                </div>
                <div className={cx("header__end")}>
                    <div
                        onClick={() => {
                            dispatch({
                                type: "SET_NAVBAR_X",
                                payload: {
                                    active: { type: null, value: null },
                                },
                            });
                            console.log("Đoạn chat mới");
                        }}
                        className={cx("header__end--add-x")}
                    >
                        <div className={cx("header__end--add")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--add-y")}>
                            <span>Đoạn chat mới</span>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            dispatch({
                                type: "SET_NAVBAR_X",
                                payload: {
                                    active: { type: null, value: null },
                                },
                            });
                            console.log("Tìm kiếm đoạn chat");
                        }}
                        className={cx("header__end--search-x")}
                    >
                        <div className={cx("header__end--search")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--search-y")}>
                            <span>Tìm kiếm đoạn chat</span>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            dispatch({
                                type: "SET_NAVBAR_X",
                                payload: {
                                    active: { type: null, value: "image" },
                                },
                            });
                            console.log("Ảnh");
                        }}
                        className={cx("header__end--image-x", {
                            active: state.navbar_x.active.value === "image",
                        })}
                    >
                        <div className={cx("header__end--image")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--image-y")}>
                            <span>Ảnh</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
