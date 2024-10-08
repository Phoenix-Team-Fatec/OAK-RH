require("dotenv").config();
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseService.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    reauthenticateWithCredential,
    deleteUser,
    deleteUserByEmail,
    updatePassword,
    EmailAuthProvider,
  
  } = require("firebase/auth") ;

  module.exports = {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    reauthenticateWithCredential,
    deleteUser,
    deleteUserByEmail,
    updatePassword,
    EmailAuthProvider,
    admin
  };