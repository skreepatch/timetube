export const selected = (state) => {
    return state.timetubes[state.selectedTimetube] || {};
};

export const paging = (state) => {
    return selected(state).paging;
};

export const videos = (state) => {
    return selected(state).videos;
};