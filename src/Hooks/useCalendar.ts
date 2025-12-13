import { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns'; 

interface CalendarState {
  currentDate: Date;
  view: 'month' | 'week';
}

export const useCalendar = () => {
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(),
    view: 'month',
  });


  const goToNextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: addMonths(prev.currentDate, 1),
    }));
  }, []);


  const goToPreviousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: subMonths(prev.currentDate, 1),
    }));
  }, []);


  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  };
};