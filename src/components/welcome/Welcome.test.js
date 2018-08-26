import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Welcome } from './Welcome';
import { store } from "../../store";

Enzyme.configure({ adapter: new Adapter() });

describe('<Welcome />', () => {
    it('renders the welcome heading', () => {
        const wrapper = shallow(<Welcome store={store} />);
        expect(wrapper.find('h2').exists()).toBe(true);
    });
});