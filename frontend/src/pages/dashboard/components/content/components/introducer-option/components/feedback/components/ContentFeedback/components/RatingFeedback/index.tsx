import classNames from "classnames/bind";
import styles from "./RatingFeedback.module.css";
const cx = classNames.bind(styles);
import { MessageSquare, PenLine } from "lucide-react";


export default function RatingFeedback({ feedbacks, place }) {
    const ratingEntries = Object.entries(place.ratingStar);
    const maxCount = Math.max(...ratingEntries.map(([, count]) => count));
    return (
        <div className={cx("rating__grid")}>
            <div className={cx("rating-fill__wrapper")}>
                <div className={cx("rating-fill__grid")}>
                    {ratingEntries.sort((a, b) => Number(b[0]) - Number(a[0])).map(([star, count]) => {
                        const persent = (count / maxCount) * 100;

                        return (<div className={cx("rating__items")}>
                            <div className={cx("star__count")}>{star}</div>
                            <div className={cx("rating-bg__fill")}>
                                <div
                                    className={cx("rating__fill")}
                                    style={{ width: `${persent}%` }}
                                ></div>
                            </div>
                        </div>);
                    })}
                </div>

                <div className={cx("rating-overview__wrapper")}>
                    <div className={cx("rating-medium")}>{place.rating}</div>
                    <div className={cx("rating-star")}>
                        {Array.from({ length: 5 }).map((_, index) => {
                            const rating = place.rating;
                            const fullstar = Math.floor(rating);
                            const halfstar = (fullstar - rating) % 1 !== 0;
                            if (index < fullstar) {
                                return (
                                    <span key={index} className={cx("star", "star-full")}>★</span>
                                );
                            }
                            if (index === fullstar && halfstar) {
                                return (
                                    <span key={index} className={cx("star", "star-half")}>★</span>
                                );
                            }
                            return (
                                <span key={index} className={cx("star", "star-empty")}>★</span>
                            );

                        })}
                    </div>
                    <div className={cx("rating-count")}>{place.reviews} bài viết</div>
                </div>
            </div>

            <div className={cx("write__rating")}>
                <button className={cx("write__btn")}>
                    <div className={cx("icon-compose")}>
                        <MessageSquare size={16}  />
                        <PenLine size={7} className={cx("pen-overlay")}/>
                    </div>
                    <span className={cx("write-review__label")}>Viết bài đánh giá</span>
                </button>
            </div>
        </div >
    );
}