import { MonthView } from "./Components/Calendar/MonthView";
import { CalendarHeader } from "./Components/Calendar/CalendarHeader";
import { useCalendar } from "./Hooks/useCalendar";
import type { CalendarEvent } from "./types";
import { Modal } from "./Components/primitives/Modal";
import { useState, useEffect } from "react";
import { EventForm } from "./Components/Calendar/EventForm";

function App() {
  const { currentDate, goToNextMonth, goToPreviousMonth, goToToday } =
    useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.startDate));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, "id">) => {
    if (selectedEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === selectedEvent.id ? { ...ev, ...eventData } : ev
        )
      );
    } else {
      const newEvent = { ...eventData, id: Date.now().toString() };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((ev) => ev.id !== id)); // List me se hata do
    setIsModalOpen(false);
  };

  const handleAddEvent = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    setEvents([...events, newEvent]);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setIsModalOpen(false);
  };

 return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-6xl mx-auto h-[800px] flex flex-col gap-4">
        <CalendarHeader 
          currentDate={currentDate}
          onNext={goToNextMonth}
          onPrev={goToPreviousMonth}
          onToday={goToToday}
        />

        <MonthView 
          currentDate={currentDate} 
          events={events} 
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedEvent ? "Edit Event" : "Add New Event"}
        >
          <EventForm 
            key={selectedEvent ? selectedEvent.id : 'new'} 
            selectedDate={selectedDate}
            eventToEdit={selectedEvent}
            onSubmit={handleSaveEvent}
            onDelete={handleDeleteEvent}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
