import classNames from "classnames/bind";
import styles from "./PlaceGallery.module.css";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const cx = classNames.bind(styles);

export default function PlaceGallery({ place }) {

    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const galleryRef = useRef<HTMLDivElement | null>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const checkScroll = () => {
        const el = galleryRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const scrollLeft = () => {
        galleryRef.current?.scrollBy({
            left: -240,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        galleryRef.current?.scrollBy({
            left: 240,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        checkScroll();
        const el = galleryRef.current;
        if (!el) return;

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);


    return (
        <div className={cx("place-gallery__wrapper")}>
            <div className={cx("place-gallery__title")}>
                <h2>Ảnh</h2>
            </div>

            <div ref={galleryRef} className={cx("place-gallery__content")}>
                <div className={cx("space-left")}></div>
                <div className={cx("allitems")}>
                    <button className={cx("items__wrapper")}>
                        <div className={cx("img")}>
                            <img src={place.img} alt="" />
                        </div>
                        <div className={cx("title")}>
                            <span>Tất cả</span>
                        </div>
                    </button>
                </div>
                <div className={cx("itemsnew")}>
                    <button className={cx("items__wrapper")}>
                        <div className={cx("img")}>
                            <img src={place.img} alt="" />
                        </div>
                        <div className={cx("title")}>
                            <span>Mới nhất</span>
                        </div>
                    </button>
                </div>
                <div className={cx("image")}>
                    <button className={cx("items__wrapper")}>
                        <div className={cx("img")}>
                            <img src={place.img} alt="" />
                        </div>
                        <div className={cx("title")}>
                            <span>Ảnh</span>
                        </div>
                    </button>
                </div>
                <div className={cx("image-i")}>
                    <button className={cx("items__wrapper")}>
                        <div className={cx("img")}>
                            <img src={place.img} alt="" />
                        </div>
                        <div className={cx("title")}>
                            <span>Ảnh</span>
                        </div>
                    </button>
                </div>
                <div className={cx("space-right")}></div>
            </div>

            {canScrollLeft && (
                <button
                    className={cx("scroll-icon", "icon-left")}
                    onClick={scrollLeft}
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {canScrollRight && (
                <button
                    className={cx("scroll-icon", "icon-right")}
                    onClick={scrollRight}
                >
                    <ChevronRight size={18} />
                </button>
            )}

            <div className={cx("place-gallery__add")}>
                <div className={cx("add-gallery__btn")}>
                    <Plus size={16} strokeWidth={IconRef.current.y} />
                    <span>Thêm ảnh</span>
                </div>
            </div>

            <div className={cx("place-gallery__space")}></div>
        </div>
    );
}