import classNames from "classnames/bind";
import styles from "./logoutmodal.module.css";

const cx = classNames.bind(styles);

export default function LogoutModal({ onClose, onClick }) {
    return (
        <>
            <div onClick={onClose} className={cx("modal-overlay")}>
                <div onClick={onClick} className={cx("modal-container")}>
                    <div className={cx("box__content")}>
                        <div className={cx("box__content--top")}>
                            <span>Bạn có chắc muốn</span>
                            <span>đăng xuất không?</span>
                        </div>
                        <div className={cx("box__content--mid")}>
                            <span>Đăng xuất khỏi tài khoản</span>
                            <span>112233445566@ichigo.mzn trên</span>
                            <span>ChatIchigoMazone?</span>
                        </div>
                        <button
                            onClick={() => console.log("Đăng xuất")}
                            className={cx("box__content--left")}
                        >
                            Đăng xuất
                        </button>
                        <button
                            onClick={onClose}
                            className={cx("box__content--right")}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
