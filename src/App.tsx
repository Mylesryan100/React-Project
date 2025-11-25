import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryCard from './components/CountryCard';
import { useState } from 'react';

import './App.css';

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  }


  return (
    <>
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
    <header className="header d-flex justify-content-between align-items-center px-4 py-3 shadow-sm mb-4">
      <h1 className='h1 mo-0'>Where in the world?</h1>
      <button className='btn btn-outline-dark' onClick={toggleTheme}> DARK MODE</button>
      </header>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryCard />} />
      </Routes>
    </div>
    </>
  );
}

export default App;

