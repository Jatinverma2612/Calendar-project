import { format } from "date-fns";

interface Props {
  currentDate: Date;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onNext,
  onPrev,
  onToday,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">
        {format(currentDate, "MMMM yyyy")}
      </h2>

      <div className="flex gap-2">
        <button onClick={onToday} className="btn">Today</button>
        <button onClick={onPrev} className="btn">←</button>
        <button onClick={onNext} className="btn">→</button>
      </div>
    </div>
  );
}
