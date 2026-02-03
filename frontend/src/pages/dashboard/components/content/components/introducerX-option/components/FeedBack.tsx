import classNames from "classnames/bind";
import styles from "../introducerX.module.css";
import { ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function FeedBack({ feedbacks }) {
    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const [likeCount, setLikeCount] = useState(10);
    const [likeActive, setLikeActive] = useState(false);
    const [moreImg, setMoreImg] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const likeFeedback = () => {
        setLikeCount(prev => (likeActive ? prev - 1 : prev + 1));
        setLikeActive(prev => !prev);
    };
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
        const maxHeight = lineHeight * 4;
        
        if (el.scrollHeight > maxHeight) {
            setShowButton(true);
        }
    }, []);

    return (
        <div className={cx("content-review__wrapper")}>
            <div className={cx("content-review__header")}>
                <div className={cx("avatar__wrapper")}>
                    <img src={feedbacks.avatar} alt="Ảnh đại diện" />
                </div>
                <div className={cx("title-review")}>
                    <div className={cx("title-review__name")}>
                        {feedbacks.name}
                    </div>
                    <div className={cx("title-review__count")}>
                        Local Guide · {feedbacks.feedbackCount} baì đánh giá · {feedbacks.imgCount} ảnh
                    </div>
                </div>
            </div>


            <div className={cx("title-content__wrapper")}>
                <div className={cx("title-content__rate")}>
                    <div className={cx("star")}>
                        {Array.from({ length: 5 }).map((_, i) => {
                            const fill = Math.min(Math.max(feedbacks.rating - i, 0), 1);

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
                        <span>{timeAgo(feedbacks.createdAt)}</span>
                    </div>
                    {isNewFeedback(feedbacks.createdAt) && (<div className={cx("time__heightline")}>Mới</div>)}
                </div>

                <div className={cx("content__review")}>
                    <span ref={contentRef} className={cx(seeMore ? "content-span__review" : "seemore__review")}>
                        {feedbacks.content}
                    </span>
                    {showButton && (
                        <span>
                            <button
                                onClick={() => setSeeMore(prev => !prev)}
                                className={cx("btn-more")}
                            >
                                {seeMore ? "Xem thêm" : "Rút gọn"}
                            </button>
                        </span>
                    )}
                </div>
            </div>

            <div className={cx("content-gallery__wrapper")}>
                <div className={cx("content-gallery__grid")}>
                    {(moreImg ? feedbacks.gallery : feedbacks.gallery.slice(0, 4)).map((img, index) => (
                        <div key={img.id} className={cx("img-item")}>
                            <img src={img.url} alt="" />
                            {!moreImg && index === 3 && (<div onClick={() => setMoreImg(true)} className={cx("gallery__more")}>
                                <button className={cx("gallery-more__btn")}>
                                    Mục khác
                                </button>
                            </div>)}
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx("like-content__wrapper")}>
                <button onClick={likeFeedback} className={cx(!likeActive ? "like-content__btn" : "like-active__btn")}>
                    <ThumbsUp size={16} strokeWidth={2.5} className={cx(!likeActive ? "" : "like-active__icon")} style={{ marginBottom: "4px" }} />
                    <span className={cx(!likeActive ? "" : "like-active__count")}>{likeCount > 0 ? likeCount : "Thích"}</span>
                </button>
            </div>
        </div>
    );
}