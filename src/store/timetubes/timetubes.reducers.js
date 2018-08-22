import { RECEIVE_TIMETUBE, REQUEST_TIMETUBE } from "../../constants/action-types";

const initialItemState = {
    videos: {},
    paging: {},
    fetching: false,
    discoveredUntil: null,
    drained: false
};

export const timetubes = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TIMETUBE:
            return {
                ...state,
                [action.payload.id]: {
                    ...(state[action.payload.id] || initialItemState),
                    fetching: true
                }
            };
        case RECEIVE_TIMETUBE:
            const currentTimetube = state[action.payload.id] || initialItemState;
            const { data, paging } = action.payload.update;
            const videos = [...data].reduce((acc, video) => {
                acc[video.videoId] = video;
                return acc;
            }, currentTimetube.videos);
            const discoveredUntil = Object.keys(videos).length ? Object.values(videos).slice(-1)[0].created_time : currentTimetube.discoveredUntil;
            const drained = currentTimetube.drained || !paging;

            return {
                ...state,
                [action.payload.id]: {
                    ...currentTimetube,
                    fetching: false,
                    discoveredUntil,
                    videos,
                    paging,
                    drained
                }
            };
        default:
            return state;
    }
};