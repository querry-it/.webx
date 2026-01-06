import type {
    InformationState,
    UtilState,
    DropdownState,
    TooltipState,
    ModalState,
    SidebarState,
    NavbarXState,
    PositionState,
} from "./editor.types";

export type EditorAction =
    | { type: "SET_INFORMATION"; payload: Partial<InformationState> }
    | { type: "SET_SIDEBAR"; payload: Partial<SidebarState> }
    | { type: "SET_UTIL"; payload: Partial<UtilState> }
    | { type: "SET_DROPDOWN"; payload: Partial<DropdownState> }
    | { type: "SET_TOOLTIP"; payload: Partial<TooltipState> }
    | { type: "SET_MODAL"; payload: Partial<ModalState> }
    | { type: "SET_NAVBAR_X"; payload: Partial<NavbarXState> }
    | { type: "SET_POSITION"; payload: Partial<PositionState> };
