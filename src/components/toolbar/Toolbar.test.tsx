import * as Enzyme from 'enzyme';
import { shallow } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { DisconnectedToolbar } from './Toolbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
	it('should render the Toolbar component', () => {
		const wrapper = shallow(<DisconnectedToolbar />);
		expect(wrapper.find('.icon-search').exists()).toBe(true);
		expect(wrapper.find('.icon-history').exists()).toBe(true);
		expect(wrapper.find('.icon-users').exists()).toBe(true);
	});

	it('should render the Discovered-date', () => {
		const timetube: Partial<ITimetube> = {
			discoveredUntil: 112233445566,
			paging: {},
			videos: {}
		};
		const wrapper = shallow(<DisconnectedToolbar timetube={timetube} />);
		expect(wrapper.find('.Discovered-date').exists()).toBe(true);
	});
});