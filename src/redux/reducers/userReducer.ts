import { UserActionType } from "../actionTypes/userActionTypes";
import Cookies from "js-cookie";

export interface UserState {
  user: null | {};
}

const initialState: UserState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const UserReducer = (state = initialState, action: any): UserState => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case UserActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
