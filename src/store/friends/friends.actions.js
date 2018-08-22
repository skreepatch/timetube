import { UPDATE_FRIENDS } from "../../constants/action-types";

export const updateFriends = (edgeResponse) => ({
    type: UPDATE_FRIENDS,
    payload: edgeResponse
});