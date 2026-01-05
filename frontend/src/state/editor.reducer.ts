import type { EditorState } from "./editor.types";
import type { EditorAction } from "./editor.actions";

export function editorReducer(
    state: EditorState,
    action: EditorAction
): EditorState {
    switch (action.type) {
        case "SET_INFORMATION":
            return {
                ...state,
                information: {
                    ...state.information,
                    ...action.payload,
                },
            };

        case "SET_UTIL":
            return {
                ...state,
                util: {
                    ...state.util,
                    ...action.payload,
                },
            };

        case "SET_DROPDOWN":
            return {
                ...state,
                dropdown: {
                    ...state.dropdown,
                    ...action.payload,
                },
            };

        case "SET_TOOLTIP":
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    ...action.payload,
                },
            };

        case "SET_MODAL":
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload,
                },
            };

        case "SET_NAVBAR_X":
            return {
                ...state,
                navbar_x: {
                    ...state.navbar_x,
                    ...action.payload,
                }
            }

        default:
            return state;
    }
}
