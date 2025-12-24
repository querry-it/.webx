import classNames from "classnames/bind";
import styles from "./updatemodal.module.css";

const cx = classNames.bind(styles);

export default function UpdateModal({ onClose }) {
    return (
        <>
            <div onClick={onClose} className={cx("modal-overlay")}>
                <div className={cx("modal-container")}>
                    Đây là profile Modal
                </div>
            </div>
        </>
    );
}
