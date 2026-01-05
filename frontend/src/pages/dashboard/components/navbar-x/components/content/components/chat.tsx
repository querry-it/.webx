import { useEditor } from "../../../../../../../state/useEditor";
import styles from "./../../../navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Chat() {
    const { state, dispatch } = useEditor();

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number | null
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    return (
        <>
            <button
                onClick={() =>
                    setState(
                        "SET_NAVBAR_X",
                        "open_chat",
                        !state.navbar_x.open_chat
                    )
                }
                onMouseEnter={() => setState("SET_NAVBAR_X", "chat", true)}
                onMouseLeave={() => setState("SET_NAVBAR_X", "chat", false)}
                className={cx("item")}
            >
                <div>Các đoạn chat của bạn</div>
                {state.navbar_x.chat &&
                    (state.navbar_x.open_chat ? (
                        <div>
                            <i className={cx("fas", "fa-chevron-down")}></i>
                        </div>
                    ) : (
                        <div>
                            <i className={cx("fas", "fa-chevron-right")}></i>
                        </div>
                    ))}
            </button>
            {state.navbar_x.open_chat &&
                state.navbar_x.list
                    .find((item) => item.type === "chat")
                    ?.items.map((value, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                dispatch({
                                    type: "SET_NAVBAR_X",
                                    payload: {
                                        active: {
                                            type: "chat",
                                            value: index,
                                        },
                                    },
                                });
                                console.log(`chat: ${value}`);
                            }}
                            className={cx("items", {
                                hoverX:
                                    state.navbar_x.hover.type === "chat" &&
                                    state.navbar_x.hover.value === index,
                                active:
                                    state.navbar_x.active.type === "chat" &&
                                    state.navbar_x.active.value === index,
                            })}
                            onMouseEnter={() =>
                                setState("SET_NAVBAR_X", "index_chat", index)
                            }
                            onMouseLeave={() =>
                                setState("SET_NAVBAR_X", "index_chat", null)
                            }
                        >
                            <span>{value}</span>
                            {state.navbar_x.index_chat === index && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(`Setup chat: ${value}`);
                                    }}
                                    onMouseEnter={() =>
                                        dispatch({
                                            type: "SET_NAVBAR_X",
                                            payload: {
                                                hover: {
                                                    type: "chat",
                                                    value: index,
                                                },
                                            },
                                        })
                                    }
                                    onMouseLeave={() =>
                                        dispatch({
                                            type: "SET_NAVBAR_X",
                                            payload: {
                                                hover: {
                                                    type: "chat",
                                                    value: index,
                                                },
                                            },
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-ellipsis"></i>
                                </span>
                            )}
                        </div>
                    ))}
        </>
    );
}
