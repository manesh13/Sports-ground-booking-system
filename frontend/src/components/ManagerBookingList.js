import api from "../api";

export default function ManagerBookingList({ bookings, refresh, isManager }) {

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

  const remove = (id) => {
    api.delete(`/bookings/${id}`, {
      headers: { Role: "MANAGER" }
    }).then(refresh);
  };

  return (
    <>
      <button className="refresh-btn" onClick={refresh}>🔄 Refresh</button>

      {bookings.map(b => (
        <div key={b.id} className="booking-card">
          <p><b>Citizen:</b> {b.citizenName}</p>
          <p><b>Facility:</b> {b.facilityId}</p>
          <p><b>Status:</b> {b.status}</p>

          {isManager && (
            <div className="actions">
              {b.status === "REQUESTED" && (
                <>
                  <button className="approve" onClick={() => approve(b.id)}>Approve</button>
                  <button className="reject" onClick={() => reject(b.id)}>Reject</button>
                </>
              )}
              <button className="delete" onClick={() => remove(b.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}