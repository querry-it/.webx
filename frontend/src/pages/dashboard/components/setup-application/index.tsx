import classNames from "classnames/bind";
import styles from "../setup-modal/setupmodal.module.css";

const cx = classNames.bind(styles);

export default function SetupApplication() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("global")}>
                    <h3>Ứng dụng</h3>
                </div>
                <div className={cx("box")}>
                    <div className={cx("box__brands")}>
                        <div className={cx("box__brands-x")}>
                            <div className={cx("box__brands--ix")}>
                                <i
                                    className={cx(
                                        "fa-brands",
                                        "fa-itunes-note",
                                        "icon_x"
                                    )}
                                ></i>
                            </div>
                        </div>
                        <div className={cx("box__brands-y")}>
                            <div className={cx("box__brands--iy")}>
                                <i
                                    className={cx(
                                        "fa-brands",
                                        "fa-github",
                                        "icon_y"
                                    )}
                                ></i>
                            </div>
                        </div>
                        <div className={cx("box__brands-z")}>
                            <div className={cx("box__brands--iz")}>
                                <i
                                    className={cx(
                                        "fa-brands",
                                        "fa-discord",
                                        "icon_z"
                                    )}
                                ></i>
                            </div>
                        </div>
                        <div className={cx("box__brands-t")}>
                            <div className={cx("box__brands--it")}>
                                <i
                                    className={cx(
                                        "fa-brands",
                                        "fa-reddit",
                                        "icon_t"
                                    )}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className={cx("box__title")}>
                        Thêm và quản lý các ứng dụng mà ChatIZN có thể sử dụng
                        trong <br />
                        các đoạn chat của bạn.
                    </div>
                    <div className={cx("box__button")}>
                        <button className={cx("box__button--x")}>
                            Khám phá ứng dụng
                        </button>
                    </div>
                </div>
                <div className={cx("setup")}>
                    <button
                        onClick={() => console.log("1")}
                        className={cx("setup__box")}
                    >
                        <div className={cx("box__top")}>
                            <div className={cx("box__top--icon")}>
                                <i className={cx("far", "fa-frown")}></i>
                            </div>
                            <div className={cx("box__top--text")}>
                                Cài đặt nâng cao
                            </div>
                        </div>
                        <div className={cx("box__bottom")}>
                            <div className={cx("box__bottom--content")}>
                                <i
                                    className={cx(
                                        "fas",
                                        "fa-chevron-down",
                                        "icon__x"
                                    )}
                                ></i>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
