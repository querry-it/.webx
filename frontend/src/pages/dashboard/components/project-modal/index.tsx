import styles from "./../navbar-x/navbar-x.module.css";
import classNames from "classnames/bind";
import { useEditor } from "../../../../state/useEditor";
import { useState, useEffect, useRef } from "react";

const cx = classNames.bind(styles);

export default function ProjectModal() {
    const { dispatch } = useEditor();
    const [hover, setHover] = useState<null | string>(null);
    const [active, setActive] = useState<null | string>(null);
    const [value, setValue] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setValue(icon[active].value)
    }, [active, count])

    const icon = {
        null: { key: <i className={cx("icon", "far", "fa-frown")}></i>, value: ""},
        invest: { key: <i className={cx("icon", "fa-regular", "fa-face-kiss-wink-heart")}></i>, value: "Đầu tư"},
        homework: { key: <i className={cx("icon", "fa-regular", "fa-face-grin-wide")}></i>, value: "Bài tập về nhà"},
        write: { key: <i className={cx("icon", "fa-regular", "fa-face-grin-wink")}></i>, value: "Viết"},
        health: { key: <i className={cx("icon", "fa-regular", "fa-face-laugh")}></i>, value: "Sức khỏe" },
        tourism:  { key: <i className={cx("icon", "fa-regular", "fa-face-meh-blank")}></i>, value: "Du lịch" },    
    };

    return (
        <>
            <div
                onClick={() =>
                    dispatch({ type: "SET_MODAL", payload: { project: false } })
                }
                className={cx("project__overlay")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cx("project__container")}
                >
                    <div className={cx("title")}>
                        <div className={cx("title__left")}>Tạo dự án</div>
                        <div className={cx("title__right")}>
                            <div className={cx("title__right--iconx")}>
                                <i className={cx("fa-solid", "fa-gear")}></i>
                            </div>
                            <div
                                onClick={() =>
                                    dispatch({
                                        type: "SET_MODAL",
                                        payload: { project: false },
                                    })
                                }
                                className={cx("title__right--icony")}
                            >
                                <i className={cx("fa-solid", "fa-xmark")}></i>
                            </div>
                        </div>
                    </div>
                    <div className={cx("box")}>
                        <div className={cx("input")}>
                            <div className={cx("input__icon")}>
                                {icon[active].key}
                            </div>
                            {active === null && (
                                <>
                                    <div className={cx("input__position")}>
                                        <i className={cx("fas", "fa-plus")}></i>
                                    </div>
                                </>
                            )}
                            <input
                                className={cx("input__content")}
                                type="text"
                                placeholder="Chuyến đi đến Copenhagen"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            {active !== null && (
                                <> 
                                    <div onClick={() => setActive(null)} className={cx("input__close")}>
                                        <i className={cx("fa-solid", "fa-xmark")}></i>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={cx("option")}>
                            <div
                                onClick={() => {
                                    setActive("invest");
                                    setCount(count + 1);
                                }}
                                onMouseEnter={() => setHover("invest")}
                                onMouseLeave={() => setHover(null)}
                                className={cx("invest", {
                                    hover: hover === "invest",
                                })}
                            >
                                <div className={cx("icon")}>
                                    <i
                                        className={cx(
                                            "fa-regular",
                                            "fa-face-kiss-wink-heart"
                                        )}
                                    ></i>
                                </div>
                                <div className={cx("title")}>Đầu tư</div>
                            </div>
                            <div
                                onClick={() => {
                                    setActive("homework")
                                    setCount(count + 1);
                                }}
                                onMouseEnter={() => setHover("homework")}
                                onMouseLeave={() => setHover(null)}
                                className={cx("homework", {
                                    hover: hover === "homework",
                                })}
                            >
                                <div className={cx("icon")}>
                                    <i
                                        className={cx(
                                            "fa-regular",
                                            "fa-face-grin-wide"
                                        )}
                                    ></i>
                                </div>
                                <div className={cx("title")}>
                                    Bài tập
                                    <br /> về nhà
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    setActive("write");
                                    setCount(count + 1);
                                }}
                                onMouseEnter={() => setHover("write")}
                                onMouseLeave={() => setHover(null)}
                                className={cx("write", {
                                    hover: hover === "write",
                                })}
                            >
                                <div className={cx("icon")}>
                                    <i
                                        className={cx(
                                            "fa-regular",
                                            "fa-face-grin-wink"
                                        )}
                                    />
                                </div>
                                <div className={cx("title")}>Viết</div>
                            </div>
                            <div
                                onClick={() => {
                                    setActive("health");
                                    setCount(count + 1);
                                }}
                                onMouseEnter={() => setHover("health")}
                                onMouseLeave={() => setHover(null)}
                                className={cx("health", {
                                    hover: hover === "health",
                                })}
                            >
                                <div className={cx("icon")}>
                                    <i
                                        className={cx(
                                            "fa-regular",
                                            "fa-face-laugh"
                                        )}
                                    ></i>
                                </div>
                                <div className={cx("title")}>Sức khỏe</div>
                            </div>
                            <div
                                onClick={() => {
                                    setActive("tourism");
                                    setCount(count + 1);
                                }}
                                onMouseEnter={() => setHover("tourism")}
                                onMouseLeave={() => setHover(null)}
                                className={cx("tourism", {
                                    hover: hover === "tourism",
                                })}
                            >
                                <div className={cx("icon")}>
                                    <i
                                        className={cx(
                                            "fa-regular",
                                            "fa-face-meh-blank"
                                        )}
                                    ></i>
                                </div>
                                <div className={cx("title")}>Du lịch</div>
                            </div>
                        </div>
                        <div className={cx("note")}>
                            <div className={cx("icon")}>
                                <i className={cx("far", "fa-frown")}></i>
                            </div>
                            <p className={cx("title")}>
                                Các dự án lưu giữ các đoạn chat, tệp và hướng
                                dẫn tùy chỉnh ở một nơi. Hãy sử dụng chúng cho
                                công việc đang làm hoặc để giữ mọi thứ ngăn nắp.
                            </p>
                        </div>
                    </div>
                    <div className={cx("button")}>
                        <span className={cx("content")}>Tạo dự án</span>
                    </div>
                </div>
            </div>
        </>
    );
}
