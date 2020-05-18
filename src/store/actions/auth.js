import * as actionTypes from './actionTypes';

export const loginSucess = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS
    };
};

export const loginError = (error) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        error: error
    };
};

export const logoutSucess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};

export const registerSucess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    };
};

export const registerError = (error) => {
    return {
        type: actionTypes.REGISTER_ERROR,
        error: error
    };
};


export const login = (email, password, rememberMe) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        let persistenceType = firebase.auth.Auth.Persistence.SESSION;
        if (rememberMe) {
            persistenceType = firebase.auth.Auth.Persistence.LOCAL;
        }
        return firebase.auth().setPersistence(persistenceType)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => {
                        dispatch(loginSucess());
                    }).catch((error) => {
                        dispatch(loginError(error));
                    })
            })
            .catch((error) => {
                dispatch(loginError(error));
            });
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        return firebase.auth().signOut().then(() => {
            dispatch(logoutSucess());
        });
    }
}

export const register = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firebase = getFirebase();
        const firestore = getFirestore();
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((response) => {
                return firestore.collection('users').doc(response.user.uid).set({
                    username: newUser.username,
                    dateOfBirth: newUser.dateOfBirth
                })
            })
            .then(() => {
                dispatch(registerSucess());
            }).catch(error => {
                dispatch(registerError(error));
            });
    }
}