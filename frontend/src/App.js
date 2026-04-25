import { useEffect, useState } from "react";
import "./styles.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [dark, setDark] = useState(false);

  // ✅ Load theme on refresh
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  // ✅ Sync theme
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      {/* ✅ DARK THEME BUTTON ALWAYS VISIBLE */}
      <ThemeToggle dark={dark} setDark={setDark} />

      {!user ? (
        page === "login" ? (
          <Login
            onLogin={setUser}
            goToSignup={() => setPage("signup")}
          />
        ) : (
          <Signup goToLogin={() => setPage("login")} />
        )
      ) : (
        <Dashboard
          user={user}
          onLogout={() => {
            localStorage.removeItem("user");
            setUser(null);
            setPage("login");
          }}
        />
      )}
    </>
  );
}