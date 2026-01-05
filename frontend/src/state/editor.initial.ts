import type { EditorState } from "./editor.types";

export const initialEditorState: EditorState = {
    information: {
        username: "",
    },
    sidebar: {
        open: false,
    },
    navbar_x: {
        active: { type: null, value: null },
        hover: { type: null, value: null },
        project: false,
        group: false,
        chat: false,
        open_project: false,
        open_group: false,
        open_chat: false,
        index_project: null,
        index_group: null,
        index_chat: null,
        list: [
            {
                type: "project",
                items: [
                    "Học tập",
                    "Giải trí",
                    "Chơi game",
                    "Ôn thi",
                    "Báo cáo",
                    "May rủi",
                    "Sức khỏe",
                ],
            },
            {
                type: "group",
                items: [
                    "Xem phim",
                    "Đọc truyện",
                    "Bắn súng",
                    "Thi đấu",
                    "Đá bóng",
                    "Cờ vua",
                ],
            },
            {
                type: "chat",
                items: [
                    "Python",
                    "JavaScript",
                    "Dart",
                    "Java",
                    "C#",
                    "Golang",
                    "Rust",
                    "C++",
                ],
            },
        ],
    },
    util: {
        active: false,
        loading: false,
        hover: false,
        error: "",
        index: null,
        open: false,
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
        project: false,
    },
};
