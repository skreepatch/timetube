//TODO: I think that I would rather have an object that has a key id so the code will be similar to other reducers. But it is sure debatable
import {SET_ID} from "./id.actions";

export const id = (state = "", action) => {
    switch (action.type) {
        case SET_ID:
            return action.payload;
        default:
            return state;
    }
};