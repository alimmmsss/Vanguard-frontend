'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, isBefore, startOfToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
    unavailableDates: string[];
}

export default function AvailabilityCalendar({ unavailableDates }: AvailabilityCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(startOfToday());
    const today = startOfToday();

    // Convert string dates to Date objects for comparison
    const blockedDates = unavailableDates.map(d => parseISO(d));

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    const isBlocked = (date: Date) => {
        return blockedDates.some(blocked => isSameDay(blocked, date));
    };

    const isPast = (date: Date) => {
        return isBefore(date, today);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-deep-slate-blue text-lg">Availability</h3>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        disabled={isBefore(addMonths(currentMonth, -1), startOfMonth(today))}
                        className="p-2 hover:bg-slate-50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5 text-slate-600" />
                    </button>
                    <span className="font-medium text-slate-700 min-w-[100px] text-center">
                        {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <ChevronRight className="h-5 w-5 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for start of month */}
                {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((day, dayIdx) => {
                    const blocked = isBlocked(day);
                    const past = isPast(day);

                    let bgClass = 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'; // Available (Green)
                    if (past) bgClass = 'bg-slate-50 text-slate-300 cursor-not-allowed'; // Past
                    else if (blocked) bgClass = 'bg-red-50 text-red-400 cursor-not-allowed'; // Blocked (Red)

                    return (
                        <div
                            key={day.toString()}
                            className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${bgClass}
              `}
                            title={blocked ? 'Booked' : past ? 'Past' : 'Available'}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-4 mt-6 text-xs font-medium text-slate-500 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200" />
                    Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200" />
                    Booked
                </div>
            </div>
        </div>
    );
}
