import { useState } from "react";
import type { CalendarEvent } from "../../types";

const COLORS = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"];

export default function EventForm({
  selectedDate,
  event,
  onSave,
  onDelete,
  onCancel,
}: {
  selectedDate: Date;
  event: CalendarEvent | null;
  onSave: (e: CalendarEvent) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(event?.title || "");
  const [color, setColor] = useState(event?.color || COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: event?.id || Date.now().toString(),
      title,
      startDate: event?.startDate || selectedDate,
      endDate: event?.endDate || selectedDate,
      color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold">
        {event ? "Edit Event" : "Add Event"}
      </h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
        className="w-full px-3 py-2 bg-zinc-800 rounded outline-none"
        required
      />

      <div className="flex gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full ${
              color === c ? "ring-2 ring-white" : ""
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {event && (
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="text-red-400 text-sm"
          >
            Delete
          </button>
        )}

        <div className="flex gap-2 ml-auto">
          <button type="button" onClick={onCancel} className="btn">
            Cancel
          </button>
          <button type="submit" className="btn-orange">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
