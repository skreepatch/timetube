import {UPDATE_QUERY} from "./query.actions";

const initialState = {
    searchTerm: "",
    hashtags: []
};

export const query = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUERY:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};