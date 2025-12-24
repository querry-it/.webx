import classNames from "classnames/bind";
import { useState, useRef } from "react";
import styles from "./profilemodal.module.css";

const cx = classNames.bind(styles);

interface Active {
    name: boolean;
    code: boolean;
}

interface Information {
    name: string;
    code: string;
}

export default function ProfileModal({ onClose, onClick }) {
    const [active, setActive] = useState<Active>({
        name: false,
        code: false,
    });

    const [info, setInfo] = useState<Information>({
        name: "IchigoMazone",
        code: "1122334455",
    });

    const [src, setSrc] = useState<string>(
        "https://file.hstatic.net/200000108863/file/3_33cbf6a0308e40ca8962af5e0460397c_grande.png"
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChooseImage = () => {
        inputRef.current?.click();
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSrc(URL.createObjectURL(file));
    };

    return (
        <>
            <div onClick={onClose} className={cx("modal-overlay")}>
                <div onClick={onClick} className={cx("modal-container")}>
                    <div className={cx("title")}>
                        <div className={cx("title__box")}>
                            <div className={cx("title__box--line")}>
                                <h2 className={cx("text")}>Chỉnh sửa hồ sơ</h2>
                            </div>
                        </div>
                        <div className={cx("title__space")}></div>
                    </div>
                    <div className={cx("content")}>
                        <form>
                            <div className={cx("content__avatar")}>
                                <div className={cx("content__avatar--image")}>
                                    <button
                                        type="button"
                                        onClick={handleChooseImage}
                                    >
                                        <img src={src} alt="avatar" />
                                        <div className={cx("wrapper")}>
                                            <i
                                                className={cx(
                                                    "far",
                                                    "fa-frown"
                                                )}
                                            ></i>
                                        </div>
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleChangeImage}
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    setActive({
                                        name: !active.name,
                                        code: false,
                                    })
                                }
                                className={cx("content__name", {
                                    active: active.name,
                                })}
                            >
                                <div className={cx("content__name--label")}>
                                    <label>Tên hiển thị</label>
                                </div>
                                <div className={cx("content__name--input")}>
                                    <input
                                        type="text"
                                        value={info.name}
                                        onChange={(e) =>
                                            setInfo((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    setActive({
                                        name: false,
                                        code: !active.code,
                                    })
                                }
                                className={cx("content__code", {
                                    active: active.code,
                                })}
                            >
                                <div className={cx("content__code--label")}>
                                    <label>Tên người dùng</label>
                                </div>
                                <div className={cx("content__code--input")}>
                                    <input
                                        type="text"
                                        value={info.code}
                                        onChange={(e) =>
                                            setInfo((prev) => ({
                                                ...prev,
                                                code: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <p className={cx("p")}>
                                Hồ sơ của bạn giúp người khác nhận ra bạn. Tên
                                và tên người dùng của bạn cũng được sử dụng
                                trong ứng dụng Sora.
                            </p>
                        </form>
                        <div className={cx("submit")}>
                            <div className={cx("submit__btn")}>
                                <button
                                    onClick={onClose}
                                    className={cx("no-save")}
                                >
                                    <div>Hủy</div>
                                </button>
                                <button
                                    onClick={() => console.log("Lưu")}
                                    className={cx("save")}
                                >
                                    <div>Lưu</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
