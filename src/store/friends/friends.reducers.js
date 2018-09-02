import { REQUEST_FRIENDS, RECEIVE_FRIENDS } from "./friends.actions";

//TODO: the data key is not helping describing the data structure, maybe friends?
export const initialFriendsState = { data: [], paging: {}, fetching: false };

export const friends = (state = initialFriendsState, action) => {
	switch (action.type) {
		case REQUEST_FRIENDS:
			debugger;
			return {
				...state,
				fetching: true
			};
		case RECEIVE_FRIENDS:
			const { data, paging } = action.payload;

			return {
				...state,
				data: [...state.data, ...data],
				paging,
				fetching: false
			};
		default:
			return state;
	}
};