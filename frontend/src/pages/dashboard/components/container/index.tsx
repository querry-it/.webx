import classNames from "classnames/bind";
import Navbar from "../navbar";
import Header from "../header";
import Content from "../content";
import ContentLeft from "../no-content-left/no-content-left";
import ContentRight from "../no-content-right/no-content-right";
import styles from "./container.module.css";

const cx = classNames.bind(styles);

export default function Container() {
    return (
        <>
            <div className={cx("container")}>
                <Navbar />
                <Header />
                <Content />
                <ContentLeft />
                <ContentRight />
            </div>
        </>
    );
}
