import { SET_SELECETED_TIMETUBE } from '../constants/action-types';

export const selectedTimetube = (state = "", action) => {
    switch (action.type) {
        case SET_SELECETED_TIMETUBE:
            return action.payload;
        default:
            return state;
    }
};