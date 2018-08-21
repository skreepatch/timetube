import { SET_ACTIVE } from '../constants/action-types';

export const active = (state = "", action) => {
    switch (action.type) {
        case SET_ACTIVE:
            return action.payload;
        default:
            return state;
    }
};