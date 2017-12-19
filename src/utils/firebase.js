import firebase from 'firebase'

// Init Firebase
var config = {
  apiKey: "AIzaSyBoX8BMIKtrBZEWFIWRx2apPBn3bogLPzo",
  authDomain: "classschedulingalgoproj.firebaseapp.com",
  databaseURL: "https://classschedulingalgoproj.firebaseio.com",
  projectId: "classschedulingalgoproj",
  storageBucket: "",
  messagingSenderId: "1062064580489"
};
firebase.initializeApp(config);
export default firebase
