import classNames from "classnames/bind";
import styles from "./FeedbackReview.module.css";
import { ThumbsUp, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function FeedBackReview({ feedbacks }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [list, setList] = useState(feedbacks);
    const [openGalleryId, setOpenGalleryId] = useState<number | null>(null);
    const [seeMore, setSeeMore] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const timeAgo = (date) => {
        const diff = new Date() - new Date(date);
        const m = Math.floor(diff / 60000);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        const w = Math.floor(d / 7);
        const mo = Math.floor(d / 30);
        const y = Math.floor(d / 365);

        if (m < 1) return "vừa đăng";
        if (m < 60) return `${m} phút trước`;
        if (h < 24) return `${h} giờ trước`;
        if (d < 7) return `${d} ngày trước`;
        if (w < 4) return `${w} tuần trước`;
        if (mo < 12) return `${mo} tháng trước`

        return `${y} năm trước`;
    }

    const contentRef = useRef(null);
    const isNewFeedback = (date: string): boolean => {
        const diff = Date.now() - new Date(date).getTime()
        const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000
        return diff <= twoWeeks;
    }

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxHeight = lineHeight * 3;

        setShowButton(el.scrollHeight > maxHeight);
    }, []);


    const likeFeedback = (id: number) => {
        setList(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        liked: !item.liked,
                        likes: item.liked ? item.likes - 1 : item.likes + 1
                    }
                    : item
            )
        );
    };

    return (
        <div className={cx("content-feedback__grid")}>

            <div className={cx("filter-feedback__wrapper")}>
                <div className={cx("search-feedback")}>
                    <input type="text" placeholder="Tìm bài đánh giá" disabled />
                </div>

                <div className={cx("filter-feedback__toogle")}>
                    <button className={cx("filter-feedback__btn")}>
                        <div className="">
                            Phù hợp nhất
                        </div>
                        <div>
                            <ChevronDown />
                        </div>
                    </button>
                    {false && (<div className={cx("filter-feedback__dropdown")}>
                        <div className={cx("dropdown-item")}>
                            <span>Phù hợp nhất</span>
                        </div>
                        <div className={cx("dropdown-item")}>
                            <span>Mới nhất</span>
                        </div>
                        <div className={cx("dropdown-item")}>
                            <span>Xếp hạng cao nhất</span>
                        </div>
                        <div className={cx("dropdown-item")}>
                            <span>Xếp hạng thấp nhất</span>
                        </div>
                    </div>)}
                </div>
            </div>

            <div className={cx("content-review__wrapper")}>
                {list.map(feedback => (
                    <div key={feedback.id} className={cx("content-review__items")}>
                        <div className={cx("content-review__header")}>
                            <div className={cx("avatar__wrapper")}>
                                <img src={feedback.user.avatar} alt="Ảnh đại diện" />
                            </div>
                            <div className={cx("title-review__name")}>
                                {feedback.user.name}
                            </div>
                        </div>

                        <div className={cx("title-content__wrapper")}>
                            <div className={cx("title-content__rate")}>
                                <div className={cx("star")}>
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const fill = Math.min(Math.max(feedback.rating - i, 0), 1);

                                        return (
                                            <span key={i} className={cx("star__icon")}>
                                                <span className={cx("star-bg")}>★</span>
                                                <span
                                                    className={cx("star-fg")}
                                                    style={{ width: `${fill * 100}%` }}
                                                >
                                                    ★
                                                </span>
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className={cx("time-ago")}>
                                    <span>{timeAgo(feedback.createdAt)}</span>
                                </div>
                                {isNewFeedback(feedback.createdAt) && (<div className={cx("time__hightline")}>Mới</div>)}
                            </div>

                            <div className={cx("content__review")}>
                                <span
                                    ref={contentRef}
                                    className={cx(
                                        "content-text",
                                        seeMore ? "expanded" : "collapsed"
                                    )}
                                >
                                    {feedback.content}
                                </span>

                                {showButton && (
                                    <button
                                        onClick={() => setSeeMore(prev => !prev)}
                                        className={cx("btn-more")}
                                    >
                                        {seeMore ? "Rút gọn" : "Xem thêm"}
                                    </button>
                                )}
                            </div>

                        </div>

                        <div className={cx("content-gallery__wrapper")}>
                            <div className={cx("content-gallery__grid")}>
                                {(openGalleryId === feedback.id
                                    ? feedback.images
                                    : feedback.images.slice(0, 4)
                                ).map((img, index) => (
                                    <div
                                        key={index}
                                        className={cx(
                                            "img-item",
                                            openGalleryId !== feedback.id &&
                                            index === 3 &&
                                            feedback.images.length > 4 &&
                                            "img-blur"
                                        )}
                                        onClick={() => {
                                            if (index === 3 && feedback.images.length > 4) {
                                                setOpenGalleryId(feedback.id);
                                            }
                                        }}
                                    >
                                        <img src={img} alt="" />

                                        {openGalleryId !== feedback.id &&
                                            index === 3 &&
                                            feedback.images.length > 4 && (
                                                <div className={cx("gallery__overlay")}>
                                                    +{feedback.images.length - 4} ảnh
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className={cx("like-content__wrapper")}>
                            <button
                                onClick={() => likeFeedback(feedback.id)}
                                className={cx(!feedback.liked ? "like-content__btn" : "like-active__btn")}
                            >
                                <ThumbsUp
                                    size={16}
                                    strokeWidth={2.5}
                                    className={cx(!feedback.liked ? "" : "like-active__icon")}
                                />
                                <span className={cx(!feedback.liked ? "" : "like-active__count")}>
                                    {feedback.likes > 0 ? feedback.likes : "Thích"}
                                </span>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}