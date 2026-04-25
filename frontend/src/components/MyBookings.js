import { useEffect, useState } from "react";
import api from "../api";

export default function MyBookings({ citizenName, refreshTrigger }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!citizenName) return;

    api.get("/bookings/my", {
      headers: {
        Role: "CITIZEN",
        "Citizen-Name": citizenName
      }
    })
    .then(res => setBookings(res.data))
    .catch(() => {});
  }, [citizenName, refreshTrigger]); // ✅ refresh when trigger changes

  if (bookings.length === 0) {
    return <p>No bookings yet</p>;
  }

  return (
    <>
      {bookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Facility:</b> {b.facilityId}</p>
          <p><b>Time:</b> {b.startTime} → {b.endTime}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`status ${b.status}`}>
              {b.status}
            </span>
          </p>
        </div>
      ))}
    </>
  );
}