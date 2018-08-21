import { store } from '../store/index';
import { api } from '../utils/api';
import { GET } from '../utils/get';
import {
    UPDATE_ME,
    UPDATE_SEARCH,
    UPDATE_FRIENDS,
    ADD_TIMETUBE,
    RECEIVE_TIMETUBE,
    LOGGED_IN_OUT,
    SET_LOADING,
    SET_SELECETED_TIMETUBE,
    UPDATE_PLAYING,
    UPDATE_VOLUME,
    UPDATE_UI,
    REQUEST_TIMETUBE
} from '../constants/action-types';

export const updateMe = (partialState) => ({
    type: UPDATE_ME,
    payload: partialState
});

export const updateFriends = (edgeResponse) => ({
    type: UPDATE_FRIENDS,
    payload: edgeResponse
});

export const updateSearch = (update) => ({
    type: UPDATE_SEARCH,
    payload: update
});

export const addTimetube = (timetube) => ({
    type: ADD_TIMETUBE,
    payload: timetube
});
export const receiveTimetube = (partialTimetube) => ({
    type: RECEIVE_TIMETUBE,
    payload: partialTimetube
});
export const loggedInOut = (flag) => ({
    type: LOGGED_IN_OUT,
    payload: flag
});

export const setLoading = (flag) => ({
    type: SET_LOADING,
    payload: flag
});

export const requestTimetube = (id) => ({
    type: REQUEST_TIMETUBE,
    payload: { id }
});

export const setSelectedTimetube = (id) => ({
    type: SET_SELECETED_TIMETUBE,
    payload: id
});


export const updatePlaying = (videoId) => ({
    type: UPDATE_PLAYING,
    payload: videoId
});


export const updateVolume = (volume) => ({
    type: UPDATE_VOLUME,
    payload: volume
});

export const updateUi = ({ key, value }) => ({
    type: UPDATE_UI,
    payload: { key, value }
});


export const setError = (error) => ({
    type: UPDATE_UI,
    payload: error
});

/* Async action constructors */
export const fetchVideos = (timetubeID, accessToken) => {
    const timetube = store.getState().timetubes[timetubeID] || {};
    const next = GET(timetube, 'paging.next');
    const isDrained = timetube.drained;
    return (dispatch) => {
        dispatch(requestTimetube(timetubeID));

        const updateHandler = (update) => {
            dispatch(receiveTimetube({ update, id: timetubeID }));
        }

        if (next && accessToken && !isDrained) {
            return api.next(next, accessToken).then(updateHandler);
        }

        return api.videos(timetubeID).then(updateHandler);
    }
}