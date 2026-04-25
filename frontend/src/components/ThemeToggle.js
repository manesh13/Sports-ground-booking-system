export default function ThemeToggle({ dark, setDark }) {
  return (
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
  );
}