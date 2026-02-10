import classNames from "classnames/bind";
import styles from "./dropdown.module.css";
import { useEffect, useRef } from "react";
import { useEditor } from "../../../../state/useEditor";
import { Palette, Settings, LogOut } from "lucide-react";

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
    const IconRef = useRef<{x: number, y: number}>({ x: 20, y: 1.6});

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
                            <p className={cx("name")}>NN</p>
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
                <button onClick={() => {
                    setState("SET_MODAL", "person", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <Palette size={IconRef.current.x} strokeWidth={IconRef.current.y}/>
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
                        <Settings size={IconRef.current.x} strokeWidth={IconRef.current.y}/>   
                        <p>Cài đặt</p>
                    </div>
                </button>
            </div>
            <hr className={cx("divider")} />
            <div ref={buttonRef} className={cx("item")}>
                <button onClick={() => {
                    setState("SET_MODAL", "logout", true),
                    setState("SET_DROPDOWN", "logout", false);
                }} className={cx("btn")}>
                    <div className={cx("wrapper")}>
                        <LogOut size={IconRef.current.x} strokeWidth={IconRef.current.y}/>
                        <p>Đăng xuất</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
