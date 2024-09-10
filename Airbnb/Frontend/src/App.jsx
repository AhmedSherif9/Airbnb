import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import PlacePage from "./Pages/PlacePage";
import AuthenticatePage from "./Pages/AuthenticatePage";
import UserPage from "./Pages/UserPage";
import BookingPage from "./Pages/BookingPage";
import NewPlacePage from "./Pages/NewPlacePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("isDark")
      ? JSON.parse(localStorage.getItem("isDark"))
      : false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem("isDark", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-5 dark:bg-gray-800 h-screen overflow-auto">
      <BrowserRouter>
        <Toaster />
        <button
          className={`fixed left-12 top-9 rounded-full p-4 ${
            darkMode ? "bg-gray-900" : "bg-gray-300"
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <MdLightMode className="text-yellow-500 scale-150" />
          ) : (
            <MdDarkMode className="text-gray-900 scale-150" />
          )}
        </button>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="places/:id" element={<PlacePage />} />
            <Route
              path="authenticate"
              element={<AuthenticatePage darkMode={darkMode} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="userpage/:option" element={<UserPage />} />
              <Route path="userpage/bookings/:id" element={<BookingPage />} />
              <Route
                path="userpage/accommodations/:id"
                element={<NewPlacePage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
