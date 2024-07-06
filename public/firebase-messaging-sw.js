// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAbhycbnuDRAE94PyWwnz8YngrIpIdWhT8",
    authDomain: "jadescrolls-a9b16.firebaseapp.com",
    projectId: "jadescrolls-a9b16",
    storageBucket: "jadescrolls-a9b16.appspot.com",
    messagingSenderId: "727229574438",
    appId: "1:727229574438:web:08fa88ef2d4461634765e7",
    measurementId: "G-J40DV6JPYW"
};

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
        const notificationTitle = payload?.data?.data ? JSON.parse(payload?.data?.data) : "";
        const notificationOptions = {
            body: notificationTitle.body,
        };

        self.registration.showNotification(notificationTitle.title,
            notificationOptions)
    })
}