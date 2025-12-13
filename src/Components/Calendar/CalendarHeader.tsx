import React from 'react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onNext,
  onPrev,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Month Name and Year */}
      <h2 className="text-2xl font-bold text-neutral-800">
        {format(currentDate, 'MMMM yyyy')}
      </h2>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
        >
          Today
        </button>
        
        <div className="flex items-center rounded-md border border-neutral-300 bg-white shadow-sm">
          <button
            onClick={onPrev}
            className="px-3 py-2 text-neutral-600 hover:bg-neutral-50 border-r border-neutral-300 rounded-l-md"
          >
            ← {/* Arrow Icon ki jagah simple text */}
          </button>
          <button
            onClick={onNext}
            className="px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-r-md"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};