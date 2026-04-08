import React, { useState } from 'react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  format,
} from 'date-fns';
import Header from './Header';
import DayCell from './DayCell';
import EventModal from './EventModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const onDateClick = (day) => {
    setSelectedDate(day);
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  const onEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedDate(new Date(event.date));
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <DayCell
            key={day.toISOString()}
            day={cloneDay}
            monthStart={monthStart}
            formattedDate={formattedDate}
            isToday={isSameDay(day, new Date())}
            isCurrentMonth={isSameMonth(day, monthStart)}
            onClick={() => onDateClick(cloneDay)}
            onEventClick={onEventClick}
          />
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-col">{rows}</div>;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex flex-col bg-transparent">
      <Header
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToToday}
      />
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
        {daysOfWeek.map((dayName) => (
          <div
            key={dayName}
            className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider sm:tracking-widest"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white/5 gap-px border-b border-white/5">
        <div className="flex flex-col bg-white/5 gap-px">
           {renderCells()}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

export default Calendar;
