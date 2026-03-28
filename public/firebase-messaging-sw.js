importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDRPleWsJRr2xCl-ioo6dQcf2CuCedKRMQ",
  authDomain: "servitodo-47422.firebaseapp.com",
  projectId: "servitodo-47422",
  storageBucket: "servitodo-47422.firebasestorage.app",
  messagingSenderId: "373904156165",
  appId: "1:373904156165:web:7d1f0111d5df5cd0321e6c",
  measurementId: "G-69HSRMQ852",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
