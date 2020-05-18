import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';
import expect from 'expect';
import {makeMockStore, makeMockStoreReject} from './__mocks__/storeWithFirebase';

import * as actionCreators from './auth';
import * as actionTypes from './actionTypes';

configure({ adapter: new Adapter() });

const mockSuccess = data => ({ status: 200, response: { data } });
const mockError = error => ({ status: 500, response: error });

describe('auth action creators', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('should return a LOGIN_SUCCESS action', () => {
        expect(actionCreators.loginSucess()).toEqual({
            type: actionTypes.LOGIN_SUCCESS
        });
    });

    it('should return a LOGIN_ERROR action', () => {
        const error = 'some-error';
        expect(actionCreators.loginError(error)).toEqual({
            type: actionTypes.LOGIN_ERROR,
            error: error
        });
    });

    it('should return a LOGOUT_SUCCESS action', () => {
        expect(actionCreators.logoutSucess()).toEqual({
            type: actionTypes.LOGOUT_SUCCESS
        });
    });

    it('should return a REGISTER_SUCCESS action', () => {
        expect(actionCreators.registerSucess()).toEqual({
            type: actionTypes.REGISTER_SUCCESS
        });
    });

    it('should return a REGISTER_ERROR action', () => {
        const error = 'some-error';
        expect(actionCreators.registerError(error)).toEqual({
            type: actionTypes.REGISTER_ERROR,
            error: error
        });
    });

    it('should return a LOGOUT_SUCCESS after successful logout', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockSuccess({})
            );
        });
        const expectedActions = [
            actionCreators.logoutSucess()
        ];
        store.dispatch(actionCreators.logout()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a REGISTER_SUCCESS after successful register', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockSuccess({})
            );
        });
        const expectedActions = [
            actionCreators.registerSucess()
        ];
        const newUser = {
            username: 'dasda',
            email: 'dasd@adsa',
            password: 'faff',
            dateOfBirth: 'fawfa'
        };
        store.dispatch(actionCreators.register(newUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a REGISTER_ERROR after failed register', () => {
        const store = makeMockStoreReject();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockError("some error")
            );
        });
        const expectedActions = [
            actionCreators.registerError("some error")
        ];
        const newUser = {
            username: 'dasda',
            email: 'dasd@adsa',
            password: 'faff',
            dateOfBirth: 'fawfa'
        };
        store.dispatch(actionCreators.register(newUser)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a LOGIN_SUCCESS after successful login', () => {
        const store = makeMockStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockSuccess({})
            );
        });
        const expectedActions = [
            actionCreators.loginSucess(),
            actionCreators.loginSucess(),
        ];
        const email = 'dasd@adsa';
        const password = 'faff';
        let rememberMe = false;
        store.dispatch(actionCreators.login(email, password, rememberMe)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        rememberMe = true;
        store.dispatch(actionCreators.login(email, password, rememberMe)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return a LOGIN_ERROR after failed login', () => {
        const store = makeMockStoreReject();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(
                mockError("some error")
            );
        });
        const expectedActions = [
            actionCreators.loginError('some error')
        ];
        const email = 'dasd@adsa';
        const password = 'faff';
        let rememberMe = false;
        store.dispatch(actionCreators.login(email, password, rememberMe)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

});