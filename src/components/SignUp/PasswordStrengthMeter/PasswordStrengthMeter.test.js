import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

configure({ adapter: new Adapter() });
describe('<PasswordStrengthMeter />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper=shallow(<PasswordStrengthMeter />);
        wrapper.setState({
            progressClass: "strength0",
            passwordDescription: "",
            rules: [{
                text: "At least 8 letters",
                classname: "invalid",
                correctFormat: /.{8}/
            },
            {
                text: "At least one number",
                classname: "invalid",
                correctFormat: /\d/
            },
            {
                text: "At least one lowercase & one uppercase letter",
                classname: "invalid",
                correctFormat: /([A-Z]+.*[a-z]+|[a-z]+.*[A-Z]+)/
            },
            {
                text: "At least one special character",
                classname: "invalid",
                correctFormat: /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/
            }]
        });
        wrapper.setProps({
            pass: ""
        });
    });

    it('should set progress class to strength0 \(too short\)', () => {
        wrapper.setProps({pass: 'abc'});
        expect(wrapper.state().progressClass).toEqual('strength0'); 
    });

    it('should set progress class to strength1 \(weak\)', () => {
        wrapper.setProps({pass: 'abc2'});
        expect(wrapper.state().progressClass).toEqual('strength1');
    });

    it('should set progress class to strength2 \(good\)', () => {
        wrapper.setProps({pass: 'abc2L'});
        expect(wrapper.state().progressClass).toEqual('strength2'); 
    });

    it('should set progress class to strength1 \(strong\)', () => {
        wrapper.setProps({pass: 'abc2L@'});
        expect(wrapper.state().progressClass).toEqual('strength3'); 
    });

    it('should set progress class to strength1 \(best\)', () => {
        wrapper.setProps({pass: 'abc2L@hh'});
        expect(wrapper.state().progressClass).toEqual('strength4');
    });
    
});