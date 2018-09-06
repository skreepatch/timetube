import { getId } from "../id/id.selectors";
import { getMe } from "../me/me.selectors";
import { IRootState } from "../rootReducer";

export const getTimetubes = (state: Partial<IRootState>) => {
	return state.timetubes;
};

export const getSelected = (state: Partial<IRootState>) => {
	return getTimetubes(state)[getId(state)];
};

export const getSelectedTimetubePaging = (state: Partial<IRootState>) => {
	return getSelected(state).paging;
};

export const getSelectedTimetubeVideos = (state: Partial<IRootState>) => {
	return getSelected(state).videos;
};

export const getMyTimetube = (state: Partial<IRootState>) => {
	return getTimetubes(state)[getMe(state).id];
};