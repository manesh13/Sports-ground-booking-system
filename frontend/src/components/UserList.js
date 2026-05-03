import api from "../api";

export default function UserList({ users, refresh, allowDelete }) {

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    api.delete(`/admin/${id}`)
      .then(refresh)
      .catch(err => console.error(err));
  };

  if (!users || users.length === 0) {
    return (
      <div className="bookings-scroll bookings-scroll--empty">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className="bookings-scroll">
      {users.map(u => (
<div key={u.id} className="booking-card">
  <p><b>Email:</b> {u.email}</p>
  <p><b>Role:</b> {u.role}</p>

  <div className="card-actions">
    <button className="delete-btn" onClick={() => deleteUser(u.id)}>
      Delete
    </button>
  </div>
</div>
      ))}
    </div>
  );
}