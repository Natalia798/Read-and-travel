import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header auth={{ uid: null }} />);
    })

    it("should not show logout link if user id is null", () => {
        expect(wrapper.find('NavLink').children().contains('Log out')).toBe(false);
    });

    it("should show logout link if user id is not null", () => {
        wrapper.setProps({ auth: { uid: 'some-id' } });
        expect(wrapper.find('NavLink').children().contains('Log out')).toBe(true);
    });

    it("should call the logout function when the logout link is clicked", () => {
        const callback = jest.fn();
        wrapper = mount(
            <MemoryRouter>
                <Header auth={{ uid: 'some-id' }} logout={callback} />
            </MemoryRouter>
        );
        wrapper.find('NavLink').forEach((node) => {
            if (node.children().contains('Log out')) {
                node.simulate('click');
            }
        });
        expect(callback).toHaveBeenCalled();
    });

})