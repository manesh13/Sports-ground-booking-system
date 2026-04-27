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

    api.post("/users/register", {
      email,
      password,
      role
    })
    .then(() => {
      alert("✅ Account created successfully");
      goToLogin();
    })
    .catch(err => {
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        setError("Failed to create account");
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          placeholder="Email"
          value={email}
          className={error ? "input-error" : ""}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          className={error ? "input-error" : ""}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="show-password-row">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show password</label>
        </div>

        <label>User Role</label>
        <select
          value={role}
          className={error ? "input-error" : ""}
          onChange={e => setRole(e.target.value)}
        >
          <option value="CITIZEN">Citizen</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* ✅ SAME ERROR BOX AS LOGIN */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

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
