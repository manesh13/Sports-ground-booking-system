import { useState } from "react";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    alert("Account created! Please login.");
    goToLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button className="primary-btn" onClick={submit}>
          Create Account
        </button>

        <p className="link" onClick={goToLogin}>
          Back to login
        </p>
      </div>
    </div>
  );
}