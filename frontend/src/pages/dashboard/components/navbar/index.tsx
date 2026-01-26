import classNames from "classnames/bind";
import { BookmarkCheck, Earth, History, Info, Layers } from "lucide-react";
import { act, useEffect, useRef } from "react";
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

    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });

    useEffect(() => {
        console.log(state.navbar_x.activeX);
    }, [state.navbar_x.activeX]);

    return (
        <>
            <div className={cx("navbar")}>
                <div className={cx("header")}>
                    <div className={cx("header__start")}>
                        <div
                            onMouseEnter={() => setTooltip("logo", true)}
                            onMouseLeave={() => setTooltip("logo", false)}
                            onClick={() => {
                                setState(
                                    "SET_NAVBAR_X",
                                    "activeX",
                                    "introducer",
                                );
                                setTooltip("logo", false);
                            }}
                            className={cx("header__start--gpt")}
                        >
                            <button
                                className={cx({
                                    active:
                                        state.navbar_x.activeX === "introducer",
                                })}
                            >
                                <Earth
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </button>
                            {state.tooltip.logo && (
                                <div className={cx("tooltip")}>
                                    <p>Giới thiệu</p>
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
                            onClick={() => {
                                if (state.navbar_x.activeX !== "save") {
                                    setState("SET_NAVBAR_X", "activeX", "save");
                                }
                            }}
                            className={cx("header__end--add")}
                        >
                            <button
                                className={cx({
                                    active: state.navbar_x.activeX === "save",
                                })}
                            >
                                <BookmarkCheck
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </button>
                            {state.tooltip.add && (
                                <div className={cx("tooltip")}>
                                    <p>Đã lưu</p>
                                </div>
                            )}
                        </div>

                        <div
                            onMouseEnter={() => setTooltip("search", true)}
                            onMouseLeave={() => setTooltip("search", false)}
                            onClick={() => {
                                if (state.navbar_x.activeX !== "history") {
                                    setState(
                                        "SET_NAVBAR_X",
                                        "activeX",
                                        "history",
                                    );
                                }
                            }}
                            className={cx("header__end--search")}
                        >
                            <button
                                className={cx({
                                    active:
                                        state.navbar_x.activeX === "history",
                                })}
                            >
                                <History
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </button>
                            {state.tooltip.search && (
                                <div className={cx("tooltip")}>
                                    <p>Lịch sử</p>
                                </div>
                            )}
                        </div>
                        <div className={cx("header__end--line")}>
                            <div className={cx("line__xy")}></div>
                        </div>
                        <div
                            onMouseEnter={() => setTooltip("image", true)}
                            onMouseLeave={() => setTooltip("image", false)}
                            onClick={() => {
                                setState(
                                    "SET_NAVBAR_X",
                                    "dynamic",
                                    !state.navbar_x.dynamic,
                                );
                            }}
                            className={cx("header__end--image")}
                        >
                            <button>
                                <Layers
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </button>
                            {state.tooltip.image && (
                                <div className={cx("tooltip")}>
                                    <p>Danh sách</p>
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
                            onClick={() => {
                                if (state.navbar_x.activeX !== "help") {
                                    setState("SET_NAVBAR_X", "activeX", "help");
                                }
                            }}
                            className={cx("footer__start--spackle")}
                        >
                            <button
                                className={cx({
                                    active: state.navbar_x.activeX === "help",
                                })}
                            >
                                <Info
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </button>
                            {state.tooltip.spackle && (
                                <div className={cx("tooltip")}>
                                    <p>Hướng dẫn</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx("footer__end")}>
                        <div
                            onMouseEnter={() => setTooltip("logout", true)}
                            onMouseLeave={() => setTooltip("logout", false)}
                            onClick={() => {
                                setState(
                                    "SET_DROPDOWN",
                                    "logout",
                                    !state.dropdown["logout"],
                                );
                                if (state.navbar_x.activeX !== "account") {
                                    setState(
                                        "SET_NAVBAR_X",
                                        "activeX",
                                        "account",
                                    );
                                }
                            }}
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
