import { useState } from "react";

export default function Login({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CITIZEN");

  const submit = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    // ✅ Simulated login
    localStorage.setItem("user", JSON.stringify({ email, role }));
    onLogin({ email, role });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="CITIZEN">Citizen</option>
          <option value="MANAGER">Manager</option>
        </select>

        <button className="primary-btn" onClick={submit}>
          Login
        </button>

        <p className="link" onClick={goToSignup}>
          Create an account
        </p>
      </div>
    </div>
  );
}