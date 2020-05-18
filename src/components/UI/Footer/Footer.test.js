import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from './Footer';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
    let wrapper;
    const historyMock = { push: jest.fn() };

    beforeEach(() => {
        wrapper = shallow(<Footer history={historyMock} />);
    });

    it('should render 2 <button /> elements if text is given for both buttons', () => {
        wrapper.setProps({ leftBtnText: 'SIGN UP' });
        wrapper.setProps({ rightBtnText: 'LOG IN' });
        expect(wrapper.find('button')).toHaveLength(2);
    });

    it('should render 1 <button /> element only if text is given for the left button', () => {
        wrapper.setProps({ leftBtnClickedPath: '/signup' });
        expect(wrapper.find('button')).toHaveLength(0);
        wrapper.setProps({ leftBtnText: 'SIGN UP' });
        expect(wrapper.find('button').children().contains('SIGN UP')).toEqual(true);
    });

    it('should render 1 <button /> elements only if text is given for the right button', () => {
        wrapper.setProps({ rightBtnClickedPath: '/login' });
        expect(wrapper.find('button')).toHaveLength(0);
        wrapper.setProps({ rightBtnText: 'LOG IN' });
        expect(wrapper.find('button').children().contains('LOG IN')).toEqual(true);
    });

    it('should render no <button /> elements if text is not given for them', () => {
        expect(wrapper.find('button')).toHaveLength(0);
    });

    it('should redirect to given path when left button is clicked', () => {
        wrapper.setProps({ leftBtnText: 'SIGN UP', leftBtnClickedPath: '/signup' });
        wrapper.setProps({ leftBtnText: 'SIGN UP' });
        wrapper.find('button').simulate('click');
        expect(historyMock.push.mock.calls[0]).toEqual([('/signup')]);
    });

    it('should redirect to given path when right button is clicked', () => {
        wrapper.setProps({ rightBtnText: 'LOGIN', rightBtnClickedPath: '/login' });
        wrapper.find('button').simulate('click');
        expect(historyMock.push.mock.calls[1]).toEqual([('/login')]);
    });

});