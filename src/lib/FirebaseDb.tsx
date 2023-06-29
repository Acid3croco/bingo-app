import "firebase/compat/firestore"
import firebase from "firebase/compat/app"
import { getDatabase, ref, push, set } from "firebase/database"

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

const eventCollectionName = (category: string) => category + "-events"

export const getDbEvents = async (category: string) => {
  const collectionName = eventCollectionName(category)
  const snapshot = await db.collection(collectionName).get()
  return snapshot.docs.map((doc) => doc.data())
}

export const setDbEvents = async (category: string, events: any) => {
  const collectionName = eventCollectionName(category)
  // replace current collection withg all new events without keeping old events

  const batch = db.batch()
  const querySnapshot = await db.collection(collectionName).get()
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })
  await batch.commit()

  events.forEach((event: any) => {
    db.collection(collectionName).add({
      name: event
    })
  })
}

export default db
