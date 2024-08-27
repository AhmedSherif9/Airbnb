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

const App = () => {
  return (
    <div className="p-5">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="places/:id" element={<PlacePage />} />
            <Route path="authenticate" element={<AuthenticatePage />} />
            <Route path="userpage/:option" element={<UserPage />} />
            <Route path="userpage/bookings/:id" element={<BookingPage />} />
            <Route
              path="userpage/accommodations/:id"
              element={<NewPlacePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
