// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAbhycbnuDRAE94PyWwnz8YngrIpIdWhT8",
//   authDomain: "jadescrolls-a9b16.firebaseapp.com",
//   projectId: "jadescrolls-a9b16",
//   storageBucket: "jadescrolls-a9b16.appspot.com",
//   messagingSenderId: "727229574438",
//   appId: "1:727229574438:web:08fa88ef2d4461634765e7",
//   measurementId: "G-J40DV6JPYW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics ,isSupported} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbhycbnuDRAE94PyWwnz8YngrIpIdWhT8",
  authDomain: "jadescrolls-a9b16.firebaseapp.com",
  projectId: "jadescrolls-a9b16",
  storageBucket: "jadescrolls-a9b16.appspot.com",
  messagingSenderId: "727229574438",
  appId: "1:727229574438:web:08fa88ef2d4461634765e7",
  measurementId: "G-J40DV6JPYW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
export const analytics = isSupported().then(yes => yes ? getAnalytics(firebaseApp) : null);
