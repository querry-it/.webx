export interface InformationState {
  username: string | null;
  userid: string | null;
  fullname: string | null;
  avatar_url: string | null;
  code: string | null;
  token: string | null;
  locationid: string | null;
  lat: number | null;
  lon: number | null;
  point_start: { lat: number; lon: number } | null;
  point_end: { lat: number; lon: number } | null;
}

export interface SidebarState {
  open: boolean;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: string;
  rating_avg: number;
  rating_count: number;
}

export interface NavbarXState {
  location_search: Location | null;
  detail: boolean;
  brand: string;
  image: boolean;
  option: String | null;
  headerXy: boolean;
  introducerX: boolean;
  Xreview: string;
  save: string;
  back: boolean;
  dynamic: boolean;
  activeX: { type: string | null };
  active: {
    type: string | null;
    value: string | null | number;
  };
  hover: {
    type: string | null;
    value: string | null | number;
  };
  project: boolean;
  group: boolean;
  chat: boolean;
  open_project: boolean;
  open_group: boolean;
  open_chat: boolean;
  open_index_project: null | number;
  index_project: null | boolean | number;
  index_project_prev: null | boolean | number;
  index_group: null | boolean | number;
  index_group_prev: null | boolean | number;
  index_chat: null | boolean | number;
  list: {
    type: string | null;
    items: string[];
  };
}

export interface UtilState {
  active: boolean;
  loading: boolean;
  hover: boolean;
  error: string;
  index: number | null;
  open: boolean;
  lockRegister: boolean;
  lockForgot: boolean;
  lockReset: boolean;
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
  project: boolean;
}

export interface PositionState {
  open_project: boolean;
  project: {
    top: number | null;
    left: number | null;
  };
}

export interface EditorState {
  information: InformationState;
  sidebar: SidebarState;
  navbar_x: NavbarXState;
  util: UtilState;
  dropdown: DropdownState;
  tooltip: TooltipState;
  modal: ModalState;
  position: PositionState;
}
