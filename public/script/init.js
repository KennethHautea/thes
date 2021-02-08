var firebaseConfig = {
  apiKey: "AIzaSyDGhQ7suVtj7sAPcYuQvE68xyM3CUv0mBk",
  authDomain: "thesis-eventcurators.firebaseapp.com",
  projectId: "thesis-eventcurators",
  storageBucket: "thesis-eventcurators.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
db.settings({ timestampsInSnapshots: true});