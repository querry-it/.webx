import { useEditor } from "../../../../../../state/useEditor";
import styles from "./../../navbar-x.module.css";
import classNames from "classnames/bind";
import logomap from "../../../../../../assets/images.png";

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
                            <img src={logomap} alt="" className="p-2" />
                        </button>
                    </div>
                    <div
                        onClick={() =>
                            setState("SET_UTIL", "open", !state.util["open"])
                        }
                        className={cx("header__start--gpt")}
                    >
                        <button>
                            <img width="24" height="24" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-sidebar-development-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt="external-sidebar-development-royyan-wijaya-detailed-outline-royyan-wijaya" />                       
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
                                <i className={cx("fa-solid", "fa-house")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--add-y")}>
                            <span>Trang chủ</span>
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
                                <i className={cx("fa-solid", "fa-magnifying-glass")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--search-y")}>
                            <span>Tìm kiếm</span>
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
                                <i className={cx("fa-solid", "fa-clock-rotate-left")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--image-y")}>
                            <span>Lịch sử tìm kiếm</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
