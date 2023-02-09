import { initializeApp } from "firebase/app";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDdczTYVRjb1CzRl5AIFG1b4DkE_vdrkK8",
  authDomain: "ssafy8th-mindder.firebaseapp.com",
  projectId: "ssafy8th-mindder",
  storageBucket: "ssafy8th-mindder.appspot.com",
  messagingSenderId: "727566146121",
  appId: "1:727566146121:web:dc0f1fc3533d1085747d98",
  measurementId: "G-3CTM9BHPZV",
});

const messaging = getMessaging(firebaseApp);

//토큰값 얻기
getToken(messaging, {
  vapidKey: "BN6-S13G3UiHR-Ge1_7R8f_k4QCc2kZEXSqZtxCTZrDvinaNA2Lf379RE1KrRXiJA5Ia28YSroHhIkdjaDazWx0",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
