import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupSecurity() {
    const [onButton1, setButton1] = useState<boolean>(false);
    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });

    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Bảo mật</h3>
                </div>
                <button className={cx("secure__key")}>
                    <div className={cx("key__column")}>
                        <div className={cx("column__title")}>Khóa mã hóa</div>
                        <div className={cx("column__text")}>
                            Khóa mã hóa an toàn và bảo vệ tài khoản của bạn bằng
                            hình xác <br />
                            thực đa yếu tố. Phương thức này không cần thực hiện
                            thêm bất kỳ <br />
                            bước nào.
                        </div>
                    </div>
                    <div className={cx("key__row")}>
                        <div className={cx("row__title")}>Thêm</div>
                        <div className={cx("row__content")}>
                            <ChevronDown
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                    </div>
                </button>
                <div className={cx("secure__mfa")}>
                    Xác thực đa nhân tố (MFA)
                </div>
                <div className={cx("secure__application")}>
                    <div className={cx("app__auth")}>
                        <div className={cx("auth__title")}>
                            Ứng dụng xác thực
                        </div>

                        <div
                            onClick={() => setButton1(!onButton1)}
                            className={cx("button", {
                                on: onButton1,
                            })}
                        >
                            <div className={cx("button__content")}></div>
                        </div>
                    </div>
                    <div className={cx("app__support")}>
                        Sử dụng mã dùng một lần từ ứng dụng
                    </div>
                </div>
                <div className={cx("secure__device")}>
                    <div className={cx("secure__title")}>
                        Thiết bị đáng tin cậy
                    </div>
                    <div className={cx("secure__content")}>
                        Khi bạn đăng nhập trên một thiết bị khác, thiết bị đó sẽ
                        được thêm
                        <br /> vào đây và có thể tự động nhận được lời nhắc đăng
                        nhập trên thiết bị
                        <br /> đó.
                    </div>
                </div>
                <div className={cx("secure__logout")}>
                    <div className={cx("logout__title")}>
                        Đăng xuất khỏi thiết bị
                    </div>
                    <button className={cx("logout__button")}>
                        <div>Đăng xuất</div>
                    </button>
                </div>
                <div className={cx("secure__out")}>
                    <div className={cx("out__left")}>
                        <div className={cx("secure__left--title")}>
                            Đăng xuất khỏi tất cả thiết bị
                        </div>
                        <div className={cx("secure__left--content")}>
                            Đăng xuất khỏi tất cả các phiên hoạt động
                            <br /> trên tất cả các thiết bị, bao gồm cả phiên
                            hiện
                            <br /> tại của bạn. Việc đăng xuất ở các thiết bị
                            khác
                            <br /> có thể mất tới 30 phút.
                        </div>
                    </div>
                    <div className={cx("out__right")}>
                        <button className={cx("out__right--content")}>
                            <div>Đăng xuất khỏi tất cả</div>
                        </button>
                    </div>
                </div>
                <div className={cx("secure__login")}>
                    <div className={cx("secure__login--left")}>
                        Đăng nhập an toàn với ChatIZN
                    </div>
                    <div className={cx("secure__login--right")}>
                        Đăng nhập các trang web và ứng dụng trên Internet bằng
                        tính năng bảo
                        <br /> mật đáng tin cậy của ChatIZN.{" "}
                        <span className={cx("prev")}>Tìm hiểu thêm</span>
                    </div>
                </div>
                <div className={cx("secure__banner")}>
                    <div className={cx("banner__content")}>
                        <div className={cx("content")}>
                            Bạn chưa sử dụng ChatIZN để đăng nhập vào bất kỳ
                            trang
                            <br /> web hoặc ứng dụng nào. Khi bạn làm vậy, chúng
                            sẽ hiển thị ở
                            <br /> đây.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
