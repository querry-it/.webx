import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupPerson() {
    const endRef = useRef(null);
    const Icon = useRef<{ size: number; weight: number }>({
        size: 20,
        weight: 1.6,
    });

    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [input4, setInput4] = useState<string>("");
    const [onButton2, setButton2] = useState<boolean>(false);
    const [onButton3, setButton3] = useState<boolean>(false);

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "input_1") setInput1(value);
        if (name === "input_2") setInput2(value);
        if (name === "input_3") setInput3(value);
        if (name === "input_4") setInput4(value);
    };

    useEffect(() => {
        if (
            input1.trim() !== "" ||
            input2.trim() !== "" ||
            input3.trim() !== "" ||
            input4.trim() !== ""
        ) {
            setButton3(true);
        } else {
            setButton3(false);
        }
    }, [input1, input2, input3, input4]);

    useEffect(() => {
        if (onButton2) {
            endRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [onButton2]);

    const placeholders = [
        "Tài xế ce bò...",
        "Ông chủ cái bang",
        "Tổng tài giả nghèo",
        "Con chủ tịch",
        "Bạn nữ lớp bên",
    ];

    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Cá nhân hóa</h3>
                </div>
                <div className={cx("grid__box")}>
                    <div className={cx("area__a")}>
                        <div className={cx("area__a--content")}>
                            Phong cách và giọng điệu cơ bản
                        </div>
                    </div>
                    <div className={cx("area__b")}>
                        <button className={cx("area__b--content")}>
                            <div className={cx("b__left")}>Mặc định</div>
                            <div className={cx("b__right")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                    <div className={cx("area__c")}>
                        <div className={cx("area__c--content")}>
                            <p>
                                Thiết lập phong cách và giọng điệu phản hồi của
                            </p>
                            <p>
                                ChatIZN. Điều này không ảnh hưởng đến tính năng
                            </p>
                            <p>của ChatIZN.</p>
                        </div>
                    </div>
                    <div className={cx("area__d")}></div>
                    <div className={cx("area__e")}>
                        <div className={cx("area__e--title")}>Đặc điểm</div>
                        <div className={cx("area__e--content")}>
                            <p>
                                Chọn các tùy chỉnh bổ sung dựa trên phong cách
                                và tông giọng cơ bản
                            </p>
                            <p>của bạn.</p>
                        </div>
                    </div>
                    <div className={cx("area__f")}>
                        <div className={cx("area__f--content")}>Ấm áp</div>
                    </div>
                    <div className={cx("area__g")}>
                        <button className={cx("area__g--content")}>
                            <div className={cx("b__left")}>Mặc định</div>
                            <div className={cx("b__right")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                    <div className={cx("area__h")}>
                        <div className={cx("area__h--content")}>Nhiệt tình</div>
                    </div>
                    <div className={cx("area__i")}>
                        <button className={cx("area__i--content")}>
                            <div className={cx("b__left")}>Mặc định</div>
                            <div className={cx("b__right")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                    <div className={cx("area__k")}>
                        <div className={cx("area__k--content")}>
                            Tiêu đề và danh sách
                        </div>
                    </div>
                    <div className={cx("area__l")}>
                        <button className={cx("area__l--content")}>
                            <div className={cx("b__left")}>Mặc định</div>
                            <div className={cx("b__right")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                    <div className={cx("area__m")}>
                        <div className={cx("area__m--content")}>
                            Biểu tượng cảm xúc
                        </div>
                    </div>
                    <div className={cx("area__n")}>
                        <button className={cx("area__n--content")}>
                            <div className={cx("b__left")}>Mặc định</div>
                            <div className={cx("b__right")}>
                                <ChevronDown
                                    size={Icon.current.size}
                                    strokeWidth={Icon.current.weight}
                                />
                            </div>
                        </button>
                    </div>
                </div>
                <div className={cx("option")}>
                    <div className={cx("option__title")}>
                        Hướng dẫn tùy chỉnh
                    </div>
                    <input
                        name="input_1"
                        className={cx("option__input")}
                        type="text"
                        value={input1}
                        onChange={handleInput}
                        placeholder="Tùy chỉnh thêm về hành vi, phong cách và giọng điệu"
                    />
                </div>
                <div className={cx("information")}>Thông tin về bạn</div>
                <hr className={cx("line__x")} />
                <div className={cx("option")}>
                    <div className={cx("option__title")}>Biệt danh</div>
                    <input
                        name="input_2"
                        value={input2}
                        onChange={handleInput}
                        className={cx("option__input")}
                        type="text"
                        placeholder="ChatIZN nên gọi bạn là gì?"
                    />
                </div>
                <div className={cx("option")}>
                    <div className={cx("option__title")}>Nghề nghiệp</div>
                    <input
                        name="input_3"
                        value={input3}
                        onChange={handleInput}
                        className={cx("option__input")}
                        type="text"
                        placeholder="Tài xế xe bò..."
                    />
                </div>
                <div className={cx("option")}>
                    <div className={cx("option__title")}>
                        Thêm thông tin về bạn
                    </div>
                    <input
                        name="input_4"
                        value={input4}
                        onChange={handleInput}
                        className={cx("option__input")}
                        type="text"
                        placeholder="Sở thích, giá trị hoặc những điểm ưu tiên khi trò chuyện?"
                    />
                </div>
                <div className={cx("memory")}>
                    <div className={cx("memory__left")}>Bộ nhớ</div>
                    <button className={cx("memory__right")}>Quản lý</button>
                </div>
                <div className={cx("line__x")}></div>
                <div className={cx("memory__top")}>
                    <div className={cx("memory__top--left")}>
                        <div className={cx("title")}>
                            Tham khảo bộ nhớ đã lưu
                        </div>
                        <div className={cx("button")}>
                            <div className={cx("button__content")}></div>
                        </div>
                    </div>
                    <div className={cx("memory__top--right")}>
                        Cho phép ChatIZN lưu và sử dụng bộ nhớ khi phản hồi.
                    </div>
                </div>
                <div className={cx("memory__top")}>
                    <div className={cx("memory__top--left")}>
                        <div className={cx("title")}>
                            Tham khảo lịch sử đoạn chat
                        </div>
                        <div className={cx("button")}>
                            <div className={cx("button__content")}></div>
                        </div>
                    </div>
                    <div className={cx("memory__top--right")}>
                        Cho phép ChatIZN tham khảo các cuộc trò chuyện gần đây
                        khi phản hồi.
                    </div>
                </div>
                <div className={cx("memory__bottom")}>
                    <div className={cx("content")}>
                        ChatIZN có thể sử dụng Bộ nhớ để cá nhân hóa các truy
                        vấn theo công cụ tìm kiếm, như Bing.{" "}
                        <span>Tìm hiểu thêm</span>
                    </div>
                </div>
                <button
                    onClick={() => setButton2((prev) => !prev)}
                    className={cx("button__update")}
                >
                    <div className={cx("update__title")}>Nâng cao</div>
                    <div className={cx("update__button")}>
                        <ChevronDown
                            size={Icon.current.size}
                            strokeWidth={Icon.current.weight}
                        />
                    </div>
                </button>
                {onButton2 && (
                    <>
                        <div className={cx("line__x")}></div>
                        <div className={cx("memory__top")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>
                                    Tìm kiếm trên mạng
                                </div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Cho phép ChatIZN tự động tìm kiếm trên web để
                                tìm câu trả lời.
                            </div>
                        </div>
                        <div className={cx("memory__top")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>Mã</div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Cho phép ChatIZN thực thi mã bằng Trình Thông
                                dịch Mã.
                            </div>
                        </div>
                        <div className={cx("memory__top")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>Canvas</div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Cộng tác với ChatIZN trên văn bản và mã.
                            </div>
                        </div>
                        <div className={cx("memory__top")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>ChatIZN Voice</div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Bật chế độ thoại trong ChatIZN
                            </div>
                        </div>
                        <div className={cx("memory__top")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>
                                    Thoại nâng cao
                                </div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Trò chuyện tự nhiên hơn ở chế độ thoại
                            </div>
                        </div>
                        <div className={cx("memory__top--x")}>
                            <div className={cx("memory__top--left")}>
                                <div className={cx("title")}>
                                    Tìm kiếm trình kết nối
                                </div>
                                <div className={cx("button")}>
                                    <div
                                        className={cx("button__content")}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx("memory__top--right")}>
                                Cho phép ChatIZN tự động tìm kiếm các nguồn được
                                kết nối để tìm <br />
                                câu trả lời.
                            </div>
                        </div>
                        <span ref={endRef}></span>
                    </>
                )}
            </div>
            {onButton3 && (
                <div className={cx("sticky")}>
                    <button
                        onClick={() => {
                            setInput1("");
                            setInput2("");
                            setInput3("");
                            setInput4("");
                        }}
                        className={cx("cancel")}
                    >
                        Hủy bỏ
                    </button>
                    <button className={cx("save")}>Lưu</button>
                </div>
            )}
        </>
    );
}
