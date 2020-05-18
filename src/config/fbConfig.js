/* istanbul ignore file */
import { webApiKey } from '../utils/webApiKey';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: webApiKey,
    authDomain: "readandtravel-43963.firebaseapp.com",
    databaseURL: "https://readandtravel-43963.firebaseio.com",
    projectId: "readandtravel-43963",
    storageBucket: "readandtravel-43963.appspot.com",
    messagingSenderId: "912508747164",
    appId: "1:912508747164:web:f84815754cc79881"
};

firebase.initializeApp(firebaseConfig);

export default firebase;