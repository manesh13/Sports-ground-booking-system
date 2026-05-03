export default function SlotGrid({ slots, selectedSlot, onSelect, blockedSlots = [] }) {
  const blocked = new Set(blockedSlots);

  return (
    <div className="slot-grid">
      {slots.map(slot => {
        const isBooked = blocked.has(slot);
        return (
          <div
            key={slot}
            className={`slot ${slot === selectedSlot ? "active" : ""} ${isBooked ? "slot-booked" : ""}`}
            onClick={() => {
              if (!isBooked) onSelect(slot);
            }}
            aria-disabled={isBooked}
            title={isBooked ? "This time slot is already booked" : undefined}
          >
            {format(slot)}
          </div>
        );
      })}
    </div>
  );
}

function format(time) {
  const hour = parseInt(time.split(":")[0], 10);
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${hour < 12 ? "AM" : "PM"}`;
}
