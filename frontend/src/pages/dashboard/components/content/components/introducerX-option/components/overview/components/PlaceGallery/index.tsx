import classNames from "classnames/bind";
import styles from "./PlaceGallery.module.css";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const cx = classNames.bind(styles);

export default function PlaceGallery({ place }) {

    const IconRef = useRef<{ x: number; y: number }>({ x: 20, y: 1.6 });
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [openGallery, setOpenGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([place.img]);
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

    const handleClickAdd = () => {
        fileInputRef.current?.click();
    };

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const urls = files.map(file => URL.createObjectURL(file));

        // ảnh mới nhất lên đầu
        setImages(prev => [...urls, ...prev]);

        // mở luôn ảnh mới nhất
        setCurrentIndex(0);

        e.target.value = "";
    };




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
                {images.map((img, index) => (
                    <div key={index} className={cx("image-i")}>
                        <button
                            className={cx("items__wrapper")}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <div className={cx("img")}>
                                <img src={img} alt="" />
                            </div>
                            <div className={cx("title")}>
                                <span>Ảnh của tôi</span>
                            </div>
                        </button>
                    </div>
                ))}

                {currentIndex !== null && (
                    <div
                        className={cx("image-preview__overlay")}
                        onClick={() => setCurrentIndex(null)}
                    >
                        <div
                            className={cx("image-preview__container")}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className={cx("close-btn")}
                                onClick={() => setCurrentIndex(null)}
                            >
                                <X />
                            </button>
                            {/* BÊN TRÁI: LIST ẢNH */}
                            <div className={cx("preview-list")}>
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        className={cx(
                                            "preview-thumb",
                                            idx === currentIndex && "active"
                                        )}
                                        onClick={() => setCurrentIndex(idx)}
                                    />
                                ))}
                            </div>

                            {/* BÊN PHẢI: ẢNH LỚN */}
                            <div className={cx("preview-main")}>
                                <button
                                    className={cx("nav-btn", "left")}
                                    onClick={() =>
                                        setCurrentIndex(i =>
                                            i! > 0 ? i! - 1 : images.length - 1
                                        )
                                    }
                                >
                                    <ChevronLeft />
                                </button>

                                <img src={images[currentIndex]} alt="" />

                                <button
                                    className={cx("nav-btn", "right")}
                                    onClick={() =>
                                        setCurrentIndex(i =>
                                            i! < images.length - 1 ? i! + 1 : 0
                                        )
                                    }
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                )}



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

            <div className={cx("place-gallery__add")} onClick={handleClickAdd}>
                <div className={cx("add-gallery__btn")}>
                    <Plus size={16} strokeWidth={IconRef.current.y} />
                    <span>Thêm ảnh</span>
                </div>
            </div>

            {/* input ẩn */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleSelectImage}
            />

            <div className={cx("place-gallery__space")}></div>
        </div>
    );
}