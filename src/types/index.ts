export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
}