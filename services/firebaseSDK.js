import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBBhtccADSMJ1D3dNPvF_rjPBBkGpyvZUo",
    authDomain: "smartdrone-b2a1f.firebaseapp.com",
    databaseURL: "https://smartdrone-b2a1f-default-rtdb.firebaseio.com",
    projectId: "smartdrone-b2a1f",
    storageBucket: "smartdrone-b2a1f.appspot.com",
    messagingSenderId: "301589055508",
    appId: "1:301589055508:web:5de4f2ee3bf7dac0467f01",
    measurementId: "G-NCVFFHJEYB"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default firebaseApp