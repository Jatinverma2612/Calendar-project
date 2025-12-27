import { useState, useCallback } from "react";
import { addMonths, subMonths } from "date-fns";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = useCallback(() => {
    setCurrentDate((d) => addMonths(d, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentDate((d) => subMonths(d, 1));
  }, []);

  const goToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  return { currentDate, nextMonth, prevMonth, goToday };
};
