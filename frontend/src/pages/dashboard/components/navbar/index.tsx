import classNames from "classnames/bind";
import { BookmarkCheck, Earth, History, Info, Layers } from "lucide-react";
import { useRef } from "react";
import { useEditor } from "../../../../state/useEditor";
import styles from "./navbar.module.css";

const cx = classNames.bind(styles);

export default function Navbar() {
    const { state, dispatch } = useEditor();

    const setTooltip = (key: string, value: boolean) => {
        dispatch({
            type: "SET_TOOLTIP",
            payload: { [key]: value },
        });
    };

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number,
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    const strokeWidth = useRef<number>(1.6);

    return (
        <>
            <div className={cx("navbar")}>
                <div className={cx("header")}>
                    <div
                        className={cx("header__start", {
                            active: state.util.open,
                        })}
                    >
                        <div
                            onMouseEnter={() => setTooltip("logo", true)}
                            onMouseLeave={() => setTooltip("logo", false)}
                            onClick={() => {
                                (setState(
                                    "SET_UTIL",
                                    "open",
                                    !state.util["open"],
                                ),
                                    setTooltip("logo", false));
                            }}
                            className={cx("header__start--gpt")}
                        >
                            <button>
                                <Earth strokeWidth={strokeWidth.current} />
                            </button>
                            {state.tooltip.logo && (
                                <div className={cx("tooltip")}>
                                    <p>Mở thanh bên</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx("header__middle")}>
                        <div className={cx("line__xy")}></div>
                    </div>
                    <div className={cx("header__end")}>
                        <div
                            onMouseEnter={() => setTooltip("add", true)}
                            onMouseLeave={() => setTooltip("add", false)}
                            className={cx("header__end--add")}
                        >
                            <button>
                                <BookmarkCheck
                                    strokeWidth={strokeWidth.current}
                                />
                            </button>
                            {state.tooltip.add && (
                                <div className={cx("tooltip")}>
                                    <p>Đoạn chat mới</p>
                                </div>
                            )}
                        </div>

                        <div
                            onMouseEnter={() => setTooltip("search", true)}
                            onMouseLeave={() => setTooltip("search", false)}
                            className={cx("header__end--search")}
                        >
                            <button>
                                <History strokeWidth={strokeWidth.current} />
                            </button>
                            {state.tooltip.search && (
                                <div className={cx("tooltip")}>
                                    <p>Tìm kiếm đoạn chat</p>
                                </div>
                            )}
                        </div>
                        <div className={cx("header__end--line")}>
                            <div className={cx("line__xy")}></div>
                        </div>
                        <div
                            onMouseEnter={() => setTooltip("image", true)}
                            onMouseLeave={() => setTooltip("image", false)}
                            className={cx("header__end--image")}
                        >
                            <button>
                                <Layers strokeWidth={strokeWidth.current} />
                            </button>
                            {state.tooltip.image && (
                                <div className={cx("tooltip")}>
                                    <p>Ảnh</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx("footer")}>
                    <div className={cx("footer__start")}>
                        <div
                            onMouseEnter={() => setTooltip("spackle", true)}
                            onMouseLeave={() => setTooltip("spackle", false)}
                            className={cx("footer__start--spackle")}
                        >
                            <button>
                                <Info strokeWidth={strokeWidth.current} />
                            </button>
                            {state.tooltip.spackle && (
                                <div className={cx("tooltip")}>
                                    <p>Nâng cấp</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx("footer__end")}>
                        <div
                            onMouseEnter={() => setTooltip("logout", true)}
                            onMouseLeave={() => setTooltip("logout", false)}
                            onClick={() =>
                                setState(
                                    "SET_DROPDOWN",
                                    "logout",
                                    !state.dropdown["logout"],
                                )
                            }
                            className={cx("footer__end--profile")}
                        >
                            <div className={cx("img-avatar")}>
                                <p className={cx("name")}>NN</p>
                            </div>
                            {state.tooltip.logout && !state.dropdown.logout && (
                                <div className={cx("tooltip")}>
                                    <p>IchigoMazone</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
