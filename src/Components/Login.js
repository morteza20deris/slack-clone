import { Button } from "@mui/material";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import "./Login.css";

import { Authentication, googleProvider } from "../Configs/FirebaseConfig";
import { useEffect } from "react";
function Login() {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    onAuthStateChanged(Authentication, (user) => {
      if (!user) {
        setLoginState(true);
      }
    });
  }, []);

  const googleSignInHandler = () => {
    signInWithPopup(Authentication, googleProvider).catch((err) => {
      alert(err.message, "using a vpn might fix this");
    });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="Logo" />
        <h1>Sign in to Slack Clone</h1>
        <p>slack-clone-5.web.app</p>
        <Button
          onClick={() => {
            if (!Authentication.currentUser) {
              googleSignInHandler();
            }
          }}
        >{`${loginState ? "Log in With Google" : "Please wait"}`}</Button>
      </div>
    </div>
  );
}

export default Login;
