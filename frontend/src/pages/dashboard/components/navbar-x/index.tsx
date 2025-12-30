import { useEditor } from "../../../../state/useEditor";
import styles from "./navbar-x.module.css";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function Navbarx() {
    const { state, dispatch } = useEditor();
    const [project, setProject] = useState<boolean>(false);
    const [group, setGroup] = useState<boolean>(false);
    const [chat, setChat] = useState<boolean>(false);
    const [openproject, setOpenProject] = useState<boolean>(false);
    const [opengroup, setOpenGroup] = useState<boolean>(false);
    const [openchat, setOpenChat] = useState<boolean>(false);

    const listProject = ["Học tập", "Giải trí", "Chơi game", "Ôn thi"]
    const listGroup = ["Xem Phim", "Đọc truyện", "Bắn súng", "Thi đấu"]
    const listChat = ["Python", "JavaScript", "Dart", "Java"]

    const setTooltip = (key: string, value: boolean) => {
        dispatch({
            type: "SET_TOOLTIP",
            payload: { [key]: value },
        });
    };

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    return (
        <div className={cx("navbar-x")}>
            <div className={cx("header")}>
                <div className={cx("header__start")}>
                    <div
                        onClick={() =>
                            setState("SET_UTIL", "open", !state.util["open"])
                        }
                        className={cx("header__start--gpt")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                    <div
                        onClick={() =>
                            setState("SET_UTIL", "open", !state.util["open"])
                        }
                        className={cx("header__start--gpt")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                </div>
                <div className={cx("header__end")}>
                    <div className={cx("header__end--add-x")}>
                        <div className={cx("header__end--add")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--add-y")}>
                            <span>Đoạn chat mới</span>
                        </div>
                    </div>

                    <div className={cx("header__end--search-x")}>
                        <div className={cx("header__end--search")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--search-y")}>
                            <span>Tìm kiếm đoạn chat</span>
                        </div>
                    </div>

                    <div className={cx("header__end--image-x")}>
                        <div className={cx("header__end--image")}>
                            <button>
                                <i className={cx("far", "fa-frown")}></i>
                            </button>
                        </div>
                        <div className={cx("header__end--image-y")}>
                            <span>Ảnh</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content")}>
                <button className={cx("application")}>
                    <div className={cx("icon")}>
                        <i className={cx("far", "fa-frown")}></i>
                    </div>
                    <span className={cx("text")}>Ứng dụng</span>
                </button>
                <button
                    onClick={() => setOpenProject(!openproject)}
                    onMouseEnter={() => setProject(true)}
                    onMouseLeave={() => setProject(false)}
                    className={cx("item")}
                >
                    <div>Dự án</div>
                    {project && (
                        <div>
                            <i className={cx("far", "fa-frown")}></i>
                        </div>
                    )}
                </button>
                {openproject && (
                    <button className={cx("items")}>Dự án mới</button>
                )}
                {openproject &&
                    listProject.map((value, index) => (
                        <button className={cx("items")} key={index}>
                            {value}
                        </button>
                    ))}
                <button
                    onClick={() => setOpenGroup(!opengroup)}
                    onMouseEnter={() => setGroup(true)}
                    onMouseLeave={() => setGroup(false)}
                    className={cx("item")}
                >
                    <div>Đoạn chat nhóm</div>
                    {group && (
                        <div>
                            <i className={cx("far", "fa-frown")}></i>
                        </div>
                    )}
                </button>
                {opengroup &&
                    listGroup.map((value, index) => (
                        <button className={cx("items")} key={index}>
                            {value}
                        </button>
                    ))}
                <button
                    onClick={() => setOpenChat(!openchat)}
                    onMouseEnter={() => setChat(true)}
                    onMouseLeave={() => setChat(false)}
                    className={cx("item")}
                >
                    <div>Các đoạn chat của bạn</div>
                    {chat && (
                        <div>
                            <i className={cx("far", "fa-frown")}></i>
                        </div>
                    )}
                </button>
                {openchat &&
                    listChat.map((value, index) => (
                        <button className={cx("items")} key={index}>
                            {value}
                        </button>
                    ))}
            </div>
            <div className={cx("footer")}>
                <div className={cx("footer__end")}>
                    <div
                        onClick={() =>
                            setState(
                                "SET_DROPDOWN",
                                "logout",
                                !state.dropdown["logout"]
                            )
                        }
                        className={cx("footer__end--profile")}
                    >
                        <button>
                            <i className={cx("far", "fa-frown")}></i>
                        </button>
                    </div>
                </div>
                <div className={cx("footer__end-profile-y")}>
                    <span>IchigoMazone</span>
                    <span className={cx("option")}>Free</span>
                </div>
            </div>
        </div>
    );
}
