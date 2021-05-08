import dotenv from "dotenv";
import firebase from "firebase/app";
import cookie, { removeCookie } from "react-cookies";
import "firebase/firestore";
require("firebase/auth");

dotenv.config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

console.log(process.env.REACT_APP_API_KEY);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    
    .then((res) => { 
      cookie.save("key", res.credential.idToken, { path: "/" }); 
      // const db = firebase.firestore();
      // db.collection("users")
      //   .doc(res.user.uid)
      //   .set({
      //     name: JSON.stringify(res.user.displayName),
      //     email: JSON.stringify(res.user.email),
      //   })
      const headers = { "Authorization": res.user.uid };
      fetch("http://34.93.10.131/get", { headers }).then((response) =>{
        const data = response.json();
        return data;
      })
      .then((data)=>{  console.log(data);
        if(!data.user_exists)
        {
          const requestOptions = {
            method: 'POST',
            headers: { "Authorization": res.user.uid },
            body:JSON.stringify({
              uid:res.user.uid,
              email: res.user.email,
            })
        };
          const headers = { "Authorization": res.user.uid }
          fetch(" http://34.93.10.131/register",requestOptions ).then((response) =>{
            const data = response.json();
            return data;
          })
          .then((data)=>{console.log(data)})
        }})
        .catch((error) => {
          console.log(error.message);
        });
        cookie.save("firebaseUid", res.user.uid, { path: "/" });
      window.location.href = "/dashboard";
      console.log(res);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const logOut = () => {
  cookie.remove("key");
  window.location.reload();
}

