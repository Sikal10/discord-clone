import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCaZ2FGRu8DKFmbnEAah1TAGYpuahUFM7U",
    authDomain: "discord-clone-2644c.firebaseapp.com",
    projectId: "discord-clone-2644c",
    storageBucket: "discord-clone-2644c.appspot.com",
    messagingSenderId: "376375904744",
    appId: "1:376375904744:web:6855490b7ab3344ec83c5d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
