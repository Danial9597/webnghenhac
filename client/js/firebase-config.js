const firebaseConfig = { 
  apiKey : "AIzaSyDU5ZLLQFOtFFO3VtKYj9Dc-ZjzUhOFHvE" , 
  authDomain : "jsi07-e13da.firebaseapp.com" , 
  projectId : "jsi07-e13da" , 
  storageBucket : "jsi07-e13da.firebasestorage.app" , 
  messagingSenderId : "54277847367" , 
  appId : "1:54277847367:web:b435e153e4f892c23cb462" 
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
