import React from "react";
import "./Auth.css";

const SignIn = ({ closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="auth-btn">Login</button>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default SignIn;
