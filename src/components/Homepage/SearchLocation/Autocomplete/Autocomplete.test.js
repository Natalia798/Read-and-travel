import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  Autocomplete  from './Autocomplete'; 

configure({ adapter: new Adapter() });
describe('<Autocomplete />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Autocomplete suggestions={['Albania', 'Algeria', 'Bolivia']} />);
        wrapper.setState({
            activeSuggestion: 0,
            filteredSuggestions: '',
            showSuggestions: true,
            userInput: ""
        });
    });

    it("should match the user's input with filtered suggestions", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Alb' } });
        expect(wrapper.state().filteredSuggestions).toEqual(['Albania']);
    });

    it("should doesn't match the user's input with filtered suggestions", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'gfg' } });
        expect(wrapper.state().filteredSuggestions).toEqual([]);
    });

    it("should set active the suggestion when the user clicked enter", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'A' } });
        wrapper.find('input[type="text"]').simulate('keydown', {keyCode: 13}); 
        expect(wrapper.state().activeSuggestion).toEqual(0);
        expect(wrapper.state().showSuggestions).toEqual(false);
        expect(wrapper.state().userInput).toEqual('Albania');

    });

    it("should set active the previous suggestion  when the user pressed the up arrow", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'A' } });
        wrapper.find('input[type="text"]').simulate('keydown', {keyCode: 38});
        expect(wrapper.state().activeSuggestion).toEqual(0);

    });

    it("should set active the posterior suggestion when the user pressed the down arrow", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'A' } });
        wrapper.find('input[type="text"]').simulate('keydown', {keyCode: 40});
        expect(wrapper.state().activeSuggestion).toEqual(1);
    });

    it("should set state when clicked", () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Bo' } });
        wrapper.find('li').simulate('click', { target: {innerText: wrapper.find('li').children()} });
        expect(wrapper.state().activeSuggestion).toEqual(0);
        expect(wrapper.state().filteredSuggestions).toEqual([]);
        expect(wrapper.state().showSuggestions).toEqual(false);
        expect(wrapper.state().userInput.debug()).toEqual('Bolivia');
    });
});