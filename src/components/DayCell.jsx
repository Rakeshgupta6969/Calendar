import React from 'react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { useEvents } from '../context/EventContext';

const colorMap = {
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
  green: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30',
  yellow: 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
};

const DayCell = ({
  day,
  formattedDate,
  isToday,
  isCurrentMonth,
  onClick,
  onEventClick,
}) => {
  const { events } = useEvents();
  const dateStr = format(day, 'yyyy-MM-dd');
  
  // Sort events by time if available
  const dayEvents = events
    .filter((e) => e.date === dateStr)
    .sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });

  return (
    <div
      onClick={onClick}
      className={cn(
        "min-h-[80px] sm:min-h-[120px] bg-transparent p-1 sm:p-2 transition-all duration-300 cursor-pointer group hover:bg-white/5",
        !isCurrentMonth && "text-slate-600"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-1">
          <span
            className={cn(
              "flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm font-medium rounded-full transition-colors",
              isToday
                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : "text-slate-300 group-hover:text-blue-400",
              !isCurrentMonth && !isToday && "text-slate-600"
            )}
          >
            {formattedDate}
          </span>
          {dayEvents.length > 0 && (
             <span className="text-[10px] sm:hidden font-medium text-slate-300 bg-white/10 px-1.5 rounded-full border border-white/5">
               {dayEvents.length}
             </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {dayEvents.map((event) => (
            <div
              key={event.id}
              onClick={(e) => onEventClick(event, e)}
              className={cn(
                "px-2 py-1 text-xs text-left truncate rounded border transition-colors hidden sm:block",
                colorMap[event.color || 'blue']
              )}
              title={`${event.time ? event.time + ' - ' : ''}${event.title}`}
            >
              {event.time && <span className="font-semibold mr-1">{event.time}</span>}
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayCell;
