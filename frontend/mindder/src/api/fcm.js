import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import 'firebase/messaging';
import Swal from "sweetalert2";
const firebaseConfig  = {
  apiKey: "AIzaSyDdczTYVRjb1CzRl5AIFG1b4DkE_vdrkK8",
  authDomain: "ssafy8th-mindder.firebaseapp.com",
  projectId: "ssafy8th-mindder",
  storageBucket: "ssafy8th-mindder.appspot.com",
  messagingSenderId: "727566146121",
  appId: "1:727566146121:web:dc0f1fc3533d1085747d98",
  measurementId: "G-3CTM9BHPZV"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

firebase.initializeApp(firebaseConfig );

//////메세지 호출 & 토큰발급
export const getToken = async() => {
  const messaging = firebase.messaging();
  const token = await Notification.requestPermission()
    .then(function () {
      return messaging.getToken();
    })
    .then(function (token) {
      messaging.onMessage(payload => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          text: payload.notification.body,
          showConfirmButton: false,
          timer: 1500
        })
      })
      return token;
    })
    .catch(function (err) {
      // console.debug("에러 : ", err);
      return null;
    });
  // console.log("token: ", token);
  return token;
}