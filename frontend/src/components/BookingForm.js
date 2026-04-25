import { useEffect, useState } from "react";
import api from "../api";
import SlotGrid from "./SlotGrid";
import MyBookings from "./MyBookings";

export default function BookingForm({ refresh }) {
  const [citizenName, setCitizenName] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [facilityId, setFacilityId] = useState("");
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
  useEffect(() => {
    if (!facilityId || !selectedDate) return;

    api.get("/bookings", {
      headers: { Role: "MANAGER" }
    }).then(res => {
      const approved = res.data
        .filter(
          b =>
            b.facilityId === Number(facilityId) &&
            b.status === "APPROVED" &&
            b.startTime.startsWith(selectedDate)
        )
        .map(b => b.startTime.substring(11, 16)); // "HH:mm"

      setBlockedSlots(approved);
    });
  }, [facilityId, selectedDate]);

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
     SUBMIT BOOKING
     =========================== */
  const submit = () => {
    if (!citizenName || !facilityId || !selectedSlot) {
      alert("Please fill all fields");
      return;
    }

    const startHour = Number(selectedSlot.split(":")[0]);

    api.post(
      "/bookings",
      {
        citizenName,
        facilityId: Number(facilityId),
        startTime: `${selectedDate}T${selectedSlot}`,
        endTime: `${selectedDate}T${String(startHour + 1).padStart(2, "0")}:00`
      },
      { headers: { Role: "CITIZEN" } }
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
          <select value={facilityId} onChange={e => setFacilityId(e.target.value)}>
            <option value="">Select Facility</option>
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