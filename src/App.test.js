import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import Enzyme, { shallow } from "enzyme/build";
import { store } from "./store";
import Adapter from "enzyme-adapter-react-16/build";

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App/>, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('should render the main cintainer', () => {
	const wrapper = shallow(<App store={store}/>);
	expect(wrapper.find('.main').exists()).toBe(true);
});

