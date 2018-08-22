import { SET_ID } from '../../constants/action-types';

export const id = (state = "", action) => {
    switch (action.type) {
        case SET_ID:
            return action.payload;
        default:
            return state;
    }
};