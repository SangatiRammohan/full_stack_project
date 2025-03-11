import React from "react";
import "./Auth.css";

const SignUp = ({ closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="auth-btn">Register</button>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default SignUp;
