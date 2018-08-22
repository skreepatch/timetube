import {UPDATE_QUERY} from "../../constants/action-types";

export const updateQuery = (update) => ({
    type: UPDATE_QUERY,
    payload: update
});
