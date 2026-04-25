import { useState } from "react";
import api from "../api";

export default function BookingForm({ facilityId }) {
  const [citizenName, setCitizenName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const submit = (e) => {
    e.preventDefault();

    api.post("/bookings", {
      facilityId,
      Citizen-Name: user.email,
      startTime,
      endTime
    })
      .then(() => alert("Booking requested"))
      .catch(err => {
        alert(err.response?.data || "Booking failed");
      });
  };

  return (
    <form onSubmit={submit}>
      <h4>Book Facility</h4>

      <input
        placeholder="Your Name"
        value={citizenName}
        onChange={(e) => setCitizenName(e.target.value)}
        required
      />
      <br />

      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <br />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <br />

      <button type="submit">Request Booking</button>
    </form>
  );
}