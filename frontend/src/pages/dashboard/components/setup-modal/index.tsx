import classNames from "classnames/bind";
import styles from "./setupmodal.module.css";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function SetupModal({ onClose, onClick, value }) {
    const [index, setIndex] = useState<number>(value);

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
                                <hr />
                                <div className={cx("column")}>
                                    <div>
                                        <div>
                                            <div>Giao diện</div>
                                            <button type="button">
                                                <span>Hệ thống</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "far",
                                                            "fa-frown"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx("column")}>
                                    <div>
                                        <div>
                                            <div>Màu điểm nhấn</div>
                                            <button type="button">
                                                <span>
                                                    <div>
                                                        <div>
                                                            <div></div>
                                                            Xanh Dương
                                                        </div>
                                                    </div>
                                                </span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "far",
                                                            "fa-frown"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx("column")}>
                                    <div>
                                        <div>
                                            <div>Giao diện</div>
                                            <button type="button">
                                                <span>Dò tự động</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "far",
                                                            "fa-frown"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx("speak")}>
                                    <div>
                                        <div>
                                            <div>Ngôn ngữ nói</div>
                                            <button type="button">
                                                <span>Dò tự động</span>
                                                <span>
                                                    <i
                                                        className={cx(
                                                            "far",
                                                            "fa-frown"
                                                        )}
                                                    ></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <span>
                                                Để có kết quả tốt nhất, hãy chọn
                                                ngôn ngữ trò chuyện chính của
                                                bạn.
                                            </span>
                                            <span>
                                                Nếu ngôn ngữ của bạn chưa có
                                                trong danh sách, có khả năng hệ
                                                thống
                                            </span>
                                            <span>
                                                vẫn hỗ trợ ngôn ngữ này thông
                                                qua tính năng dò tìm tự động.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx("column")}>
                                    <div>
                                        <div>
                                            <div>
                                                <div>Thoại</div>
                                                <div>
                                                    <button>
                                                        <div>
                                                            <i
                                                                className={cx(
                                                                    "far",
                                                                    "fa-frown"
                                                                )}
                                                            ></i>
                                                            Phát
                                                        </div>
                                                    </button>
                                                    <div></div>
                                                    <button>
                                                        <span>Ember</span>
                                                        <span>
                                                            <i
                                                                className={cx(
                                                                    "far",
                                                                    "fa-frown"
                                                                )}
                                                            ></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx("private")}>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    Chế độ thoại riêng biệt
                                                </div>
                                                <div>
                                                    <button>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span>
                                                Duy trì ChatGPT Voice ở chế độ
                                                toàn màn hình riêng biệt, không
                                                có bản
                                            </span>
                                            <span>
                                                ghi và hình ảnh theo thời gian
                                                thực.
                                            </span>
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
