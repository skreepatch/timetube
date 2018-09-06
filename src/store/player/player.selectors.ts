import { IRootState } from "../rootReducer";

export const getPlayer = (state: Partial<IRootState>) => {
    return state.player;
};

export const getPlaying = (state: Partial<IRootState>) => {
    return getPlayer(state).playing;
};