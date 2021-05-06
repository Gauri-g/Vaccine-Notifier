import React, { useEffect, useContext, useState } from "react";
import "./Login.css";
import { signInWithGoogle } from "./services/firebase";
import { UserContext } from "./providers/UserProvider";
import { Redirect, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function Login() {
  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={signInWithGoogle}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Continue with Google</span>
      </button>
    </div>
  );
}
