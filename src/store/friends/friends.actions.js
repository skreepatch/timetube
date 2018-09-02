import { fetchEdge } from "../../providers/facebook/edges";

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";

export const REQUEST_FRIENDS = "REQUEST_FRIENDS";

export const requestFriends = (id) => ({
	type: REQUEST_FRIENDS,
	payload: id
});

export const receiveFriends = (edgeResponse) => ({
	type: RECEIVE_FRIENDS,
	payload: edgeResponse
});

/* Async action creators */
export const fetchFriends = (id, accessToken) => {
	return (dispatch) => {
		dispatch(requestFriends(id));

		return fetchEdge(id, 'friends')
			.then((friends) => {
				dispatch(receiveFriends(friends))
			});
	}
};