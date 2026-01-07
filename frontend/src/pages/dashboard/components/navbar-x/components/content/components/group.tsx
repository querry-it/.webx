import { useEditor } from "../../../../../../../state/useEditor";
import styles from "./../../../navbar-x.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import {
    useFloating,
    offset,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    hide,
} from "@floating-ui/react";
import { createPortal } from "react-dom";

const cx = classNames.bind(styles);

export default function Group() {
    const { state, dispatch } = useEditor();
    const [open, setOpen] = useState<boolean>(false);
    const [openIndex, setOpenIndex] = useState<null | number>(null);

    const handleToggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
        // setState("SET_NAVBAR_X", "open_index_project", state.navbar_x.open_index_project === index ? null : index)
    };

    const setState = (
        option: string,
        key: string,
        value: boolean | string | number | null
    ) => {
        dispatch({ type: option, payload: { [key]: value } });
    };

    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        strategy: "absolute",
        middleware: [offset(6), hide()],
        whileElementsMounted: undefined,
    });

    const { getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context, { role: "menu" }),
    ]);

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
                            {state.navbar_x.index_group === index &&
                                state.navbar_x.index_group_prev !== index && (
                                    <>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggle(index);
                                                setState(
                                                    "SET_NAVBAR_X",
                                                    "index_group_prev",
                                                    index
                                                );
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
                                        {state.navbar_x.open_index_project === index &&
                                            createPortal(
                                                <div
                                                    ref={refs.setFloating}
                                                    {...getFloatingProps()}
                                                    className={cx(
                                                        "dropdown__items"
                                                    )}
                                                    style={{
                                                        ...floatingStyles,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Dropdown");
                                                        // setState("SET_NAVBAR_X", "open_index_project", null);
                                                    }}
                                                >
                                                    Project
                                                </div>,
                                                document.body
                                            )}
                                    </>
                                )}
                            {state.navbar_x.index_group_prev === index && (
                                <>
                                    <span
                                        ref={refs.setReference}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggle(index);
                                            setState(
                                                "SET_NAVBAR_X",
                                                "index_group_prev",
                                                null
                                            );
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
                                    {state.navbar_x.open_index_project === index &&
                                        createPortal(
                                            <div
                                                ref={refs.setFloating}
                                                {...getFloatingProps()}
                                                className={cx(
                                                    "dropdown__items"
                                                )}
                                                style={{ ...floatingStyles }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log("Dropdown");
                                                }}
                                            >
                                                Project
                                            </div>,
                                            document.body
                                        )}
                                </>
                            )}
                        </div>
                    ))}
        </>
    );
}
