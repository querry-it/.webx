import classNames from "classnames/bind";
import styles from "./setupmodal.module.css";
import { useEffect } from "react";
import SetupShared from "../setup-shared";
import SetupNotification from "../setup-notification";
import SetupApplication from "../setup-application";
import SetupData from "../setup-data";
import SetupControl from "../setup-control";
import SetupSecurity from "../setup-security";
import SetupAccount from "../setup-account";
import SetupPerson from "../setup-person";
import SetupInterface from "../setup-interface";
import { useEditor } from "../../../../state/useEditor";

const cx = classNames.bind(styles);

export default function SetupModal() {
    const { state, dispatch } = useEditor();

    const setState = (option: string, key: string, value: boolean | number | null) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    useEffect(() => {
        if (state.modal.person) setState("SET_UTIL", "index", 3);
        else setState("SET_UTIL", "index", 1);
    }, [state.modal.person, state.modal.person]);

    const handleOut = () => {
        if (state.modal.person) setState("SET_MODAL", "person", false);
        else setState("SET_MODAL", "setup", false);
        setState("SET_UTIL", "index", null);
    };

    const StopPropagation = (e) => e.stopPropagation();

    return (
        <>
            <div onClick={handleOut} className={cx("modal-overlay")}>
                <div onClick={StopPropagation} className={cx("modal-container")}>
                    <div className={cx("table__left")}>
                        <SetupInterface />
                    </div>
                    <div className={cx("table__right")}>
                        {state.util.index === 1 && <SetupShared />}
                        {state.util.index === 2 && <SetupNotification />}
                        {state.util.index === 3 && <SetupPerson />}
                        {state.util.index === 4 && <SetupApplication />}
                        {state.util.index === 5 && <SetupData />}
                        {state.util.index === 6 && <SetupSecurity />}
                        {state.util.index === 7 && <SetupControl />}
                        {state.util.index === 8 && <SetupAccount />}
                    </div>
                </div>
            </div>
        </>
    );
}
