import { useState, useEffect } from "react";
import api from "../api";
import BookingForm from "../components/BookingForm";
import ManagerBookingList from "../components/ManagerBookingList";
import MyBookings from "../components/MyBookings";

export default function Dashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    api.get("/bookings", {
      headers: { Role: "MANAGER" }
    }).then(res => setBookings(res.data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="container">
      <h1>Sports Ground Booking System</h1>

      {/* ✅ LOGOUT – bottom center BEFORE forms */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="grid">
        {/* Citizen Section */}
        <div className="card">
          <h2>Sports Arena Booking</h2>
          {user.role === "CITIZEN" && (
            <BookingForm refresh={loadBookings} />
          )}
        </div>

        {/* Manager Section */}
<div className="card">
  <h2>Your Bookings</h2>

  {user.role === "CITIZEN" && (
<MyBookings citizenName={user.name} />  )}
</div>

      </div>
    </div>
  );
}