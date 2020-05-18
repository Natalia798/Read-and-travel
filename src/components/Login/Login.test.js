import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
    let wrapper;
    const historyMock = { push: jest.fn() };

    beforeEach(() => {
        wrapper = shallow(
            <Login
                history={historyMock}
                auth={{ uid: null }}
                loginError={null}
            />
        );
    });

    it('should rdirect to "/" element if the user id is not null (successful login)', () => {
        wrapper.setProps({ auth: { uid: 'some-id' } });
        expect(historyMock.push.mock.calls[0]).toEqual([('/')]);
        expect(1).toBe(1);
    });

    it('should render a label with the appropiate content if the loginError is not null', () => {
        wrapper.setProps({ loginError: 'some-error' });
        expect(wrapper.find('label').children().contains('some-error')).toEqual(true);
    });

    it('should set state when email input is changed', () => {
        wrapper.setState({ email: '' });
        wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@test' } });
        expect(wrapper.state().email).toEqual('test@test');
    });

    it('should set state when password input is changed', () => {
        wrapper.setState({ password: '' });
        wrapper.find('input[type="password"]').simulate('change', { target: { value: '1234' } });
        expect(wrapper.state().password).toEqual('1234');
    });

    it('should redirect to homepage when cancel button is clicked', () => {
        wrapper.find('button[type="button"]').simulate('click');
        expect(historyMock.push.mock.calls[0]).toEqual([('/')]);
    });

    it('should submit event when click login', () => {
        const callback = jest.fn();
        wrapper = mount(<Login history={historyMock} auth={{ uid: null }} loginError={null} />);
        wrapper.setProps({ login: callback });
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(callback).toHaveBeenCalled();
    });

    it("should set state when remember me box is checked", () => {
        wrapper.setState({ rememberMe: false });
        wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
        expect(wrapper.state().rememberMe).toEqual(true);

        wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
        expect(wrapper.state().rememberMe).toEqual(false);
    });

});