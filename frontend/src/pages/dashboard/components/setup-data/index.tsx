import classNames from "classnames/bind";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupData() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Kiểm soát dữ liệu</h3>
                </div>
                <div className={cx("header__left")}>
                    <div className={cx("header__left--title")}>
                        Cải thiện mô hình cho mọi người
                    </div>
                    <div className={cx("header__left--button")}>
                        <div className={cx("text__button")}>Bật</div>
                        <div className={cx("icon__button")}>
                            <i
                                className={cx(
                                    "fas",
                                    "fa-chevron-down",
                                    "icon__x"
                                )}
                            ></i>
                        </div>
                    </div>
                </div>
                <div className={cx("header__mid")}>
                    <div className={cx("header__mid--title")}>
                        Liên kết được chia sẻ
                    </div>
                    <div className={cx("header__mid--button")}>
                        <button>Quản lý</button>
                    </div>
                </div>
                <div className={cx("header__mid")}>
                    <div className={cx("header__mid--title")}>
                        Đoạn chat đã lưu trữ
                    </div>
                    <div className={cx("header__mid--button")}>
                        <button>Quản lý</button>
                    </div>
                </div>
                <div className={cx("header__mid")}>
                    <div className={cx("header__mid--title")}>
                        Lưu trữ tất cả đoạn chat
                    </div>
                    <div className={cx("header__mid--button")}>
                        <button>Lưu trữ tất cả</button>
                    </div>
                </div>
                <div className={cx("header__mid")}>
                    <div className={cx("header__mid--title")}>
                        Xóa tất cả đoạn chat
                    </div>
                    <div className={cx("header__mid--button")}>
                        <button className={cx("prev")}>Xóa tất cả</button>
                    </div>
                </div>
                <div className={cx("header__mid")}>
                    <div className={cx("header__mid--title")}>Xuất dữ liệu</div>
                    <div className={cx("header__mid--button")}>
                        <button>Xuất</button>
                    </div>
                </div>
            </div>
        </>
    );
}
