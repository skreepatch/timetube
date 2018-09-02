import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { DisconnectedWelcome } from './Welcome';
import { loggedInOut, updateMe } from "../../store/me/me.actions";
import { receiveTimetube } from "../../store/timetubes/timetubes.actions";

Enzyme.configure({ adapter: new Adapter() });

describe('<Welcome />', () => {
	it('should render the welcome heading', () => {
		const me = {
			isLoggedIn: false
		};
		const wrapper = shallow(<DisconnectedWelcome me={me}/>);
		expect(wrapper.find('h2').exists()).toBe(true);
	});

	it('should render the login button', () => {
		const me = {
			isLoggedIn: false
		};
		const wrapper = shallow(<DisconnectedWelcome me={me}/>);
		expect(wrapper.find('.LoginButton').exists()).toBe(true);
	});

	it('should not render the login button after login', () => {
		const me = {
			isLoggedIn: true
		};
		const wrapper = shallow(<DisconnectedWelcome me={me}/>);
		expect(wrapper.find('.LoginButton').exists()).toBe(false);
	});

	it('should not render the insights', () => {
		const me = {
			isLoggedIn: true
		};
		const wrapper = shallow(<DisconnectedWelcome me={me}/>);
		expect(wrapper.find('.Insights').exists()).toBe(false);
	});

	it('should render the insights for existing data', () => {
		const me = {
			isLoggedIn: true,
			id: 'me'
		};

		const timetube = {
			videos: { test: {}, test2: {}},
			discoveredUntil: 11223344556
		};

		const wrapper = shallow(<DisconnectedWelcome me={me} timetube={timetube}/>);
		expect(wrapper.find('.Insights').exists()).toBe(true);
	});
});