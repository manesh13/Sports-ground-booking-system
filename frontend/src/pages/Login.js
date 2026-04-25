import { useState } from "react";
import api from "../api";

export default function Login({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    setError("");

    api.post("/users/login", { email, password })
      .then(res => {
        onLogin(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
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

        {/* ✅ FIXED SHOW PASSWORD */}
        <div className="show-password-row">
          <input
            type="checkbox"
            id="showPass"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPass">Show password</label>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-btn" onClick={submit}>
          Login
        </button>

        <p className="link" onClick={goToSignup}>
          Create account
        </p>
      </div>
    </div>
  );
}