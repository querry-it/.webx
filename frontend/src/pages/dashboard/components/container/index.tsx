import classNames from "classnames/bind";
import Content from "../content";
import Navbar from "../navbar";

import styles from "./container.module.css";

const cx = classNames.bind(styles);

export default function Container() {
    return (
        <>
            <div className={cx("container")}>
                <Navbar />
                <Content />
            </div>
        </>
    );
}
