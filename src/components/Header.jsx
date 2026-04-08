import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Header = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-transparent border-b border-white/5">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={onToday}
          className="hidden sm:block px-3 py-1.5 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white rounded-md transition-all border border-white/5"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevMonth}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
