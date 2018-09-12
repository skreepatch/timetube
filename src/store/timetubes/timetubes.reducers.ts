import { IFbPaging } from "../../providers/facebook/facebook.interfaces";
import { updateFromLocalStorage } from "../../providers/localStorage/localStorage.provider";
import { arrayFromObject } from "../../utils/array-from-object";
import { ITimetubeVideo } from "../../utils/video";
import { IAction } from "../state.interfaces";
import { RECEIVE_TIMETUBE, REQUEST_TIMETUBE } from "./timetubes.actions";

export interface ITimetube {
	discoveredUntil: string | number;
	drained: boolean;
	fetching: boolean;
	paging: IFbPaging;
	videos: {[key: string]: ITimetubeVideo};
	error?: string;
}

export const initialTimetubeState = {
	discoveredUntil: "",
	drained: false,
	fetching: false,
	paging: {},
	videos: {}
};

export const timetubes = (
	state: { [key: string]: Partial<ITimetube> } = updateFromLocalStorage(),
	action: IAction): { [key: string]: Partial<ITimetube> } => {
	switch (action.type) {
		case REQUEST_TIMETUBE:
			return {
				...state,
				[action.payload.id]: {
					...(state[action.payload.id] || initialTimetubeState),
					fetching: true
				}
			};
		case RECEIVE_TIMETUBE:
			const currentTimetube = state[action.payload.id] || initialTimetubeState;
			const { data, paging } = action.payload.update;
			const videos = [...data].reduce((acc, video) => {
				acc[video.videoId] = video;

				return acc;
			}, currentTimetube.videos);
			const drained = currentTimetube.drained || !paging;
			const discoveredUntil = !drained && Object.keys(videos).length ? arrayFromObject(videos, 'values').slice(-1)[0].created_time : currentTimetube.discoveredUntil;
			return {
				...state,
				[action.payload.id]: {
					...currentTimetube,
					discoveredUntil,
					drained,
					fetching: false,
					paging,
					videos
				}
			};
		default:
			return state;
	}
};