import { UPDATE_UI } from "../../constants/action-types";

const initialState =  {
    error: "",
    loading: false,
    friends: {
        open: false,
        fetching: false
    },
    search: {
        open: false,
    },
    player: {
        open: false
    }
};

export const ui = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_UI:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        default:
            return state;

    }
};