import { IFbEdge, IFbUser } from "../../providers/facebook/facebook.interfaces";
import { IAction } from "../state.interfaces";
import { RECEIVE_FRIENDS, REQUEST_FRIENDS } from "./friends.actions";

export interface IFriendsState extends IFbEdge<IFbUser[]> {
	fetching: boolean
}

export const initialFriendsState: IFriendsState = {
	data: [],
	fetching: false,
	paging: {}
};

export const friends = (state = initialFriendsState, action: IAction) => {
	switch (action.type) {
		case REQUEST_FRIENDS:
			return {
				...state,
				fetching: true
			};
		case RECEIVE_FRIENDS:
			const { data, paging } = action.payload;

			return {
				...state,
				data: [...state.data, ...data],
				fetching: false,
				paging
			};
		default:
			return state;
	}
};