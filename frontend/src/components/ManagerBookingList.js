import api from "../api";

export default function ManagerBookingList({ bookings, refresh }) {

  const approve = (id) => {
    api.put(`/bookings/${id}/approve`, {}, {
      headers: { Role: "MANAGER" }
    }).then(refresh);
  };

  const reject = (id) => {
    api.put(`/bookings/${id}/reject`, {}, {
      headers: { Role: "MANAGER" }
    }).then(refresh);
  };

  // ✅ ONLY bookings that need action
  const pendingBookings = bookings.filter(
    b => b.status === "REQUESTED"
  );

  return (
    <div>
      {pendingBookings.length === 0 && (
        <p>No bookings pending for approval</p>
      )}

      {pendingBookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Citizen:</b> {b.citizenName}</p>
          <p><b>Facility:</b> {b.facilityId}</p>
          <p><b>Time:</b> {b.startTime} → {b.endTime}</p>

          <div className="actions">
            <button
              className="approve"
              onClick={() => approve(b.id)}
            >
              Approve
            </button>

            <button
              className="reject"
              onClick={() => reject(b.id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}