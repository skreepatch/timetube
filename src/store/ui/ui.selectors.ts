import { IRootState } from "../rootReducer";

export const getUI = (state: Partial<IRootState>) => {
  return state.ui;
};

export const getLoading = (state: Partial<IRootState>) => {
    return getUI(state).loading;
};

export const getError = (state: Partial<IRootState>) => {
    return getUI(state).error;
};

export const getFriendsUi = (state: Partial<IRootState>) => {
    return getUI(state).friends;
};

export const getFriendsOpen = (state: Partial<IRootState>) => {
  return getFriendsUi(state).open;
};

export const getSearch = (state: Partial<IRootState>) => {
  return getUI(state).search;
};

export const getSearchOpen = (state: Partial<IRootState>) => {
    return getSearch(state).open;
};

export const getPlayer = (state: Partial<IRootState>) => {
    return getUI(state).player;
};

export const getPlayerOpen = (state: Partial<IRootState>) => {
    return getPlayer(state).open;
};

export const getPlayerReady = (state: Partial<IRootState>) => {
    return getPlayer(state).ready;
};