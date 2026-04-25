export default function SlotGrid({ slots, selectedSlot, onSelect }) {
  return (
    <div className="slot-grid">
      {slots.map(slot => (
        <div
          key={slot}
          className={`slot ${slot === selectedSlot ? "active" : ""}`}
          onClick={() => onSelect(slot)}
        >
          {format(slot)}
        </div>
      ))}
    </div>
  );
}

function format(time) {
  const hour = parseInt(time.split(":")[0], 10);
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:00 ${hour < 12 ? "AM" : "PM"}`;
}
``