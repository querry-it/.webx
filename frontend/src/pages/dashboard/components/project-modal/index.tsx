import styles from "./../navbar-x/navbar-x.module.css";
import classNames from "classnames/bind";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function ProjectModal() {
    const { dispatch } = useEditor();

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
                                <i className={cx("far", "fa-frown")}></i>
                            </div>
                            <div className={cx("input__position")}>
                                <i className={cx("fas", "fa-plus")}></i>
                            </div>
                            <input
                                className={cx("input__content")}
                                type="text"
                                placeholder="Chuyến đi đến Copenhagen"
                            />
                        </div>
                        <div className={cx("option")}>
                            <div className={cx("invest")}>
                                <div className={cx("icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("title")}>Đầu tư</div>
                            </div>
                            <div className={cx("homework")}>
                                <div className={cx("icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("title")}>
                                    Bài tập
                                    <br /> về nhà
                                </div>
                            </div>
                            <div className={cx("write")}>
                                <div className={cx("icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("title")}>Viết</div>
                            </div>
                            <div className={cx("health")}>
                                <div className={cx("icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("title")}>Sức khỏe</div>
                            </div>
                            <div className={cx("tourism")}>
                                <div className={cx("icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
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
