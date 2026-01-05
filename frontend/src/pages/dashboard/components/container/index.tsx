import classNames from "classnames/bind";
import Navbar from "../navbar";
import Header from "../header";
import Content from "../content";
import ContentLeft from "../no-content-left/no-content-left";
import ContentRight from "../no-content-right/no-content-right";
import Navbarx from "../navbar-x";
import styles from "./container.module.css";
import { useEditor } from "../../../../state/useEditor";
import { useEffect } from "react";

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
                <Header />
                <Content />
                <ContentLeft />
                <ContentRight />
            </div>
        </>
    );
}
