import {
    UPDATE_ME,
    UPDATE_SEARCH,
    UPDATE_FRIENDS,
    LOGGED_IN_OUT,
    UPDATE_PLAYING,
    UPDATE_VOLUME,
    UPDATE_UI
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

export const loggedInOut = (flag) => ({
    type: LOGGED_IN_OUT,
    payload: flag
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
