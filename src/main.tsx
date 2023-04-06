import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import useUserStore from "./stores/user-store";

initializeApp({
  apiKey: "AIzaSyA7Aqh6w9nqXSY6AnCs5Wvw4_ZyVZ0T93U",
  authDomain: "statistical-analyzer-cs499.firebaseapp.com",
  projectId: "statistical-analyzer-cs499",
  storageBucket: "statistical-analyzer-cs499.appspot.com",
  messagingSenderId: "137889129404",
  appId: "1:137889129404:web:5d18144353fd14a17dc1b9",
  measurementId: "G-MP1YMLVSBV"
});
// If the user is logged in, set the user state to the user
getAuth().onAuthStateChanged((user) => {
  if (user) useUserStore.setState({ user });
  else {
    useUserStore.setState({ user: undefined });
  }
});
getStorage();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
