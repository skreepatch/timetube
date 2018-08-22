import { RECEIVE_TIMETUBE, REQUEST_TIMETUBE } from "../../constants/action-types";

const timetube = (state = {
    videos: {},
    paging: {},
    fetching: false,
    discoveredUntil: null,
    drained: false
}, action) => {
    switch (action.type) {
        case REQUEST_TIMETUBE:
            return {
                ...state,
                fetching: true
            };

        case RECEIVE_TIMETUBE:
            const { data, paging } = action.payload.update;
            const videos = [...data].reduce((acc, video) => {
                acc[video.videoId] = video;
                return acc;
            }, state.videos);
            const discoveredUntil = Object.keys(videos).length ? Object.values(videos).slice(-1)[0].created_time : state.discoveredUntil;
            const drained = state.drained || !paging;
            return {
                ...state,
                fetching: false,
                discoveredUntil,
                videos,
                paging,
                drained
            };
        default:
            return state;
    }

};

const localStorage = window.localStorage;

export const timetubes = (state = updateFromLocalStorage(), action) => {
    switch (action.type) {
        case REQUEST_TIMETUBE:
        case RECEIVE_TIMETUBE:
            const current = state[action.payload.id];
            const update = { [action.payload.id]: timetube(current, action) }
            
            const newState = {
                ...state,
                ...update
            };
            
            return newState;
        default:
            return state;
    }
};

export const updateFromLocalStorage = () => {
    if (!localStorage) {
        return {};
    }
    const timetubes = Object.keys(localStorage).reduce( (acc, key) => {
        if (key.indexOf('tt_') === 0) {
            acc[key.replace('tt_', '')] = JSON.parse(localStorage[key]);
        }
        return acc;
    }, {});

    return timetubes;
};

export default timetubes;