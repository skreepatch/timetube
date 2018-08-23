import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { Welcome } from './Welcome';

Enzyme.configure({ adapter: new Adapter() });

describe('<Welcome />', () => {
    it('renders the welcome heading', () => {
        const me = {
            name: 'Welcome Component',
            isLoggedIn: true
        };

        const timetube = {
            videos: {},
            paging: {},
            fetching: false,
            discoveredUntil: null,
            drained: false
        };

        const wrapper = shallow(<Welcome me={me} timetube={timetube} />);
        expect(wrapper.find('h2')).toBeDefined();
    });
});