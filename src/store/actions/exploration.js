import * as actionTypes from './actionTypes';

export const setInitialLocation = (location) => {
    return {
        type: actionTypes.SET_INITIAL_LOCATION,
        location
    };
};
