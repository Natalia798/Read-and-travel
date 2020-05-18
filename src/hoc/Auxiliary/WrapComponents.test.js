import React from 'react';

import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WrapComponents from './WrapComponents';

configure({ adapter: new Adapter() });

describe('<WrapComponents />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <div className="container">
                <WrapComponents>
                    <h1>Bye, world!</h1>
                </WrapComponents>
            </div>
        );
    });

    it('should find direct child <h1 /> inside wrapper ', () => {
        expect(wrapper.html()).toContain('h1');
    });

});