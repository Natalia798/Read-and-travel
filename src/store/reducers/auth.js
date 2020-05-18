import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loginError: null,
    registerError: null
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        loginError: null
    };
}

const loginFail = (state, action) => {
    return {
        ...state,
        loginError: action.error.message
    };
}

const registerSuccess = (state, action) => {
    return {
        ...state,
        registerError: null
    };
}

const registerFail = (state, action) => {
    return {
        ...state,
        registerError: action.error.message
    };
}

const reducer = (state = initialState, action) => {
    // The reducer will update the global state, according to the action type received
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_ERROR:
            return loginFail(state, action);
        case actionTypes.LOGOUT_SUCCESS:
            return state;
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.REGISTER_ERROR:
            return registerFail(state, action);
        default:
            return state;
    }
};

export default reducer;