import { combineReducers } from 'redux';
import { me } from './me';
import { friends } from './friends';
import { timetubes } from './timetube/timetube';
import { query } from './query';
import { ui } from './ui';
import { selectedTimetube } from './selectedTimetube';
import { player } from './player';

export const rootReducer = combineReducers({
    me,
    friends,
    active: selectedTimetube,
    timetubes,
    query,
    player,
    ui
});