import { useState } from "react";
import api from "../api";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CITIZEN");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    api.post("/users/register", {
      email,
      password,
      role
    })
    .then(() => {
      alert("✅ Account created");
      goToLogin();
    })
    .catch(err => {
      setError(err.response?.data || "Signup failed");
    });
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

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* ✅ SHOW PASSWORD */}
        <div className="show-password-row">
          <input
            type="checkbox"
            id="showPassSignup"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassSignup">Show password</label>
        </div>

        {/* ✅ ROLE SELECTION */}
        <label>User Role</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="CITIZEN">Citizen</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>

        {error && <p className="error-text">{error}</p>}

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