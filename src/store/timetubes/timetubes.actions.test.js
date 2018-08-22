import {RECEIVE_TIMETUBE, REQUEST_TIMETUBE} from "../../constants/action-types";
import {receiveTimetube, requestTimetube} from "./timetubes.actions";

describe('Timetubes action creators', () => {
   describe('receiveTimetube', () => {
      it('should create action of type RECEIVE_TIMETUBE', () => {
         const payload = "payload";
         const type = RECEIVE_TIMETUBE;
         expect(receiveTimetube(payload).type).toBe(type);
         expect(receiveTimetube(payload).payload).toBe(payload);
      });
   });
   describe('requestTimetube', () => {
       it('shoud create action of type REQUEST_TIMETUBE', () => {
           const type = REQUEST_TIMETUBE;
           const id = "id";
           expect(requestTimetube(id).type).toBe(REQUEST_TIMETUBE);
           expect(requestTimetube(id).payload.id).toBe(id);
       });
   })
});