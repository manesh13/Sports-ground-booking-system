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
        // ✅ Single friendly error message
        setError("Invalid username or password");
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

        {/* ✅ Styled error message */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

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