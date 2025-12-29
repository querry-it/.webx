import classNames from "classnames/bind";
import styles from "../setup-modal/setupmodal.module.css";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SetupInterface() {
    const { state, dispatch } = useEditor()

    const setState = (option: string, key: string, value: boolean | number | null) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    return (
        <>
            <div className={cx("out")}>
                <button
                    onClick={() => {
                        if (state.modal.person) setState("SET_MODAL", "person", false);
                        else setState("SET_MODAL", "setup", false);
                        setState("SET_UTIL", "index", null);
                    }}
                    className={cx("out__content")}
                >
                    X
                </button>
            </div>
            <button
                onClick={() => setState("SET_UTIL", "index", 1)}
                className={cx("select", { active: state.util.index === 1 })}
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
                onClick={() => setState("SET_UTIL", "index", 2)}
                className={cx("select", { active: state.util.index === 2 })}
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
                onClick={() => setState("SET_UTIL", "index", 3)}
                className={cx("select", { active: state.util.index === 3 })}
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
                onClick={() => setState("SET_UTIL", "index", 4)}
                className={cx("select", { active: state.util.index === 4 })}
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
                onClick={() => setState("SET_UTIL", "index", 5)}
                className={cx("select", { active: state.util.index === 5 })}
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
                onClick={() => setState("SET_UTIL", "index", 6)}
                className={cx("select", { active: state.util.index === 6 })}
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
                onClick={() => setState("SET_UTIL", "index", 7)}
                className={cx("select", { active: state.util.index === 7 })}
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
                onClick={() => setState("SET_UTIL", "index", 8)}
                className={cx("select", { active: state.util.index === 8 })}
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
