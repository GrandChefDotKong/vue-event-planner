importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

  const firebaseConfig = {
    apiKey: "AIzaSyB3rwHCSCk6BAM35N2gEuZ7rPG1ltcRKNI",
    authDomain: "vue-event-planner-d74c8.firebaseapp.com",
    projectId: "vue-event-planner-d74c8",
    storageBucket: "vue-event-planner-d74c8.appspot.com",
    messagingSenderId: "370568373374",
    appId: "1:370568373374:web:4500d37e31da0b15d2e42f"
  };

  const app = firebase.initializeApp(firebaseConfig);

  app.messaging().getToken({
    vapidKey: 'BGFVRuH-9m9zczqtc4dTfqrjGYXJAJubCRdoerRaDFsX1FMQ29CFjYFj_xk4BNIF-7W292_Gv8ZHAV0tWutnR_c'
  }).then((currentToken) => {
    if(currentToken) console.log('client token', currentToken);
    else console.log('No registration token available')
  }).catch((err) => console.log('error while retrieving token', err));



