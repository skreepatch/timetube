import { UPDATE_ME, LOGGED_IN_OUT } from "../../constants/action-types";

const initialState = {
    isLoggedIn: false
};

export const me = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ME:
            return { ...state, ...action.payload };
        case LOGGED_IN_OUT:
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }

};