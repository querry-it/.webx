import { useEditor } from "../../../../state/useEditor";
import ProjectModal from "../project-modal";
import ContentNavbarX from "./components/content/content";
import FooterNavbarX from "./components/footer/footer";
import HeaderNavbarX from "./components/header/header";
import styles from "./navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Navbarx() {
    const { state } = useEditor();

    return (
        <div className={cx("navbar-x")}>
            <HeaderNavbarX />
            <ContentNavbarX />
            <FooterNavbarX />
            {state.modal.project && <ProjectModal />}
        </div>
    );
}
