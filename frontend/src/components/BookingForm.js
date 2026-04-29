import { useEffect, useState } from "react";
import api from "../api";
import SlotGrid from "./SlotGrid";
import MyBookings from "./MyBookings";

export default function BookingForm({ refresh }) {
  const [citizenName, setCitizenName] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [facilityId, setFacilityId] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [blockedSlots, setBlockedSlots] = useState([]);

  /* ===========================
     LOAD FACILITIES
     =========================== */
  useEffect(() => {
    api.get("/facilities").then(res => setFacilities(res.data));
  }, []);

  /* ===========================
     NEXT 15 DAYS
     =========================== */
  useEffect(() => {
    const today = new Date();
    const list = [];

    for (let i = 0; i < 15; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      list.push(d.toISOString().split("T")[0]);
    }

    setDates(list);
    setSelectedDate(list[0]);
  }, []);

  /* ===========================
     LOAD APPROVED BOOKINGS
     =========================== */
const submit = () => {
  if (!facilityName || !selectedSlot) {
    alert("Select facility and slot");
    return;
  }

  const startHour = Number(selectedSlot.split(":")[0]);
  const user = JSON.parse(localStorage.getItem("user"));

  api.post(
    "/bookings",
    {
      citizenName,
      facilityName,
      startTime: `${selectedDate}T${selectedSlot}`,
      endTime: `${selectedDate}T${String(startHour + 1).padStart(2, "0")}:00`
    },
    {
      headers: {
        Role: "CITIZEN",
        "User-Email": user.email
      }
    }
  )
  .then(() => {
    alert("✅ Booking requested");
    refresh();
    setSelectedSlot("");
  })
  .catch(err => {
    alert(err.response?.data || "Booking failed");
  });
};

  /* ===========================
     SLOT GENERATION
     =========================== */
  const today = new Date();
  const selected = new Date(selectedDate);

  const slots = [];
  for (let h = 6; h <= 22; h++) {
    if (
      selected.toDateString() === today.toDateString() &&
      h <= today.getHours()
    ) {
      continue;
    }
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }

  /* ===========================
     UI
     =========================== */
  return (
    <div className="form">
      <div className="row">
        <div>
          <label>Citizen Name</label>
          <input value={citizenName} onChange={e => setCitizenName(e.target.value)} />
        </div>

        <div>
          <label>Select Facility</label>
<select
  value={facilityId}
  onChange={e => {
    const id = e.target.value;
    setFacilityId(id);

    const facility = facilities.find(f => f.id === Number(id));
    setFacilityName(facility?.name || "");
  }}
>            <option value="">Select Facility</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      <label>Select Date</label>
      <div className="date-strip">
        {dates.map(d => {
          const date = new Date(d);
          return (
            <div
              key={d}
              className={`date-tile ${d === selectedDate ? "active" : ""}`}
              onClick={() => {
                setSelectedDate(d);
                setSelectedSlot("");
              }}
            >
              <div className="month">
                {date.toLocaleDateString("en-IN", { month: "short" })}
              </div>
              <div className="date">{date.getDate()}</div>
              <div className="day">
                {date.toLocaleDateString("en-IN", { weekday: "short" })}
              </div>
            </div>
          );
        })}
      </div>

      <label>Select Time Slot</label>
      <SlotGrid
        slots={slots}
        selectedSlot={selectedSlot}
        onSelect={setSelectedSlot}
        blockedSlots={blockedSlots}   // ✅ NEW
      />

      <button className="primary-btn" onClick={submit}>
        Request Booking
      </button>

      {/* ✅ Citizen booking status */}
    </div>
  );
}