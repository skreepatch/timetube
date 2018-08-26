import { UPDATE_FRIENDS } from "../../constants/action-types";

//TODO: the data key is not helping describing the data structure, maybe friends?
const initialState = { data: [], paging: {} };
export const friends = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FRIENDS:
            const { data, paging } = action.payload;

            return {
                ...state,
                data: [...state.data, ...data],
                paging
            };
        default:
            return state;
    }

};