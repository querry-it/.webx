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
                                                onClick={() =>
                                                    console.log("Giao diện")
                                                }
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
                                                onClick={() =>
                                                    console.log("Màu điểm nhấn")
                                                }
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
                                                onClick={() =>
                                                    console.log("Ngôn ngữ")
                                                }
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
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
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
                                                        onClick={() =>
                                                            console.log("Phát")
                                                        }
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
                                                        onClick={() =>
                                                            console.log("Ember")
                                                        }
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
                                                    onClick={() => {
                                                        setButton(!onButton);
                                                        console.log("On Click");
                                                    }}
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
                        {index === 2 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Thông báo</h3>
                                </div>
                                <div className={cx("speak__x")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Phản hồi
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
                                            >
                                                <span>Đẩy</span>
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
                                            Nhận thông báo khi ChatIZN phản hồi
                                            các yêu cầu mất thời gian, như
                                            nghiên cứu hoặc tạo hình ảnh.
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("speak__y")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Đoạn chat nhóm
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
                                            >
                                                <span>Đẩy</span>
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
                                            Bạn sẽ nhận được thông báo về tin
                                            nhắn mới từ các đoạn chat nhóm.
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("speak__x")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Tác vụ
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
                                            >
                                                <span>
                                                    Thông báo đẩy, Email
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
                                        <div
                                            className={cx(
                                                "speak__content--bottom"
                                            )}
                                        >
                                            Nhận thông báo khi nhiệm vụ bạn đã
                                            tạo có cập nhật. <br />
                                            Quản lý nhiệm vụ
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("speak__x")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Projects
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
                                            >
                                                <span>Email</span>
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
                                            Nhận thông báo khi bạn nhận được
                                            email mời tham gia một dự án <br />
                                            chung.
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("speak__y")}>
                                    <div className={cx("speak__content")}>
                                        <div
                                            className={cx(
                                                "speak__content--top"
                                            )}
                                        >
                                            <div className={cx("title")}>
                                                Đề xuất
                                            </div>
                                            <button
                                                className={cx("button")}
                                                type="button"
                                                onClick={() =>
                                                    console.log("Ngôn ngữ nói")
                                                }
                                            >
                                                <span>
                                                    Thông báo đẩy, Email
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
                                        <div
                                            className={cx(
                                                "speak__content--bottom"
                                            )}
                                        >
                                            Nhận cập nhật về các công cụ, mẹo và
                                            tính năng mới từ ChatIZN.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {index === 3 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Cá nhân hóa</h3>
                                </div>
                                <div className={cx("box")}>
                                    <div className={cx("box__brands")}>
                                        <div className={cx("box__brands-x")}>
                                            <div className={cx("box__brands--ix")}>
                                                <i className={cx("fa-brands", "fa-itunes-note", "icon_x")}></i>
                                            </div>
                                        </div>
                                        <div className={cx("box__brands-y")}>
                                            <div className={cx("box__brands--iy")}>
                                                <i className={cx("fa-brands", "fa-github", "icon_y")}></i>
                                            </div>
                                        </div>
                                        <div className={cx("box__brands-z")}>
                                            <div className={cx("box__brands--iz")}>
                                                <i className={cx("fa-brands", "fa-discord", "icon_z")}></i>
                                            </div>
                                        </div>
                                        <div className={cx("box__brands-t")}>
                                            <div className={cx("box__brands--it")}>
                                                <i className={cx("fa-brands", "fa-reddit", "icon_t")}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx("box__title")}>
                                        Thêm và quản lý các ứng dụng mà ChatGPT
                                        có thể sử dụng trong <br />
                                        các đoạn chat của bạn.
                                    </div>
                                    <div className={cx("box__button")}>
                                        <button
                                            className={cx("box__button--x")}
                                        >
                                            Khám phá ứng dụng
                                        </button>
                                    </div>
                                </div>
                                <div className={cx("setup")}></div>
                            </div>
                        )}
                        {index === 4 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Ứng dụng</h3>
                                </div>
                            </div>
                        )}
                        {index === 5 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Kiểm soát dữ liệu</h3>
                                </div>
                            </div>
                        )}
                        {index === 6 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Bảo mật</h3>
                                </div>
                            </div>
                        )}
                        {index === 7 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Quyền kiểm soát</h3>
                                </div>
                            </div>
                        )}
                        {index === 8 && (
                            <div className={cx("container")}>
                                <div className={cx("global")}>
                                    <h3>Tài khoản</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
