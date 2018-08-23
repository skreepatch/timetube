import {setId} from "./id.actions";
import {SET_ID} from "../../constants/action-types";

describe('id actions', () => {
   describe('setId', () => {
       it('should create the setId action', () => {
           const state = {};
           const id = 'id';
           expect(setId(id).type).toBe(SET_ID);
           expect(setId(id).payload).toBe(id);
       });
   });
});