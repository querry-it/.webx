import classNames from "classnames/bind";
import styles from "./setupmodal.module.css";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function SetupModal({ onClose, onClick, value }) {
    const [index, setIndex] = useState<number>(value);
    const [onButton, setButton] = useState<boolean>(false);

    return (
        <>
            <div onClick={onClose} className={cx("modal-overlay")}>
                <div onClick={onClick} className={cx("modal-container")}>
                    <div className={cx("table__left")}>
                        <div className={cx("out")}>
                            <button
                                onClick={onClose}
                                className={cx("out__content")}
                            >
                                X
                            </button>
                        </div>
                        <button
                            onClick={() => setIndex(1)}
                            className={cx("select", { active: index === 1 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Chung</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(2)}
                            className={cx("select", { active: index === 2 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Thông báo</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(3)}
                            className={cx("select", { active: index === 3 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Cá nhân hóa</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(4)}
                            className={cx("select", { active: index === 4 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Ứng dụng</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(5)}
                            className={cx("select", { active: index === 5 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Kiểm soát dữ liệu</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(6)}
                            className={cx("select", { active: index === 6 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Bảo mật</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(7)}
                            className={cx("select", { active: index === 7 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Quyền kiểm soát</div>
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setIndex(8)}
                            className={cx("select", { active: index === 8 })}
                        >
                            <div className={cx("select__content")}>
                                <div className={cx("content__icon")}>
                                    <i className={cx("far", "fa-frown")}></i>
                                </div>
                                <div className={cx("content__text")}>
                                    <div>Tài khoản</div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className={cx("table__right")}>
                        {index === 1 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Chung</h3>
                                </div>

                                <div className={cx("column")}>
                                    <div className={cx("column__top")}>
                                        <div
                                            className={cx(
                                                "column__top--content"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Giao diện
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                            >
                                                <span>Hệ thống</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "fas",
                                                            "fa-chevron-down",
                                                            "icon__x"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("column")}>
                                    <div className={cx("column__top")}>
                                        <div
                                            className={cx(
                                                "column__top--content"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Màu điểm nhấn
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                            >
                                                <span
                                                    className={cx("span__text")}
                                                >
                                                    <div className={cx("text")}>
                                                        <div
                                                            className={cx(
                                                                "text__content"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "icon"
                                                                )}
                                                            ></div>
                                                            <div>
                                                                Xanh Dương
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "fas",
                                                            "fa-chevron-down",
                                                            "icon__x"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("column")}>
                                    <div className={cx("column__top")}>
                                        <div
                                            className={cx(
                                                "column__top--content"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Ngôn ngữ
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                            >
                                                <span>Dò tìm tự động</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "fas",
                                                            "fa-chevron-down",
                                                            "icon__x"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("speak")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Ngôn ngữ nói
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                            >
                                                <span>Dò tự động</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "fas",
                                                            "fa-chevron-down",
                                                            "icon__x"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            className={cx(
                                                "speak__content--bottom"
                                            )}
                                        >
                                            Để có kết quả tốt nhất, hãy chọn
                                            ngôn ngữ trò chuyện chính của bạn.
                                            Nếu ngôn ngữ của bạn chưa có trong
                                            danh sách, có khả năng hệ thống vẫn
                                            hỗ trợ ngôn ngữ này thông qua tính
                                            năng dò tìm tự động.
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("column")}>
                                    <div className={cx("column__top")}>
                                        <div className={cx("column__top")}>
                                            <div
                                                className={cx(
                                                    "column__top--content"
                                                )}
                                            >
                                                <div className={cx("title")}>
                                                    Thoại
                                                </div>
                                                <div
                                                    className={cx("button__x")}
                                                >
                                                    <button
                                                        className={cx(
                                                            "button__top"
                                                        )}
                                                    >
                                                        <span>
                                                            <i
                                                                className={cx(
                                                                    "fa-solid",
                                                                    "fa-play",
                                                                    "icon__y"
                                                                )}
                                                            ></i>
                                                        </span>
                                                        <span> Phát</span>
                                                    </button>
                                                    <div
                                                        className={cx("space")}
                                                    ></div>
                                                    <button
                                                        className={cx(
                                                            "button__bottom"
                                                        )}
                                                    >
                                                        <span>Ember</span>
                                                        <span>
                                                            <i
                                                                className={cx(
                                                                    "fas",
                                                                    "fa-chevron-down",
                                                                    "icon__x"
                                                                )}
                                                            ></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("private")}>
                                    <div className={cx("private__row")}>
                                        <div className={cx("row__header")}>
                                            <div
                                                className={cx(
                                                    "row__content--top"
                                                )}
                                            >
                                                <div className={cx("title")}>
                                                    Chế độ thoại riêng biệt
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        setButton(!onButton)
                                                    }
                                                    className={cx("button", {
                                                        on: onButton,
                                                    })}
                                                >
                                                    <button
                                                        className={cx(
                                                            "button__content"
                                                        )}
                                                    >
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx("row__content")}>
                                            Duy trì ChatIZN Voice ở chế độ toàn
                                            màn hình riêng biệt, không có bản
                                            ghi và hình ảnh theo thời gian thực.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
