import classNames from "classnames/bind";
import styles from "./personmodal.module.css";

const cx = classNames.bind(styles);

export default function PersonModal({ onClose }) {
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
