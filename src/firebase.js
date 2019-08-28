import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyC1pmKbV4sLJ-N1F9SSP_SUVxWlXHjmHrY",
  authDomain: "vue-fire-first.firebaseapp.com",
  databaseURL: "https://vue-fire-first.firebaseio.com",
  projectId: "vue-fire-first",
  storageBucket: "",
  messagingSenderId: "556558627380",
  appId: "1:556558627380:web:c39f3abc990e2335"
};

export const fb = firebase.initializeApp(config)
