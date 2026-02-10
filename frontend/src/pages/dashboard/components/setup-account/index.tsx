import classNames from "classnames/bind";
import {
    Box,
    Brain,
    ChevronDown,
    Globe,
    Images,
    Info,
    LayoutDashboard,
    Mail,
    MessagesSquare,
    Sparkles,
    Telescope,
    User,
} from "lucide-react";
import { useRef } from "react";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupAccount() {
    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });

    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Tài khoản</h3>
                </div>
                <div className={cx("update__account")}>
                    <div className={cx("update__account--left")}>
                        Chuyển qua ChatIZN Go
                    </div>
                    <button className={cx("update__account--right")}>
                        Nâng cấp
                    </button>
                </div>
                <div className={cx("title__account")}>
                    Tận dụng mọi tính năng trong gói Free và nhiều quyền lợi
                    khác.
                </div>
                <div className={cx("table__account")}>
                    <div className={cx("table__account--x")}>
                        <div className={cx("x__icon")}>
                            <Sparkles
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("x__content")}>
                            Đào sâu với câu hỏi khó hơn
                        </div>
                    </div>
                    <div className={cx("table__account--y")}>
                        <div className={cx("y__icon")}>
                            <MessagesSquare
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("y__content")}>
                            Trò chuyện lâu hơn và tải lên nhiều nội dung hơn
                        </div>
                    </div>
                    <div className={cx("table__account--z")}>
                        <div className={cx("z__icon")}>
                            <Images
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("z__content")}>
                            Tạo hình ảnh chân thực cho dự án của bạn
                        </div>
                    </div>
                    <div className={cx("table__account--t")}>
                        <div className={cx("t__icon")}>
                            <Brain
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("t__content")}>
                            Lưu trữ nhiều ngữ cảnh hơn để nhận được câu trả lời
                            thông
                            <br /> minh hơn
                        </div>
                    </div>
                    <div className={cx("table__account--xx")}>
                        <div className={cx("xx__icon")}>
                            <Telescope
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("x__content")}>
                            Nhận trợ giúp từ việc lập kế hoạch và nhiệm vụ
                        </div>
                    </div>
                    <div className={cx("table__account--yy")}>
                        <div className={cx("yy__icon")}>
                            <LayoutDashboard
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("yy__content")}>
                            Khám phá các dự án, nhiệm vụ và IZN tùy chỉnh
                        </div>
                    </div>
                </div>
                <div className={cx("payment__account")}>
                    <div className={cx("payment__account--left")}>
                        <div className={cx("account__left--title")}>
                            Thanh toán
                        </div>
                        <div className={cx("account__left--content")}>
                            Cần hỗ trợ gì về việc thanh toán?
                        </div>
                    </div>
                    <button className={cx("payment__account--right")}>
                        Quản lý
                    </button>
                </div>
                <div className={cx("delete__account")}>
                    <div className={cx("delete__account--left")}>
                        Xóa tài khoản
                    </div>
                    <button className={cx("delete__account--right")}>
                        Xóa
                    </button>
                </div>
                <div className={cx("profile__account")}>Hồ sơ builder IZN</div>
                <div className={cx("content__account")}>
                    Cá nhân hóa hồ sơ nhà phát triển để kết nối với người dùng
                    IZN
                    <br /> của bạn. Những cài đặt này sẽ được áp dụng cho IZN
                    được chia sẻ
                    <br />
                    công khai.
                </div>
                <div className={cx("icon__account")}>
                    <div className={cx("box__x")}>
                        <div className={cx("x__hidden")}>Xem trước</div>
                        <div className={cx("x__icon")}>
                            <Box
                                className={cx("icon")}
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("x__note")}>Xem trước</div>
                    </div>
                    <div className={cx("box__y")}>PlaceholderIZN</div>
                    <div className={cx("box__z")}>
                        Bởi community builder
                        <User
                            size={Icon.current.size - 6}
                            strokeWidth={Icon.current.weight}
                        />
                    </div>
                </div>
                <div className={cx("note__account")}>
                    <div className={cx("note__account--title")}>
                        <div>
                            <Info
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                    </div>
                    <div className={cx("note__account--content")}>
                        <div className={cx("note__top")}>
                            Hoàn thành xác minh để xuất bản IZN cho mọi người.
                        </div>
                        <div className={cx("note__bottom")}>
                            <p>
                                Xác minh danh tính của bạn bằng cách thêm chi
                                tiết
                            </p>

                            <p>
                                thanh toán hoặc xác minh quyền sở hữu tên miền
                                công
                            </p>

                            <p>khai.</p>
                        </div>
                    </div>
                </div>
                <div className={cx("link__account")}>
                    <div className={cx("link__space")}>
                        <div className={cx("line")}></div>
                    </div>
                    <div className={cx("link__link")}>Liên kết</div>
                    <div className={cx("link__world")}>
                        <div className={cx("world__icon")}>
                            <Globe
                                size={Icon.current.size - 6}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <button className={cx("world__button")}>
                            <div className={cx("button__title")}>
                                Chọn một miền
                            </div>
                            <div className={cx("button__btn")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                    <div className={cx("link__linkedin")}>
                        <div className={cx("linkedin__icon")}>
                            <div className={cx("icon__icon")}>
                                <i
                                    className={cx("fa-brands", "fa-linkedin")}
                                ></i>
                            </div>
                            <div className={cx("icon__title")}>LinkedIn</div>
                        </div>
                        <button className={cx("linkedin__button")}>
                            <div className={cx("button__title")}>Thêm</div>
                        </button>
                    </div>
                    <div className={cx("link__github")}>
                        <div className={cx("github__icon")}>
                            <div className={cx("icon__icon")}>
                                <i className={cx("fa-brands fa-github")}></i>
                            </div>
                            <div className={cx("icon__title")}>Github</div>
                        </div>
                        <button className={cx("github__button")}>Thêm</button>
                    </div>
                </div>
                <div className={cx("email__account")}>
                    <div className={cx("email__space")}>
                        <div className={cx("line")}></div>
                    </div>
                    <div className={cx("email__email")}>Email</div>
                    <div className={cx("email__link")}>
                        <div className={cx("link__icon")}>
                            <Mail
                                size={Icon.current.size - 6}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div className={cx("link__content")}>
                            ichigomazone@izn.mzn
                        </div>
                    </div>
                    <div className={cx("tick__email")}>
                        <input
                            className={cx("tick__title")}
                            type="checkbox"
                        ></input>
                        <div className={cx("tick__content")}>
                            Nhận email phản hồi
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
