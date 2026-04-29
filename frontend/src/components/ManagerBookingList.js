import api from "../api";

export default function ManagerBookingList({ bookings, refresh }) {

  const approve = (id) => {
    api.put(`/bookings/${id}/approve`)
       .then(refresh);
  };

  const reject = (id) => {
    api.put(`/bookings/${id}/reject`)
       .then(refresh);
  };

  const pendingBookings = bookings.filter(
    b => b.status === "REQUESTED"
  );

  return (
    <div className="bookings-scroll"> {/* ✅ SCROLL CONTAINER */}

      {pendingBookings.length === 0 && (
        <p>No bookings pending for approval</p>
      )}

      {pendingBookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Citizen:</b> {b.userEmail}</p>
          <p><b>Facility:</b> {b.facilityName}</p>
          <p>
            <b>Time:</b>{" "}
{new Date(b.startTime).toLocaleDateString()} | {" "}
{new Date(b.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} →
{new Date(b.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>

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