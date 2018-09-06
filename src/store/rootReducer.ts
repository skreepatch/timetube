import { combineReducers, Reducer } from 'redux';
import { friends, IFriendsState } from './friends/friends.reducers';
import { id, UserId } from './id/id.reducers';
import { IMeState, me } from './me/me.reducers';
import { player } from './player/player.reducers';
import { query } from './query/query.reducers';
import { timetubes } from './timetubes/timetubes.reducers';
import { ui } from './ui/ui.reducers';

export interface IRootState {
    me: Partial<IMeState>,
    friends: IFriendsState,
    id: UserId,
    timetubes: any,
    query: any,
    player: any,
    ui: any
}

export const rootReducer: Reducer<IRootState> = combineReducers({
	friends,
	id,
	me,
	player,
	query,
	timetubes,
	ui
});