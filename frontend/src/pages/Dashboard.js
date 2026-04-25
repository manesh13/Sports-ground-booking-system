import { useEffect, useState } from "react";
import api from "../api";
import BookingForm from "../components/BookingForm";
import MyBookings from "../components/MyBookings";
import ManagerBookingList from "../components/ManagerBookingList";

export default function Dashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  /* =========================
     Load bookings for manager
     ========================= */
  const loadBookings = () => {
    api.get("/bookings", {
      headers: { Role: user.role }
    })
    .then(res => setBookings(res.data))
    .catch(() => {});
  };

  useEffect(() => {
    if (user.role === "MANAGER" || user.role === "ADMIN") {
      loadBookings();
    }
  }, []);

  return (
    <div className="container">
      {/* ===== Title ===== */}
      <h1>Sports Ground Booking System</h1>

      {/* ===== Logout ===== */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* ===== SIDE-BY-SIDE LAYOUT ===== */}
      <div className="content-center">
        <div className="grid">

          {/* ========= LEFT CARD ========= */}
          <div className="card">
            <h2>Sports Arena Booking</h2>

            {user.role === "CITIZEN" && (
              <BookingForm
                refresh={() => setRefreshKey(prev => prev + 1)}
              />
            )}
          </div>

          {/* ========= RIGHT CARD ========= */}
          <div className="card">
            <h2>
              {user.role === "CITIZEN"
                ? "Your Bookings"
                : "Pending Approvals"}
            </h2>

            {user.role === "CITIZEN" && (
              <MyBookings
                citizenName={user.email}
                refreshTrigger={refreshKey}
              />
            )}

            {(user.role === "MANAGER" || user.role === "ADMIN") && (
              <ManagerBookingList
                bookings={bookings}
                refresh={() => {
                  loadBookings();
                  setRefreshKey(prev => prev + 1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}