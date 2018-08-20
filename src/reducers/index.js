import { combineReducers } from 'redux';
import me from './me';
import friends from './friends';
import timetubes from './timetube/timetube';
import query from './query';
import ui from './ui';
import active from './active';
import player from './player';

const rootReducer = combineReducers({
    me,
    friends,
    active,
    timetubes,
    query,
    player,
    ui
});

export default rootReducer;