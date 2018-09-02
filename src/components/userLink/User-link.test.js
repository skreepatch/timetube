import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { UserLink } from './User-link';


Enzyme.configure({ adapter: new Adapter() });

describe('<UserLink />', () => {

	it('should render the UserLink component', () => {
		const wrapper = shallow(<UserLink/>);
		expect(wrapper.find('.picture').exists()).toBe(true);
		expect(wrapper.find('.username').exists()).toBe(true);
	});
});