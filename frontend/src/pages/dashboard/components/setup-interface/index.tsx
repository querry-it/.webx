import classNames from "classnames/bind";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupInterface({ onClose, index, setIndexx}) {
    return (
        <>
            <div className={cx("out")}>
                <button onClick={onClose} className={cx("out__content")}>
                    X
                </button>
            </div>
            <button
                onClick={() => setIndexx(1)}
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
                onClick={() => setIndexx(2)}
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
                onClick={() => setIndexx(3)}
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
                onClick={() => setIndexx(4)}
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
                onClick={() => setIndexx(5)}
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
                onClick={() => setIndexx(6)}
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
                onClick={() => setIndexx(7)}
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
        </>
    );
}
