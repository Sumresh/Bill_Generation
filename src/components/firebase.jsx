// // // firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getDatabase } from "firebase/database";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCQ7tDQ35_T_FB1MriMRtd1o3DqdonNBqw",
// //   authDomain: "interior-48ebc.firebaseapp.com",
// //   databaseURL: "https://interior-48ebc-default-rtdb.firebaseio.com",
// //   projectId: "interior-48ebc",
// //   storageBucket: "interior-48ebc.appspot.com",
// //   messagingSenderId: "778423071044",
// //   appId: "1:778423071044:web:7964a08bb617c2177da711",
// //   measurementId: "G-KDM1JE0S5X",
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// // // Get a reference to the database
// // const database = getDatabase(app);

// // export { app, database };

// // Import the necessary functions from the Firebase SDK
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set } from "firebase/database";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCQ7tDQ35_T_FB1MriMRtd1o3DqdonNBqw",
//   authDomain: "interior-48ebc.firebaseapp.com",
//   databaseURL: "https://interior-48ebc-default-rtdb.firebaseio.com",
//   projectId: "interior-48ebc",
//   storageBucket: "interior-48ebc.appspot.com",
//   messagingSenderId: "778423071044",
//   appId: "1:778423071044:web:7964a08bb617c2177da711",
//   measurementId: "G-KDM1JE0S5X",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get a reference to the database
// const database = getDatabase(app);

// export { ref, set, database };
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ7tDQ35_T_FB1MriMRtd1o3DqdonNBqw",
  authDomain: "interior-48ebc.firebaseapp.com",
  databaseURL: "https://interior-48ebc-default-rtdb.firebaseio.com",
  projectId: "interior-48ebc",
  storageBucket: "interior-48ebc.appspot.com",
  messagingSenderId: "778423071044",
  appId: "1:778423071044:web:7964a08bb617c2177da711",
  measurementId: "G-KDM1JE0S5X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, update, remove };
