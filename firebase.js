import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD7QBV4MllMJOpX_IpU-lxB8WksLJD5ag4",
    authDomain: "amzon-clone-f2bbe.firebaseapp.com",
    projectId: "amzon-clone-f2bbe",
    storageBucket: "amzon-clone-f2bbe.appspot.com",
    messagingSenderId: "868887895434",
    appId: "1:868887895434:web:29c7914c3326cdc65e7c73",
    measurementId: "G-45FDR9KSTV"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export default app;