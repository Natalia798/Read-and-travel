import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUp } from './SignUp';

configure({ adapter: new Adapter() });
describe('<SignUp />', () => {
    let wrapper;
    window.alert = jest.fn(); 
    const historyMock = { push: jest.fn() };

    beforeEach(() => {
        wrapper = shallow(
            <SignUp
                history={historyMock}
                auth={{ uid: null }}
                registerError={null}
            />
        );
        wrapper.setState({
            username: null,
            email: null,
            password: null,
            confirm_password: null,
            dateOfBirth: null,
            passwordOpen: false,
            errorMessage: {
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                dateOfBirth: ""
            }
        });
    });
   
    it('should set username if input length is >= 5, and error should be null', () => {
        wrapper.find('input[type="text"]').simulate('blur', { target: {value : 'Maria'}});
        expect(wrapper.state().username).toEqual('Maria');
        expect(wrapper.state().errorMessage.username).toEqual('');
    });

    it('should set username and error if input length is < 5', () => {
        wrapper.find('input[type="text"]').simulate('blur', { target: {value : 'Mar'}});
        expect(wrapper.state().username).toEqual('Mar');
        expect(wrapper.state().errorMessage.username).toEqual('Username must contain at least 5 characters');
    });

    it('should set email if input match /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, and error should be null', ()=> {
        wrapper.find('input[type="email"]').simulate('blur', { target: {value: 'test@test'}});
        expect(wrapper.state().email).toEqual('test@test');
        expect(wrapper.state().errorMessage.email).toEqual('');
    });

    it('should set email and error if input does not match /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/', ()=> {
        wrapper.find('input[type="email"]').simulate('blur', { target: {value: 'test'}});
        expect(wrapper.state().email).toEqual('test');
        expect(wrapper.state().errorMessage.email).toEqual('Email is invalid');
    });

    it('should set password if it is equal to confirm_password, and error should be null', ()=> {
        wrapper.setState({confirm_password : 'Napolitana123@' });
        wrapper.find('input[type="password"]').at(0).simulate('change', { target: {value: 'Napolitana123@'}});
        expect(wrapper.state().password).toEqual('Napolitana123@');
        expect(wrapper.state().errorMessage.confirm_password).toEqual('');
    });

    it('should set password and error if password is not equal to confirm_password', ()=> {
        wrapper.setState({confirm_password : 'Napolit' });
        wrapper.find('input[type="password"]').at(0).simulate('change', { target: {value: 'Napo342'}});
        expect(wrapper.state().password).toEqual('Napo342');
        expect(wrapper.state().errorMessage.confirm_password).toEqual("Password doesn't match");
    });

    it('should set confirm_password if it is equal to password, and error should be null', ()=> {
        wrapper.setState({password : 'Napolitana123@' });
        wrapper.find('input[type="password"]').at(1).simulate('change', { target: {value: 'Napolitana123@'}});
        expect(wrapper.state().confirm_password).toEqual('Napolitana123@');
        expect(wrapper.state().errorMessage.confirm_password).toEqual('');
    });

    it('should set confirm_password and error if confirm_password is not equal to password', ()=> {
        wrapper.setState({password : 'Napolit' });
        wrapper.find('input[type="password"]').at(1).simulate('change', { target: {value: 'Napo342'}});
        expect(wrapper.state().confirm_password).toEqual('Napo342');
        expect(wrapper.state().errorMessage.confirm_password).toEqual("Password doesn't match");
    });

    it('should set date of birth if year > new Date().getFullYear() - 100, and error should be null', ()=> {
        wrapper.find('input[type="date"]').simulate('blur', { target: {value: '02/05/1998'}});
        expect(wrapper.state().dateOfBirth).toEqual('02/05/1998');
        expect(wrapper.state().errorMessage.dateOfBirth).toEqual('');
    });

    it('should set date of birth and error if year < new Date().getFullYear() - 100 ', ()=> {
        wrapper.find('input[type="date"]').simulate('blur', { target: {value: '11/14/1700'}});
        expect(wrapper.state().dateOfBirth).toEqual('11/14/1700');
        expect(wrapper.state().errorMessage.dateOfBirth).toEqual("You're too old for this app");
    });

    it('should redirect to homepage when cancel button is clicked', () => {
        wrapper.find('button[type="button"]').simulate('click');
        expect(historyMock.push.mock.calls[0]).toEqual([('/')]);
    });
    it('should return passwordOpen flag (true)', () => {
        wrapper.find('input[type="password"]').at(0).simulate('focus',  {target : { value: true}});
        expect(wrapper.state().passwordOpen).toEqual(true);
    });

    it('should return passwordOpen flag (false)', () => {
        wrapper.find('input[type="password"]').at(0).simulate('blur',  {target : { value: false}});
        expect(wrapper.state().passwordOpen).toEqual(false);
    })

    it('should submit event when click on sign up button', () => {
        const callback = jest.fn();
        wrapper = mount( <SignUp
            history={historyMock}
            auth={{ uid: null }}
            registerError={null}
        />);
          wrapper.setState({
            username: 'd',
            email: 'd',
            password: 'd',
            confirm_password: 'd',
            dateOfBirth: 'd',
            passwordOpen: false,
            errorMessage: {
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                dateOfBirth: ""
            }
        });
        wrapper.setProps({ signUp: callback });
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(callback).toHaveBeenCalled();
    });

    it('should not call signup function if there are error messages when clicking on sign up button ', () => {
        const callback = jest.fn();
        wrapper = mount( <SignUp
            history={historyMock}
            auth={{ uid: null }}
            registerError={null}
        />);
          wrapper.setState({
            username: 'd',
            email: 'd',
            password: 'd',
            confirm_password: 'd',
            dateOfBirth: 'd',
            passwordOpen: false,
            errorMessage: {
                username: "ssdd",
                email: "",
                password: "",
                confirm_password: "",
                dateOfBirth: ""
            }
        });
        wrapper.setProps({ signUp: callback });
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(callback.mock.calls.length).toBe(0);
        expect(window.alert.mock.calls.length).toBe(1);
    });
});