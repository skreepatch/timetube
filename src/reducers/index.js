import { combineReducers } from 'redux';
import { me } from './me/me';
import { friends } from './friends/friends';
import { timetubes } from './timetube/timetube.reducers';
import { query } from './query/query';
import { ui } from './ui/ui';
import { selectedTimetube } from './selectedTimetube/selectedTimetube';
import { player } from './player/player';

export const rootReducer = combineReducers({
    me,
    friends,
    selectedTimetube,
    timetubes,
    query,
    player,
    ui
});