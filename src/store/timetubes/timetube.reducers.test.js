import {timetubes, timetube} from "./timetubes.reducers";
import {requestTimetube, receiveTimetube} from "./timetubes.actions";
import {getUndefined} from "../../utils/test";
import {updateUi} from "../ui/ui.actions";

describe('timetubes reducer', () => {
    it('should return the same state in case of irrelevant action', () => {
        const action = updateUi({key: 'search', value: true});
        const state = {
            timetubes: "current state segment"
        };
        expect(timetubes(state, action)).toBe(state);
    });

    it('should set fetching to true when action is REQUEST_TIMETUBE', () => {
        const id = 'id';
        const action = requestTimetube(id);
        const state = {};
        expect(timetubes(state, action)[id].fetching).toBe(true);
    });

    it('should set fetching to false when action is RECEIVE_TIMETUBE', () => {
        const id = 'id';
        const action = receiveTimetube({
            id: id,
            update: {
                data: [],
                paging: {}
            }
        });
        const state = getUndefined();
        expect(timetubes(state, action)[id].fetching).toBe(false);
    });
});