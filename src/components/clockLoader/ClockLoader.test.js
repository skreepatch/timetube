import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { ClockLoader } from './ClockLoader';


Enzyme.configure({ adapter: new Adapter() });

describe('<ClockLoader />', () => {

	it('should render the ClockLoader', () => {
		const wrapper = shallow(<ClockLoader />);
		expect(wrapper.find('.Clock-loader').exists()).toBe(true);
	});

	it('should render the ClockLoader and add "show" class', () => {
		const wrapper = shallow(<ClockLoader show={true}/>);
		expect(wrapper.is('.show')).toBe(true);
	});
});