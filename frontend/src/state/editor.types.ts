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
  class_01: boolean | null;
  class_02: boolean | null;
  class_03: boolean | null;
  class_04: boolean | null;
  class_05: boolean | null;
  marker_01: boolean | null;
  marker_02: boolean | null;
  marker_03: boolean | null;
  marker_04: boolean | null;
  marker_05: boolean | null;
  marker_06: boolean | null;
  marker_07: boolean | null;
  marker_08: boolean | null;
  marker_09: boolean | null;
  marker_10: boolean | null;
  marker_11: boolean | null;
  marker_12: boolean | null;
  travel_01: boolean | null;
  travel_02: boolean | null;
  travel_03: boolean | null;
  travel_04: boolean | null;
  travel_05: boolean | null;
  travel_06: boolean | null;
  travel_07: boolean | null;
  travel_08: boolean | null;
  travel_09: boolean | null;
  travel_10: boolean | null;
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
  point_end: {
    lat: number;
    lon: number;
    locationId: string;
    value: string;
  } | null;
  clear_query: boolean;
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
