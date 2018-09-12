import * as Enzyme from 'enzyme';
import { shallow } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ITimetubeVideo } from "../../utils/video";
import { DisconnectedWelcome, IWelcomeProps } from './Welcome';

Enzyme.configure({ adapter: new Adapter() });

describe('<Welcome />', () => {
	it('should render the welcome heading', () => {
		const welcomeProps: IWelcomeProps = {
			me: {
				isLoggedIn: false,
			},
			timetube: {}
		};
		const wrapper = shallow(<DisconnectedWelcome {...welcomeProps} />);
		expect(wrapper.find('h2').exists()).toBe(true);
	});

	it('should render the login button', () => {
		const welcomeProps: IWelcomeProps = {
			me: {
				isLoggedIn: false
			},
			timetube: {}
		};
		const wrapper = shallow(<DisconnectedWelcome {...welcomeProps} />);
		expect(wrapper.find('.LoginButton').exists()).toBe(true);
	});

	it('should not render the login button after login', () => {
		const welcomeProps: IWelcomeProps = {
			me: {
				isLoggedIn: true
			},
			timetube: {}
		};
		const wrapper = shallow(<DisconnectedWelcome {...welcomeProps} />);
		expect(wrapper.find('.LoginButton').exists()).toBe(false);
	});

	it('should not render the insights', () => {
		const welcomeProps: IWelcomeProps = {
			me: {
				isLoggedIn: true
			},
			timetube: {}
		};
		const wrapper = shallow(<DisconnectedWelcome {...welcomeProps} />);
		expect(wrapper.find('.Insights').exists()).toBe(false);
	});

	it('should render the insights for existing data', () => {

		const welcomeProps: IWelcomeProps = {
			me: {
				id: 'me',
				isLoggedIn: true
			},
			timetube: {
				discoveredUntil: 11223344556,
				videos: { test: {} as ITimetubeVideo, test2: {} as ITimetubeVideo }
			}
		};


		const wrapper = shallow(<DisconnectedWelcome {...welcomeProps} />);
		expect(wrapper.find('.Insights').exists()).toBe(true);
	});
});