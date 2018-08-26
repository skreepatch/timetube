import { combineReducers } from 'redux';
import { me } from './me/me.reducers';
import { friends } from './friends/friends.reducers';
import { timetubes } from './timetubes/timetubes.reducers';
import { query } from './query/query.reducers';
import { ui } from './ui/ui.reducers';
import { id } from './id/id.reducers';
import { player } from './player/player.reducers';

export const rootReducer = combineReducers({
    //TODO: IMO user is much clearer than me
    me,
    friends,
    id,
    timetubes,
    query,
    player,
    ui
});