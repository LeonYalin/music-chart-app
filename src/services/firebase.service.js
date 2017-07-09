import * as firebase from 'firebase'

let firebaseService = {
  config: {
    apiKey: 'AIzaSyCQCGyiBY_W5VkA7eJ5s-quVujevV_WY2k',
    authDomain: 'vue-learn.firebaseapp.com',
    databaseURL: 'https://vue-learn.firebaseio.com',
    projectId: 'vue-learn',
    storageBucket: 'vue-learn.appspot.com',
    messagingSenderId: '949208418517',
  },
  connect () {
    firebase.initializeApp(this.config);
    this.auth.google().then(this.saveUser);
  },
  auth: {
    google: () => {
      const provider = new firebase.auth.GoogleAuthProvider()
        .addScope('profile')
        .addScope('email');
      return firebase.auth().signInWithPopup(provider)
    }
  },
  saveUser(result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    console.log(token);

    // The signed-in user info.
    var user = result.user;
    console.log(user);

    const bands = firebase.database().ref('bands');

    bands.once('value').then(data => {
      console.log(data.val());
    })
  }
}

export {firebaseService}
