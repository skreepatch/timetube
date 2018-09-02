import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { DisconnectedToolbar } from './Toolbar';
import { store } from "../../store";
import { receiveTimetube } from "../../store/timetubes/timetubes.actions";


Enzyme.configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
	it('should render the Toolbar component', () => {
		const wrapper = shallow(<DisconnectedToolbar />);
		expect(wrapper.find('.icon-search').exists()).toBe(true);
		expect(wrapper.find('.icon-history').exists()).toBe(true);
		expect(wrapper.find('.icon-users').exists()).toBe(true);
	});

	it('should render the Discovered-date', () => {
		const timetube = {
			discoveredUntil: 112233445566,
			data: [],
			paging: {}
		};
		const wrapper = shallow(<DisconnectedToolbar timetube={timetube} />);
		expect(wrapper.find('.Discovered-date').exists()).toBe(true);
	});
});