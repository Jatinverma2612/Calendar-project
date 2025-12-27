import { useEffect, useState } from "react";
import { useCalendar } from "./Hooks/useCalendar";
import CalendarHeader from "./Components/Calendar/CalendarHeader";
import MonthView from "./Components/Calendar/MonthView";
import Modal from "./Components/primitives/Modal";
import EventForm from "./Components/Calendar/EventForm";
import type { CalendarEvent } from "./types";

export default function App() {
  const { currentDate, nextMonth, prevMonth, goToday } = useCalendar();

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        onNext={nextMonth}
        onPrev={prevMonth}
        onToday={goToday}
      />

      <MonthView
        currentDate={currentDate}
        events={events}
        onDateClick={(d) => {
          setSelectedDate(d);
          setSelectedEvent(null);
        }}
        onEventClick={(e) => {
          setSelectedEvent(e);
          setSelectedDate(new Date(e.startDate));
        }}
      />

      <Modal open={!!selectedDate} onClose={() => setSelectedDate(null)}>
        {selectedDate && (
          <EventForm
            selectedDate={selectedDate}
            event={selectedEvent}
            onCancel={() => setSelectedDate(null)}
            onDelete={(id) => {
              setEvents(events.filter((e) => e.id !== id));
              setSelectedDate(null);
            }}
            onSave={(ev) => {
              setEvents((prev) => {
                const exists = prev.find((e) => e.id === ev.id);
                return exists
                  ? prev.map((e) => (e.id === ev.id ? ev : e))
                  : [...prev, ev];
              });
              setSelectedDate(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
