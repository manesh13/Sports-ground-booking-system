export default function PreviousBookings({ bookings }) {
  // ✅ Filter non‑pending bookings
  const completed = bookings.filter(
    b => b.status === "APPROVED" || b.status === "REJECTED"
  );

  if (completed.length === 0) {
    return <p>No previous bookings</p>;
  }

  return (
    <>
      {completed.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Facility:</b> {b.facilityName || b.facilityId}</p>
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