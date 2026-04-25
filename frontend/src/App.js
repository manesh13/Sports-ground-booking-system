import { useEffect, useState } from "react";
import "./styles.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [dark, setDark] = useState(false);

  /* Load theme only */
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  /* Sync dark mode */
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* ================= AUTH PAGES ================= */
  if (!user) {
    return (
      <>
        {/* Dark mode switch always visible */}
        <div className="theme-switch">
          <span>☀️</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            <span className="slider"></span>
          </label>
          <span>🌙</span>
        </div>

        {page === "login" ? (
          <Login
            onLogin={u => {
              localStorage.setItem("user", JSON.stringify(u));
              setUser(u);
            }}
            goToSignup={() => setPage("signup")}
          />
        ) : (
          <Signup goToLogin={() => setPage("login")} />
        )}
      </>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <>
      {/* Dark mode switch */}
      <div className="theme-switch">
        <span>☀️</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
          />
          <span className="slider"></span>
        </label>
        <span>🌙</span>
      </div>

      <Dashboard
        user={user}
        onLogout={() => {
          localStorage.removeItem("user");
          setUser(null);
          setPage("login");
        }}
      />
    </>
  );
}
