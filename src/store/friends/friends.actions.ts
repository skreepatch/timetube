import { Dispatch } from "redux";
import { fetchEdge } from "../../providers/facebook/edges";
import { IFbEdge, IFbUser } from "../../providers/facebook/facebook.interfaces";
import { UserId } from "../id/id.reducers";
import { IAction } from "../state.interfaces";
import { ThunkResult } from "../store.types";

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";

export const REQUEST_FRIENDS = "REQUEST_FRIENDS";

export const requestFriends = (id: UserId):IAction => ({
	payload: id,
	type: REQUEST_FRIENDS
});

export const receiveFriends = (edgeResponse: Partial<IFbEdge<IFbUser>>):IAction => ({
	payload: edgeResponse,
	type: RECEIVE_FRIENDS
});

/* Async action creators */
export const fetchFriends = (id: UserId, accessToken?: string): ThunkResult<void> => {
	return (dispatch: Dispatch): Promise<any> => {
		dispatch(requestFriends(id));

		return fetchEdge(id, 'friends')
			.then((friends) => {
				dispatch(receiveFriends(friends))
			});
	}
};