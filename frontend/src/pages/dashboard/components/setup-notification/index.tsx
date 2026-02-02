import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupNotification() {
    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Thông báo</h3>
                </div>
                <div className={cx("speak__x")}>
                    <div className={cx("speak__content")}>
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Phản hồi</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
                            >
                                <span>Đẩy</span>
                                <span>
                                    <ChevronDown
                                        size={Icon.current.size}
                                        strokeWidth={Icon.current.weight}
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={cx("speak__content--bottom")}>
                            Nhận thông báo khi ChatIZN phản hồi các yêu cầu mất
                            thời gian, như nghiên cứu hoặc tạo hình ảnh.
                        </div>
                    </div>
                </div>
                <div className={cx("speak__y")}>
                    <div className={cx("speak__content")}>
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Đoạn chat nhóm</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
                            >
                                <span>Đẩy</span>
                                <span>
                                    <ChevronDown
                                        size={Icon.current.size}
                                        strokeWidth={Icon.current.weight}
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={cx("speak__content--bottom")}>
                            Bạn sẽ nhận được thông báo về tin nhắn mới từ các
                            đoạn chat nhóm.
                        </div>
                    </div>
                </div>
                <div className={cx("speak__x")}>
                    <div className={cx("speak__content")}>
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Tác vụ</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
                            >
                                <span>Thông báo đẩy, Email</span>
                                <span>
                                    <ChevronDown
                                        size={Icon.current.size}
                                        strokeWidth={Icon.current.weight}
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={cx("speak__content--bottom")}>
                            Nhận thông báo khi nhiệm vụ bạn đã tạo có cập nhật.{" "}
                            <br />
                            Quản lý nhiệm vụ
                        </div>
                    </div>
                </div>
                <div className={cx("speak__x")}>
                    <div className={cx("speak__content")}>
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Projects</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
                            >
                                <span>Email</span>
                                <span>
                                    <ChevronDown
                                        size={Icon.current.size}
                                        strokeWidth={Icon.current.weight}
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={cx("speak__content--bottom")}>
                            Nhận thông báo khi bạn nhận được email mời tham gia
                            một dự án <br />
                            chung.
                        </div>
                    </div>
                </div>
                <div className={cx("speak__y")}>
                    <div className={cx("speak__content")}>
                        <div className={cx("speak__content--top")}>
                            <div className={cx("title")}>Đề xuất</div>
                            <button
                                className={cx("button")}
                                type="button"
                                onClick={() => console.log("Ngôn ngữ nói")}
                            >
                                <span>Thông báo đẩy, Email</span>
                                <span>
                                    <ChevronDown
                                        size={Icon.current.size}
                                        strokeWidth={Icon.current.weight}
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={cx("speak__content--bottom")}>
                            Nhận cập nhật về các công cụ, mẹo và tính năng mới
                            từ ChatIZN.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
