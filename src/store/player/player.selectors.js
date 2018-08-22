export const player = (state) => {
    return state.player;
};

export const playing = (state) => {
    return player(state).playing;
};