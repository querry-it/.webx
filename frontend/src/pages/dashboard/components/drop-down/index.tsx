import classNames from "classnames/bind";
import styles from "./dropdown.module.css";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

export default function DropDown({ actions, onClose }) {
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [onClose]);

    return (
        <div ref={wrapperRef} className={cx("dropDown")}>
            <div className={cx("item__top")}>
                <button onClick={actions.profile} className={cx("btn")}>
                    <div className={cx("wrapper__top")}>
                        <div className={cx("avatar")}>
                            <i className="far fa-frown"></i>
                        </div>
                        <div className={cx("info")}>
                            <p className={cx("title")}>Nhất Trịnh</p>
                            <p className={cx("code")}>@112233445566</p>
                        </div>
                    </div>
                </button>
            </div>
            <hr className={cx("divider")} />
            <div className={cx("item")}>
                <button onClick={actions.update} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Nâng cấp gói</p>
                    </div>
                </button>
            </div>
            <div className={cx("item")}>
                <button onClick={actions.person} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Cá nhân hóa</p>
                    </div>
                </button>
            </div>
            <div className={cx("item")}>
                <button onClick={actions.setup} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Cài đặt</p>
                    </div>
                </button>
            </div>
            <hr className={cx("divider")} />
            <div className={cx("item")}>
                <button onClick={actions.help} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Trợ giúp</p>
                    </div>
                </button>
            </div>
            <div
                ref={buttonRef}
                className={cx("item")}
            >
                <button onClick={actions.logout} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Đăng xuất</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
