export interface InformationState {
    username: string;
}

export interface SidebarState {
    open: boolean;
}

export interface UtilState {
    active: boolean,
    loading: boolean;
    hover: boolean;
    error: string;
    index: number | null;
    open: boolean;
}

export interface DropdownState {
    logout: boolean;
}

export interface TooltipState {
    logo: boolean;
    add: boolean;
    search: boolean;
    image: boolean;
    spackle: boolean;
    logout: boolean;
}

export interface ModalState {
    profile: boolean;
    update: boolean;
    person: boolean;
    setup: boolean;
    help: boolean;
    logout: boolean;
}

export interface EditorState {
    information: InformationState;
    sidebar: SidebarState;
    util: UtilState;
    dropdown: DropdownState;
    tooltip: TooltipState;
    modal: ModalState;
}
