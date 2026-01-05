import { useEditor } from "../../../../../../../state/useEditor";
import styles from "./../../../navbar-x.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Group() {
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
                        "open_group",
                        !state.navbar_x.open_group
                    )
                }
                onMouseEnter={() => setState("SET_NAVBAR_X", "group", true)}
                onMouseLeave={() => setState("SET_NAVBAR_X", "group", false)}
                className={cx("item")}
            >
                <div>Đoạn chat nhóm</div>
                {state.navbar_x.group &&
                    (state.navbar_x.open_group ? (
                        <div>
                            <i className={cx("fas", "fa-chevron-down")}></i>
                        </div>
                    ) : (
                        <div>
                            <i className={cx("fas", "fa-chevron-right")}></i>
                        </div>
                    ))}
            </button>
            {state.navbar_x.open_group &&
                state.navbar_x.list
                    .find((item) => item.type === "group")
                    ?.items.map((value, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                dispatch({
                                    type: "SET_NAVBAR_X",
                                    payload: {
                                        active: {
                                            type: "group",
                                            value: index,
                                        },
                                    },
                                });
                                console.log(`group: ${value}`);
                            }}
                            className={cx("items", {
                                hoverX:
                                    state.navbar_x.hover.type === "group" &&
                                    state.navbar_x.hover.value === index,
                                active:
                                    state.navbar_x.active.type === "group" &&
                                    state.navbar_x.active.value === index,
                            })}
                            onMouseEnter={() =>
                                setState("SET_NAVBAR_X", "index_group", index)
                            }
                            onMouseLeave={() =>
                                setState("SET_NAVBAR_X", "index_group", null)
                            }
                        >
                            <span>{value}</span>
                            {state.navbar_x.index_group === index && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(`Setup group: ${value}`);
                                    }}
                                    onMouseEnter={() =>
                                        dispatch({
                                            type: "SET_NAVBAR_X",
                                            payload: {
                                                hover: {
                                                    type: "group",
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
                                                    type: null,
                                                    value: null,
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
