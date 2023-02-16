importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDdczTYVRjb1CzRl5AIFG1b4DkE_vdrkK8",
  authDomain: "ssafy8th-mindder.firebaseapp.com",
  projectId: "ssafy8th-mindder",
  storageBucket: "ssafy8th-mindder.appspot.com",
  messagingSenderId: "727566146121",
  appId: "1:727566146121:web:dc0f1fc3533d1085747d98",
  measurementId: "G-3CTM9BHPZV"
});

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});