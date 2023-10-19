import React from "react";
import "./Login.css";
import Logo from "../Assets/Logo.png";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

import { Authentication, googleProvider } from "../Configs/FirebaseConfig";
function Login() {
  const googleSignInHandler = () => {
    signInWithPopup(Authentication, googleProvider)
      .then((res) => console.log(res))
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="Logo" />
        <h1>Sign in to Slack Clone</h1>
        <p>Enter website address here</p>
        <Button onClick={googleSignInHandler}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
