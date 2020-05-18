import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    let initialState;

    beforeEach(() => {
        initialState = {
            loginError: null,
            registerError: null
        };
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({ ...initialState });
    });

    it('should set login error to null upon login success', () => {
        let action = {
            type: actionTypes.LOGIN_SUCCESS
        };
        expect(reducer(initialState, action)).toEqual({
            loginError: null,
            registerError: null
        });
    })

    it('should save login error upon login failed', () => {
        let action = {
            type: actionTypes.LOGIN_ERROR,
            error: {
                message: 'login failed'
            }
        };
        expect(reducer(initialState, action)).toEqual({
            loginError: 'login failed',
            registerError: null
        });
    })

    it('should mantain the state upon logout success', () => {
        let action = {
            type: actionTypes.LOGOUT_SUCCESS,
        };
        expect(reducer(initialState, action)).toEqual({ ...initialState });
    })

    it('should set register error to null upon register success', () => {
        let action = {
            type: actionTypes.REGISTER_SUCCESS
        };
        expect(reducer(initialState, action)).toEqual({
            loginError: null,
            registerError: null
        });
    })

    it('should save register error upon register failed', () => {
        let action = {
            type: actionTypes.REGISTER_ERROR,
            error: {
                message: 'register failed'
            }
        };
        expect(reducer(initialState, action)).toEqual({
            loginError: null,
            registerError: 'register failed'
        });
    })

});
