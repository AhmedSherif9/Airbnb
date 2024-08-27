import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SearchProvider>
  </StrictMode>
);
