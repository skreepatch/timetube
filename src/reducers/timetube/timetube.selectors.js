export const selected = (state) => {
    return state.timetubes[state.selectedTimetube] || {};
};