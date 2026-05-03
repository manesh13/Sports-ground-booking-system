import { useEffect, useState } from "react";
import api from "../api";
import BookingForm from "../components/BookingForm";
import MyBookings from "../components/MyBookings";
import ManagerBookingList from "../components/ManagerBookingList";
import PastBookingList from "../components/PastBookingList";
import UserList from "../components/UserList";

export default function Dashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  /* ===========================
     LOAD BOOKINGS (MANAGER ONLY)
     =========================== */
  const loadBookings = () => {
    api.get("/bookings")
      .then(res => setBookings(res.data))
      .catch(() => {});
  };

  /* ===========================
     LOAD USERS (ADMIN ONLY)
     =========================== */

const loadUsers = () => {
    api.get("/admin?role=ADMIN")
    .then(res => {
      const allUsers = res.data;

      setUsers(allUsers.filter(u => u.role === "CITIZEN"));
      setManagers(allUsers.filter(u => u.role === "MANAGER"));
    })
    .catch(() => {
      setUsers([]);
      setManagers([]);
    });
};


  useEffect(() => {
    if (user.role === "MANAGER") {
      loadBookings();
    }

    if (user.role === "ADMIN") {
      loadUsers();
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
        <div
          className={
            user.role === "CITIZEN" ? "grid grid--citizen" : "grid"
          }
        >

          {/* ===========================
             CITIZEN DASHBOARD
             =========================== */}
          {user.role === "CITIZEN" && (
            <>
              <div className="card card-citizen card-citizen--form">
                <BookingForm
                  user={user}
                  refresh={() => setRefreshKey(prev => prev + 1)}
                />
              </div>

              <div className="card card-citizen card-citizen--list">
                <h2>Your Bookings</h2>
                <MyBookings refreshTrigger={refreshKey} />
              </div>
            </>
          )}

          {/* ===========================
             MANAGER DASHBOARD
             =========================== */}
          {user.role === "MANAGER" && (
            <>
              <div className="card">
                <h2>Pending Approvals</h2>
                <ManagerBookingList
                  bookings={bookings}
                  refresh={loadBookings}
                />
              </div>

              <div className="card">
                <h2>Past Requests</h2>
                <PastBookingList bookings={bookings} />
              </div>
            </>
          )}

          {/* ===========================
             ADMIN DASHBOARD (NO BOOKINGS)
             =========================== */}
          {user.role === "ADMIN" && (
            <>
              <div className="card">
                <h2>Registered Users</h2>
                <UserList
                  users={users}
                  refresh={loadUsers}
                  allowDelete
                />
              </div>

              <div className="card">
                <h2>Managers</h2>
                <UserList
                  users={managers}
                  refresh={loadUsers}
                  allowDelete
                />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}