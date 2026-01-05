import styles from "./../../navbar-x.module.css";
import classNames from "classnames/bind";
import Application from "./components/application";
import Project from "./components/project";
import Group from "./components/group";
import Chat from "./components/chat";

const cx = classNames.bind(styles);

export default function ContentNavbarX() {
    return (
        <>
            <div className={cx("content")}>
                <Application/>
                <Project/>
                <Group/>
                <Chat/>
            </div>
        </>
    );
}
