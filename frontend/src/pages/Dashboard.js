import { useEffect, useState } from "react";
import api from "../api";
import BookingForm from "../components/BookingForm";
import MyBookings from "../components/MyBookings";
import ManagerBookingList from "../components/ManagerBookingList";

export default function Dashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadBookings = () => {
    api.get("/bookings")
      .then(res => setBookings(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    if (user.role !== "CITIZEN") {
      loadBookings();
    }
  }, []);

  return (
    <div className="container">
      <h1>Sports Ground Booking System</h1>

      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="content-center">
        <div className="grid">

          {user.role === "CITIZEN" && (
            <div className="card">
              <BookingForm
                user={user}
                refresh={() => setRefreshKey(prev => prev + 1)}
              />
            </div>
          )}

          <div className="card">
            <h2>
              {user.role === "CITIZEN"
                ? "Your Bookings"
                : "Pending Approvals"}
            </h2>

            {user.role === "CITIZEN" && (
              <MyBookings refreshTrigger={refreshKey} />
            )}

            {(user.role === "MANAGER" || user.role === "ADMIN") && (
              <ManagerBookingList
                bookings={bookings}
                refresh={loadBookings}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}