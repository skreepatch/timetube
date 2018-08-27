import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { Welcome } from './Welcome';
import { store } from "../../store";
import { loggedInOut, updateMe } from "../../store/me/me.actions";
import { receiveTimetube } from "../../store/timetubes/timetubes.actions";

Enzyme.configure({ adapter: new Adapter() });

describe('<Welcome />', () => {
	it('should render the welcome heading', () => {
		const wrapper = mount(<Welcome store={store}/>);
		expect(wrapper.find('h2').exists()).toBe(true);
	});

	it('should render the login button', () => {
		const wrapper = mount(<Welcome store={store}/>);
		expect(wrapper.find('.LoginButton').exists()).toBe(true);
	});

	it('should not render the login button after login', () => {
		store.dispatch(loggedInOut(true));
		const wrapper = mount(<Welcome store={store}/>);
		expect(wrapper.find('.LoginButton').exists()).toBe(false);
	});

	it('should not render the insights', () => {
		const wrapper = mount(<Welcome store={store}/>);
		expect(wrapper.find('.Insights').exists()).toBe(false);
	});

	it('should render the insights for existing data', () => {
		const id = 'id';
		store.dispatch(loggedInOut(true));
		store.dispatch(updateMe({
			id: id,
			name: 'Me'
		}));
		store.dispatch(receiveTimetube({
			id: id,
			update: {
				data: [ { message: 'video' }, { message: 'video' } ],
				paging: {},
				discoveredUntil: '27 aug 2018'
			}
		}));
		const wrapper = mount(<Welcome store={store}/>);
		expect(wrapper.find('.Insights').exists()).toBe(true);
	});
});