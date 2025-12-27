import { format, isSameDay } from "date-fns";
import type { CalendarEvent } from "../../types";

export default function CalendarCell({
  date,
  events,
  isCurrentMonth,
  onDateClick,
  onEventClick,
}: {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  onDateClick: (d: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}) {
  const today = isSameDay(date, new Date());

  return (
    <div
      onClick={() => onDateClick(date)}
      className={`
        min-h-[110px] p-2 rounded-xl cursor-pointer transition
        ${isCurrentMonth ? "bg-zinc-900" : "bg-zinc-800 text-zinc-500"}
        hover:bg-zinc-700
        ${today ? "ring-2 ring-orange-500" : ""}
      `}
    >
      <div className="text-sm font-semibold mb-1">
        {format(date, "d")}
      </div>

      <div className="space-y-1">
        {events.slice(0, 2).map((e) => (
          <div
            key={e.id}
            onClick={(ev) => {
              ev.stopPropagation();
              onEventClick(e);
            }}
            className="text-xs px-2 py-1 rounded text-black truncate"
            style={{ backgroundColor: e.color }}
          >
            {e.title}
          </div>
        ))}

        {events.length > 2 && (
          <p className="text-[10px] text-zinc-400">
            +{events.length - 2} more
          </p>
        )}
      </div>
    </div>
  );
}
