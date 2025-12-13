import React from "react";
import { format } from "date-fns";
import type { CalendarEvent } from "../../types";

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
  onClick,
  onEventClick,
}) => {
  return (
    <div
      onClick={() => onClick(date)}
      className={`
        min-h-[100px] border border-neutral-200 p-2 transition-colors cursor-pointer
        ${
          isCurrentMonth
            ? "bg-white hover:bg-neutral-50"
            : "bg-neutral-50 text-neutral-400"
        }
        ${isToday ? "bg-primary-50" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={`
            text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
            ${isToday ? "bg-primary-500 text-white" : "text-neutral-900"}
          `}
        >
          {format(date, "d")}
        </span>
      </div>

      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className="text-xs px-2 py-1 rounded truncate text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: event.color || "#0ea5e9" }}
          >
            {event.title}
          </div>
        ))}

        {events.length > 3 && (
          <div className="text-xs text-primary-600 font-medium pl-1">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};
