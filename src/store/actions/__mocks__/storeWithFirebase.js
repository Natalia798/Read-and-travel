import { FirebaseMock, FirebaseMockReject } from './firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const startState = {};
const createMiddlewares = (getFirebase, getFirestore) => {
    return [thunk.withExtraArgument({ getFirebase, getFirestore })];
}


const getFirebase = () => FirebaseMock;
const getFirestore = () => FirebaseMock.firestore;

const middlewares = createMiddlewares(getFirebase, getFirestore);
const mockStore = configureMockStore(middlewares);

export const makeMockStore = (state = {}) => {
    return mockStore({ ...startState, ...state, })
};



const getFirebaseReject = () => FirebaseMockReject;
const getFirestoreReject = () => FirebaseMockReject.firestore;

const middlewaresReject = createMiddlewares(getFirebaseReject, getFirestoreReject);
const mockStoreReject = configureMockStore(middlewaresReject);

export const makeMockStoreReject = (state = {}) => {
    return mockStoreReject({ ...startState, ...state, })
};
