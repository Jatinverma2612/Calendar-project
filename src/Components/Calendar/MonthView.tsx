import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from 'date-fns';
import { CalendarCell } from './CalendarCell';
import type { CalendarEvent } from '../../types';


interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onDateClick = () => {}, 
}) => {
  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = addDays(startDate, 41);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50">
        {weekDays.map((day) => (
          <div key={day} className="py-2 text-center text-sm font-semibold text-neutral-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-1">
        {days.map((day) => {
          const dayEvents = events.filter((event) => 
            isSameDay(day, event.startDate)
          );
          return (
            <CalendarCell
              key={day.toString()}
              date={day}
              events={dayEvents}
              isToday={isSameDay(day, new Date())}
              isCurrentMonth={isSameMonth(day, monthStart)}
              onClick={onDateClick}
              onEventClick={onEventClick!}
            />
          );
        })}
      </div>
    </div>
  );
};