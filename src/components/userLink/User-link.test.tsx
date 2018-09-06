import * as Enzyme from 'enzyme';
import { shallow } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { UserLink } from './User-link';


Enzyme.configure({ adapter: new Adapter() });

describe('<UserLink />', () => {

	it('should render the UserLink component', () => {
		const wrapper = shallow(<UserLink />);
		expect(wrapper.find('.picture').exists()).toBe(true);
		expect(wrapper.find('.username').exists()).toBe(true);
	});
});