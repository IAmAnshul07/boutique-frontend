import { LayoutActionType } from "../actionTypes/layoutActionTypes";

export interface LayoutState {
  isSidebarOpen: boolean;
}

const initialState: LayoutState = {
  isSidebarOpen: true,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const LayoutReducer = (state = initialState, action: any): LayoutState => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case LayoutActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    default:
      return state;
  }
};

export default LayoutReducer;
