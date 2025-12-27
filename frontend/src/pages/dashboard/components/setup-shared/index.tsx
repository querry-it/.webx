import classNames from "classnames/bind";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles)

export default function SetupShared({ onButton, setButtonx }) {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Chung</h3>
                </div>

                <div className={cx("column")}>
                    <div className={cx("column__top")}>
                        <div className={cx("column__top--content")}>
                            <div className={cx("title")}>Giao diện</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Giao diện")}
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
                        <div className={cx("column__top--content")}>
                            <div className={cx("title")}>Màu điểm nhấn</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Màu điểm nhấn")}
                            >
                                <span className={cx("span__text")}>
                                    <div className={cx("text")}>
                                        <div className={cx("text__content")}>
                                            <div className={cx("icon")}></div>
                                            <div>Xanh Dương</div>
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
                        <div className={cx("column__top--content")}>
                            <div className={cx("title")}>Ngôn ngữ</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ")}
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
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Ngôn ngữ nói</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
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
                        <div className={cx("speak__content--bottom")}>
                            Để có kết quả tốt nhất, hãy chọn ngôn ngữ trò chuyện
                            chính của bạn. Nếu ngôn ngữ của bạn chưa có trong
                            danh sách, có khả năng hệ thống vẫn hỗ trợ ngôn ngữ
                            này thông qua tính năng dò tìm tự động.
                        </div>
                    </div>
                </div>

                <div className={cx("column")}>
                    <div className={cx("column__top")}>
                        <div className={cx("column__top")}>
                            <div className={cx("column__top--content")}>
                                <div className={cx("title")}>Thoại</div>
                                <div className={cx("button__x")}>
                                    <button
                                        className={cx("button__top")}
                                        onClick={() => console.log("Phát")}
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
                                    <div className={cx("space")}></div>
                                    <button
                                        className={cx("button__bottom")}
                                        onClick={() => console.log("Ember")}
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
                            <div className={cx("row__content--top")}>
                                <div className={cx("title")}>
                                    Chế độ thoại riêng biệt
                                </div>
                                <div
                                    onClick={() => {
                                        // setButton(!onButton);
                                        setButtonx();
                                        console.log("On Click");
                                    }}
                                    className={cx("button", {
                                        on: onButton,
                                    })}
                                >
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("row__content")}>
                            Duy trì ChatIZN Voice ở chế độ toàn màn hình riêng
                            biệt, không có bản ghi và hình ảnh theo thời gian
                            thực.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
