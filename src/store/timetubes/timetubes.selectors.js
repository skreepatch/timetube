export const getTimetubes = (state) => {
    return state.timetubes;
};

export const getSelected = (state) => {
    return getTimetubes(state)[state.id];
};

export const getSelectedTimetubePaging = (state) => {
    return getSelected(state).paging;
};

export const getSelectedTimetubeVideos = (state) => {
    return getSelected(state).videos;
};