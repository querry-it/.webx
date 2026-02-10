import classNames from "classnames/bind";
import { Plus } from "lucide-react";
import { useRef } from "react";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupControl() {
    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Quyền kiểm soát</h3>
                </div>
                <div className={cx("control")}>
                    <div className={cx("control__content")}>
                        Cha mẹ và trẻ có thể liên kết tài khoản, qua đó cung cấp
                        cho cha mẹ <br />
                        các công cụ để điều chỉnh một số tính năng, đặt giới hạn
                        và thêm các <br />
                        biện pháp bảo vệ phù hợp với gia đình họ.
                    </div>
                </div>
                <div className={cx("control__button")}>
                    <button
                        onClick={() => console.log("1")}
                        className={cx("button")}
                    >
                        <div>
                            <Plus
                                size={Icon.current.size}
                                strokeWidth={Icon.current.weight}
                            />
                        </div>
                        <div>Thêm thành viên gia đình</div>
                    </button>
                </div>
            </div>
        </>
    );
}
