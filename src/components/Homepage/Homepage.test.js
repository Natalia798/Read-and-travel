import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Homepage from './Homepage';
import Footer from '../UI/Footer/Footer';

configure({ adapter: new Adapter() });

describe('<Homepage />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Homepage />);
    });

    it('should render a footer', () => {
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it('should render 2 buttons in the footer', () => {
        expect(wrapper.find(Footer).dive().find('button')).toHaveLength(2);
    });

});