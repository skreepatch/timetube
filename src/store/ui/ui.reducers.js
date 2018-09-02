import {UPDATE_UI} from "./ui.actions";

const initialState =  {
    error: "",
    loading: true,
    friends: {
        open: false
    },
    search: {
        open: false,
    },
    player: {
        ready: false,
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