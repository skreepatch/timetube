import { RECEIVE_TIMETUBE, receiveTimetube, REQUEST_TIMETUBE, requestTimetube } from "./timetubes.actions";

describe('Timetubes action creators', () => {

	describe('receiveTimetube', () => {

		it('should create action of type RECEIVE_TIMETUBE', () => {
			const payload = {id: "123", update: {videos: {}}};
			expect(receiveTimetube(payload).type).toBe(RECEIVE_TIMETUBE);
			expect(receiveTimetube(payload).payload).toBe(payload);
		});
	});
	describe('requestTimetube', () => {

		it('shoud create action of type REQUEST_TIMETUBE', () => {
			const id = "id";
			expect(requestTimetube(id).type).toBe(REQUEST_TIMETUBE);
			expect(requestTimetube(id).payload.id).toBe(id);
		});
	})
});