import classNames from "classnames/bind";
import styles from "./logoutmodal.module.css";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function LogoutModal() {
    const { dispatch } = useEditor();

    const setState = (option: string, key: string, value: boolean | string | number) => {
        dispatch({ type: option, payload: { [key]: value }})
    };

    return (
        <>
            <div onClick={() => setState("SET_MODAL", "logout", false)} className={cx("modal-overlay")}>
                <div onClick={(e) => e.stopPropagation()} className={cx("modal-container")}>
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
                            onClick={() => setState("SET_MODAL", "logout", false)}
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
