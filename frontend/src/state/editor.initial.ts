import type { EditorState } from "./editor.types";

export const initialEditorState: EditorState = {
    information: {
        username: "",
    },
    util: {
        active: false,
        loading: false,
        hover: false,
        error: "",
    },
    dropdown: {
        logout: false,
    },
    tooltip: {
        logo: false,
        add: false,
        search: false,
        image: false,
        spackle: false,
        logout: false,
    },
    modal: {
        profile: false,
        update: false,
        person: false,
        setup: false,
        help: false,
        logout: false,
    },
};
