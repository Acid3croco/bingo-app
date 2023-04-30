import "firebase/compat/firestore"
import firebase from "firebase/compat/app"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSdSRtAQuxQSst6LQM61KogpbwylfDh1k",
  authDomain: "bingo-app-f66c9.firebaseapp.com",
  projectId: "bingo-app-f66c9",
  storageBucket: "bingo-app-f66c9.appspot.com",
  messagingSenderId: "77423301146",
  appId: "1:77423301146:web:884691dee812eccfd377a3"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
export default db
