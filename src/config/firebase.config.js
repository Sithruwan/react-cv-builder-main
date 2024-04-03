
import {getAuth} from 'firebase/auth';
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

    apiKey: import.meta.env.VITE_APP_API_KEY,
  
    authDomain:  import.meta.env.VITE_APP_AUTH_DOMAIN,
  
    projectId:  import.meta.env.VITE_APP_PROJECT_ID,
  
    storageBucket:  import.meta.env.VITE_APP_STORAGEBUCKET,
  
    messagingSenderId:  import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  
    appId:  import.meta.env.VITE_APP_APPID,
  
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
  
  };

  const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth,db,app,storage};