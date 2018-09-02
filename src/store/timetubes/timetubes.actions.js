import { store } from "../index";
import { GET } from "../../utils/get";
import { getNext, getYoutubesFromPosts } from "../../providers/facebook/api";
import { getTimetubes } from "./timetubes.selectors";

export const REQUEST_TIMETUBE = "REQUEST_TIMETUBE";

export const RECEIVE_TIMETUBE = "RECEIVE_TIMETUBE";

export const receiveTimetube = (partialTimetube) => ({
	type: RECEIVE_TIMETUBE,
	payload: partialTimetube
});

export const requestTimetube = (id) => ({
	type: REQUEST_TIMETUBE,
	payload: { id }
});


const recieiveTimetubeDispatcher = (update, id) => {
	store.dispatch(receiveTimetube({ update, id }));
};

/* Async action creators */
export const fetchVideos = (timetubeID, accessToken) => {
	//TODO: I do not know if agree with you that you get from the store
	const state = store.getState();
	const timetube = getTimetubes(state)[timetubeID] || {};
	const next = GET(timetube, 'paging.next');
	const isDrained = timetube.drained;
	return (dispatch) => {
		dispatch(requestTimetube(timetubeID));

		if (next && accessToken && !isDrained) {
			return getNext(next, accessToken)
				.then((update) => recieiveTimetubeDispatcher(update, timetubeID));
		}

		return getYoutubesFromPosts(timetubeID)
			.then((update) => recieiveTimetubeDispatcher(update, timetubeID));
	}
};