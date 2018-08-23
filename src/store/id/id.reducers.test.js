import { id } from "./id.reducers";
import { setId } from "./id.actions";

describe('id reducers', () => {
   describe('id', () => {
      it('should update the id return new state', () => {
          const newId = 'id';
          const action = setId(newId);
          const state = null;
          expect(id(state, action)).not.toEqual(state);
          expect(id(state, action)).toBe(newId);
      });
   });
});