export default function DateStrip({ dates, selectedDate, onSelect }) {
  const monthLabel = new Date(selectedDate).toLocaleDateString("en-IN", {
    month: "long"
  });

  return (
    <>
      {/* ✅ Month label */}
      <div className="month-label">{monthLabel}</div>

      <div className="date-strip">
        {dates.map(d => {
          const date = new Date(d);
          return (
            <div
              key={d}
              className={`date-tile ${d === selectedDate ? "active" : ""}`}
              onClick={() => onSelect(d)}
            >
              <div className="day">
                {date.toLocaleDateString("en-IN", { weekday: "short" })}
              </div>
              <div className="date">{date.getDate()}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}