import Firestore from './firestore';

const notifications = jest.fn(() => {
    return {
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn(),
        onNotificationOpened: jest.fn()
    }
});

const messaging = jest.fn(() => {
    return {
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('RN-Firebase-Token'))
    }
});

const storage = jest.fn(() => {
    return {
        ref: jest.fn(() => {
            return {
                child: jest.fn(() => {
                    return {
                        put: jest.fn(() => Promise.resolve(true))
                    }
                })
            }
        })
    }
});

const AuthPersistence = {
    Persistence: {
        SESSION: 'session',
        LOCAL: 'local',
    }
};

export class FirebaseMock {

    static initializeApp = jest.fn();
    static firestore = Firestore;
    static notifications = notifications;
    static messaging = messaging;
    static storage = storage;

    static auth = jest.fn(() => {
        return {
            setPersistence: jest.fn(() => Promise.resolve(true)),
            createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'some-id' } })),
            sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
            signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
            fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
            signOut: jest.fn(() => Promise.resolve(true)),
            onAuthStateChanged: jest.fn(),
            currentUser: {
                sendEmailVerification: jest.fn(() => Promise.resolve(true))
            }
        }
    });
}

FirebaseMock.auth.Auth = AuthPersistence;


export class FirebaseMockReject {

    static initializeApp = jest.fn();
    static firestore = Firestore;
    static notifications = notifications;
    static messaging = messaging;
    static storage = storage;

    static auth = jest.fn(() => {
        return {
            setPersistence: jest.fn(() => Promise.resolve(true)),
            createUserWithEmailAndPassword: jest.fn(() => Promise.reject('some error')),
            sendPasswordResetEmail: jest.fn(() => Promise.reject(true)),
            signInWithEmailAndPassword: jest.fn(() => Promise.reject('some error')),
            fetchSignInMethodsForEmail: jest.fn(() => Promise.reject(true)),
            signOut: jest.fn(() => Promise.reject(true)),
            onAuthStateChanged: jest.fn(),
            currentUser: {
                sendEmailVerification: jest.fn(() => Promise.reject(true))
            }
        }
    });
}

FirebaseMockReject.auth.Auth = AuthPersistence;
