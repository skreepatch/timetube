export const getPlayer = (state) => {
    return state.player;
};

export const getPlaying = (state) => {
    return getPlayer(state).playing;
};