import { useEditor } from "../../../../../../state/useEditor";
import styles from "./../../navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function FooterNavbarX() {
    const { state, dispatch } = useEditor();

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    return (
        <>
            <div className={cx("footer")}>
                <div className={cx("footer__end")}>
                    <div
                        onClick={() =>
                            setState(
                                "SET_DROPDOWN",
                                "logout",
                                !state.dropdown["logout"]
                            )
                        }
                        className={cx("footer__end--profile")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                </div>
                <div className={cx("footer__end-profile-y")}>
                    <span>IchigoMazone</span>
                    <span className={cx("option")}>Free</span>
                </div>
            </div>
        </>
    );
}
