import { useEffect, useState } from "react";
import api from "../api";

export default function MyBookings({ refreshTrigger }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my")
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, [refreshTrigger]);

  if (bookings.length === 0) {
    return (
      <div className="bookings-scroll bookings-scroll--empty">
        <p>No bookings yet</p>
      </div>
    );
  }

  return (
    <div className="bookings-scroll">
      {bookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Facility:</b> {b.facilityName}</p>

          <p>
            <b>Time:</b>{" "}
{new Date(b.startTime).toLocaleDateString()} | {" "}
{new Date(b.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} →
{new Date(b.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p>
            <b>Status:</b>{" "}
            <span className={`status ${b.status}`}>
              {b.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}