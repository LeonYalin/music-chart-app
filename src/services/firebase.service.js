import * as firebase from 'firebase'

const firebaseService = {
  db() {
    return firebase.database();
  },
  config: {
    apiKey: 'AIzaSyCQCGyiBY_W5VkA7eJ5s-quVujevV_WY2k',
    authDomain: 'vue-learn.firebaseapp.com',
    databaseURL: 'https://vue-learn.firebaseio.com',
    projectId: 'vue-learn',
    storageBucket: 'vue-learn.appspot.com',
    messagingSenderId: '949208418517',
  },
  connect() {
    firebase.initializeApp(this.config);
  },
  auth: {
    google: () => {
      const provider = new firebase.auth.GoogleAuthProvider()
        .addScope('profile')
        .addScope('email');
      return firebase.auth().signInWithPopup(provider)
    },
    signUp: (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    },
    logIn: (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },
  }
};

export {firebaseService}
