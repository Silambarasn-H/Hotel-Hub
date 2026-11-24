import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";
import HotelDetails from "./pages/HotelDetails";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/edit-hotel/:id" element={<AddHotel />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
}

export default App;
