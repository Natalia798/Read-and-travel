import * as actionTypes from '../actions/actionTypes';

const initialState = {
    initialLocation: ""
};

const setInitialLocation = (state, action) => {
    return {
        ...state,
        initialLocation: action.location
    };
}

const reducer = (state = initialState, action) => {
    // The reducer will update the global state, according to the action type received
    switch (action.type) {
        case actionTypes.SET_INITIAL_LOCATION:
            return setInitialLocation(state, action);
        default:
            return state;
    }
};

export default reducer;