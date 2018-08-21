import {RECEIVE_TIMETUBE, REQUEST_TIMETUBE, SET_SELECETED_TIMETUBE} from "../../constants/action-types";
import {store} from "../../store";
import {GET} from "../../utils/get";
import {api} from "../../utils/api";

export const receiveTimetube = (partialTimetube) => ({
    type: RECEIVE_TIMETUBE,
    payload: partialTimetube
});

export const requestTimetube = (id) => ({
    type: REQUEST_TIMETUBE,
    payload: { id }
});

export const setSelectedTimetube = (id) => ({
    type: SET_SELECETED_TIMETUBE,
    payload: id
});


/* Async action constructors */
export const fetchVideos = (timetubeID, accessToken) => {
    debugger;
    const timetube = store.getState().timetubes[timetubeID] || {};
    const next = GET(timetube, 'paging.next');
    const isDrained = timetube.drained;
    return (dispatch) => {
        dispatch(requestTimetube(timetubeID));

        const updateHandler = (update) => {
            dispatch(receiveTimetube({ update, id: timetubeID }));
        };

        if (next && accessToken && !isDrained) {
            return api.next(next, accessToken).then(updateHandler);
        }

        return api.videos(timetubeID).then(updateHandler);
    }
}