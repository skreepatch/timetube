import { UPDATE_SEARCH } from "../../constants/action-types";

const initialState = {
    searchTerm: "",
    hashtags: []
};

export const query = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH:
            return { ...state, ...action.payload };
        default:
            return state;
    }

};