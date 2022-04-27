import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBTK4camcxQW7ikR_JSTPlo6tjNRy_yHwk',
    authDomain: 'agenda-3c731.firebaseapp.com',
    projectId: 'agenda-3c731',
    storageBucket: 'agenda-3c731.appspot.com',
    messagingSenderId: '272466103359',
    appId: '1:272466103359:web:7b63f15c5c6dba4823fc8a',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default { app };
