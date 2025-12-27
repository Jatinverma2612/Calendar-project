import {
  startOfMonth,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import CalendarCell from "./CalendarCell";
import type { CalendarEvent } from "../../types";

export default function MonthView({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}: {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (d: Date) => void;
  onEventClick: (e: CalendarEvent) => void;
}) {
  const start = startOfWeek(startOfMonth(currentDate));
  const days = eachDayOfInterval({
    start,
    end: addDays(start, 41),
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <CalendarCell
          key={day.toString()}
          date={day}
          events={events.filter(
            (e) =>
              new Date(e.startDate).toDateString() === day.toDateString()
          )}
          isCurrentMonth={isSameMonth(day, currentDate)}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
}
