export const UPDATE_FRIENDS = "UPDATE_FRIENDS";

export const updateFriends = (edgeResponse) => ({
    type: UPDATE_FRIENDS,
    payload: edgeResponse
});