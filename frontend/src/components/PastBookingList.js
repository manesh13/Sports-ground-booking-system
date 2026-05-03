export default function PastBookingList({ bookings }) {
  const pastBookings = bookings.filter(
    b => b.status !== "REQUESTED"
  );

  if (pastBookings.length === 0) {
    return (
      <div className="bookings-scroll bookings-scroll--empty">
        <p>No past requests</p>
      </div>
    );
  }

  return (
    <div className="bookings-scroll">
      {pastBookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Citizen:</b> {b.userEmail}</p>
          <p><b>Facility:</b> {b.facilityName}</p>
          <p>
            <b>Time:</b>{" "}
            {new Date(b.startTime).toLocaleString()} →{" "}
            {new Date(b.endTime).toLocaleString()}
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
