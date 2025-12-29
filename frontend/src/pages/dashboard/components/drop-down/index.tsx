import classNames from "classnames/bind";
import styles from "./dropdown.module.css";
import { useEffect, useRef } from "react";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function DropDown() {
    const { state, dispatch } = useEditor();

    const setState = (option: string, key: string, value: boolean) => {
        dispatch({
            type: option,
            payload: { [key]: value },
        });
    };

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
                setState("SET_DROPDOWN", "logout", !state.dropdown["logout"]);
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, []);

    return (
        <div ref={wrapperRef} className={cx("dropDown")}>
            <div className={cx("item__top")}>
                <button onClick={() => {
                    setState("SET_MODAL", "profile", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
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
                <button onClick={() => console.log("Nâng cấp gói")} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Nâng cấp gói</p>
                    </div>
                </button>
            </div>
            <div className={cx("item")}>
                <button onClick={() => {
                    setState("SET_MODAL", "person", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Cá nhân hóa</p>
                    </div>
                </button>
            </div>
            <div className={cx("item")}>
                <button onClick={() => {
                    setState("SET_MODAL", "setup", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Cài đặt</p>
                    </div>
                </button>
            </div>
            <hr className={cx("divider")} />
            <div className={cx("item")}>
                <button onClick={() => console.log("Trợ giúp")} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Trợ giúp</p>
                    </div>
                </button>
            </div>
            <div ref={buttonRef} className={cx("item")}>
                <button onClick={() => {
                    setState("SET_MODAL", "logout", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <i className="far fa-frown"></i>
                        <p>Đăng xuất</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
