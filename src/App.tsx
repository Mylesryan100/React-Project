import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import CountryCard from "./components/CountryCard";
import { ThemeContext } from "./pages/ThemeContext";
import "./App.css";

function App() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
      <header className="flex items-center justify-between bg-white px-4 py-4 shadow md:px-16 dark:bg-slate-800">
        <h1 className="text-base font-extrabold sm:text-xl">
          Where in the world?
        </h1>

        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
          aria-label={`Activate ${darkMode ? "light" : "dark"} mode`}
        >
          <span aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryCard />} />
      </Routes>
    </div>
  );
}

export default App;