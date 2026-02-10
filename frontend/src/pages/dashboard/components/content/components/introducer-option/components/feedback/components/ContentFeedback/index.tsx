import classNames from "classnames/bind";
import styles from "./ContentFeedback.module.css";
import { ThumbsUp } from "lucide-react";
import RatingFeedback from "./components/RatingFeedback/index";
import FeedbackReview from "./components/FeedbackReview/index";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function FeedBack({ feedbacks, place }) {
    return (
        <div className={cx("feedback__grid")}>
            <RatingFeedback feedbacks={feedbacks} place={place}></RatingFeedback>
            <FeedbackReview feedbacks={feedbacks}></FeedbackReview>
        </div>
    );
}