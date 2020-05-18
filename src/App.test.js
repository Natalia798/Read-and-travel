import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';

import App from './App';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

configure({ adapter: new Adapter() });

describe('<App />', () => {
    let wrapper;
    let pathMap = {};

    beforeAll(() => {
        wrapper = shallow(<App />)

        pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        //console.log(pathMap)
    })

    it('should render the <Homepage/> if the path is the root', () => {
        expect(pathMap['/']).toBe(Homepage);
    });

    it('should render the <Login/> if the path is /login', () => {
        expect(pathMap['/login']).toBe(Login);
    });

    it('should render the <SignUp/> if the path is /signup', () => {
        expect(pathMap['/signup']).toBe(SignUp);
    });

    it('should render the <Homepage/> if the path does not correspond to any existing path', () => {
        const initialState = {
            auth: {
                loginError: null,
                registerError: null
            },
            firebase: {
                auth: {
                    uid: 'dasd'
                }
            }
        };
        const mockStore = configureStore();
        const store = mockStore(initialState);
        wrapper = mount(
            <MemoryRouter initialEntries={['/unknown']}>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>
        );
        expect(wrapper.find(Homepage)).toHaveLength(1);
    });

});