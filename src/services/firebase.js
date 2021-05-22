import dotenv from "dotenv";
import firebase from "firebase/app";
import cookie from "react-cookies";
import axios from "axios";
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

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      cookie.save("key", res.user.uid, { path: "/" });
      console.log("Below key", res.user.uid);
      console.log("Above header");
      const headers = { Authorization: res.user.uid };
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/get`, { headers })
        .then((response) => {
          console.log("Below header");
          console.log(response.data);
          const data = response.data;
          return data;
        })
        .then((data) => {
          console.log(data, "idhar");
          if (!data.user_exists) {
            console.log("user does not exist");
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/register`,
                {
                  uid: res.user.uid,
                  email: res.user.email,
                },
                {
                  headers: {
                    Authorization: res.user.uid,
                  },
                }
              )
              .then((response) => {
                console.log(response);
                // window.location.href = "/dashboard";
              })
              .catch((e) => {
                console.log(e);
                alert("Something went wrong. Please try again.");
              });
          } else {
            console.log("user existss");
            window.location.href = "/dashboard";
          }
        })
        .catch((error) => {
          console.log(error.message);
          alert("Something went wrong while logging in. Please try again.");
        });
    })
    .catch((error) => {
      console.log(error.message);
      alert(
        "Something went wrong accessing your google account. Please try again."
      );
    });
};

// export const getUid = (uid) => {
//   firebase
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       const uid = decodedToken.uid;
//       return uid;
//     })
//     .catch((error) => {
//       console.log(error);
//       return null;
//     });
// };

export const logOut = () => {
  cookie.remove("key");
  window.location.reload();
};
