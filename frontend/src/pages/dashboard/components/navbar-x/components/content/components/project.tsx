import { useRef, useState } from "react";
import { useEditor } from "../../../../../../../state/useEditor";
import styles from "./../../../navbar-x.module.css";
import classNames from "classnames/bind";
import { useFloating, offset, flip, shift, autoUpdate, useClick, useDismiss, useRole, useInteractions } from "@floating-ui/react";
import { createPortal } from "react-dom";

const cx = classNames.bind(styles);

export default function Project() {
    const { state, dispatch } = useEditor();
    const [indexX, setIndex] = useState<null | number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const countRef = useRef<number>(0);

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
        middleware: [offset(6), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
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
                        "open_project",
                        !state.navbar_x.open_project
                    )
                }
                onMouseEnter={() => setState("SET_NAVBAR_X", "project", true)}
                onMouseLeave={() => setState("SET_NAVBAR_X", "project", false)}
                className={cx("item")}
            >
                <div ref={refs.setReference} {...getReferenceProps()}>
                    Dự án
                </div>
                {state.navbar_x.project &&
                    (state.navbar_x.open_project ? (
                        <div>
                            <i className={cx("fas", "fa-chevron-down")}></i>
                        </div>
                    ) : (
                        <div>
                            <i className={cx("fas", "fa-chevron-right")}></i>
                        </div>
                    ))}
            </button>
            {state.navbar_x.open_project && (
                <button
                    onClick={() => setState("SET_MODAL", "project", true)}
                    className={cx("items")}
                >
                    Dự án mới
                </button>
            )}
            {state.navbar_x.open_project &&
                state.navbar_x.list
                    .find((item) => item.type === "project")
                    ?.items.map((value, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                dispatch({
                                    type: "SET_NAVBAR_X",
                                    payload: {
                                        active: {
                                            type: "project",
                                            value: index,
                                        },
                                    },
                                });
                                console.log(`project: ${value}`);
                            }}
                            className={cx("items", {
                                hoverX:
                                    state.navbar_x.hover.type === "project" &&
                                    state.navbar_x.hover.value === index,
                                active:
                                    state.navbar_x.active.type === "project" &&
                                    state.navbar_x.active.value === index,
                            })}
                            onMouseEnter={() =>
                                setState("SET_NAVBAR_X", "index_project", index)
                            }
                            onMouseLeave={() =>
                                setState("SET_NAVBAR_X", "index_project", null)
                            }
                        >
                            <span>{value}</span>
                            {state.navbar_x.index_project === index && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(`Setup project: ${value}`);
                                    }}
                                    onMouseEnter={() =>
                                        dispatch({
                                            type: "SET_NAVBAR_X",
                                            payload: {
                                                hover: {
                                                    type: "project",
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




