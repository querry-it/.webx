import classNames from "classnames/bind";
import styles from "./feedback.module.css";
import OptionFeedback from "./components/OptionFeedback/index";
import ContentFeedback from "./components/ContentFeedback/index";

const cx = classNames.bind(styles);

export default function Feedback({ place, feedbacks }) {
    return (
        <div className={cx("feedback__bgr")}>
            <div className={cx("title__feedback")}></div>
            <OptionFeedback className={cx("option__feedback")}></OptionFeedback>
            <ContentFeedback place={place} feedbacks={feedbacks} className={cx("content__feedback")}></ContentFeedback>
        </div>
    );
}