import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ClockLoader } from './ClockLoader';


Enzyme.configure({ adapter: new Adapter() });

describe('<ClockLoader />', () => {

	it('should render the ClockLoader', () => {
		const wrapper = shallow(<ClockLoader show={false} />);
		expect(wrapper.find('.Clock-loader').exists()).toBe(true);
	});

	it('should render the ClockLoader and add "show" class', () => {
		const wrapper = shallow(<ClockLoader show={true}/>);
		expect(wrapper.is('.show')).toBe(true);
	});
});