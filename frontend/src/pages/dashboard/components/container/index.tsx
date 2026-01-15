import classNames from "classnames/bind";
import { useEffect } from "react";
import { useEditor } from "../../../../state/useEditor";
import Content from "../content";
import Header from "../header";
import Navbar from "../navbar";
import Navbarx from "../navbar-x";
import styles from "./container.module.css";

const cx = classNames.bind(styles);

export default function Container() {
    const { state, dispatch } = useEditor();

    useEffect(() => {
        dispatch({ type: "SET_SIDEBAR", payload: { open: true } });
    }, []);

    return (
        <>
            <div className={cx("container", { active: state.util.open })}>
                {!state.util.open ? <Navbar /> : <Navbarx />}
                <Content />
            </div>
        </>
    );
}
