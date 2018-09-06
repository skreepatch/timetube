import { ActionCreator, Dispatch } from "redux";
import { getNext, getYoutubesFromPosts } from "../../providers/facebook/api";
import { IFbEdge, IFbPost } from "../../providers/facebook/facebook.interfaces";
import { GET } from "../../utils/get";
import { UserId } from "../id/id.reducers";
import { store } from "../index";
import { IAction } from "../state.interfaces";
import { ThunkResult } from "../store.types";
import { ITimetube } from "./timetubes.reducers";
import { getTimetubes } from "./timetubes.selectors";

export const REQUEST_TIMETUBE = "REQUEST_TIMETUBE";

export const RECEIVE_TIMETUBE = "RECEIVE_TIMETUBE";

export const receiveTimetube = (
	payload: { id: UserId, update: any }
) => ({
	payload,
	type: RECEIVE_TIMETUBE
});

export const requestTimetube: ActionCreator<IAction> = (id: UserId) => ({
	payload: { id },
	type: REQUEST_TIMETUBE
});

const recieiveTimetubeDispatcher = (update: Partial<ITimetube>, id: UserId) => {
	store.dispatch(receiveTimetube({ update, id }));
};

/* Async action creators */
export const fetchVideos: ActionCreator<ThunkResult<void>> = (timetubeID: UserId, accessToken: string) => {
	const state = store.getState();
	const timetube = getTimetubes(state)[timetubeID] || {};
	const next = GET(timetube, 'paging.next');
	const isDrained = timetube.drained;
	return (dispatch: Dispatch) => {
		dispatch(requestTimetube(timetubeID));

		if (next && accessToken && !isDrained) {
			return getNext(next, accessToken)
				.then((update) => recieiveTimetubeDispatcher(update, timetubeID));
		}

		return getYoutubesFromPosts(timetubeID)
			.then((update: IFbEdge<IFbPost[]>) => recieiveTimetubeDispatcher(update, timetubeID));
	}
};