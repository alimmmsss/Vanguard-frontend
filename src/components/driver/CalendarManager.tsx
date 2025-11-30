'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, isBefore, startOfToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

export default function CalendarManager() {
    const [currentMonth, setCurrentMonth] = useState(startOfToday());
    const today = startOfToday();
    const [blockedDates, setBlockedDates] = useState<Date[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    const toggleDate = (date: Date) => {
        if (isBefore(date, today)) return;

        const isBlocked = blockedDates.some(d => isSameDay(d, date));
        if (isBlocked) {
            setBlockedDates(prev => prev.filter(d => !isSameDay(d, date)));
        } else {
            setBlockedDates(prev => [...prev, date]);
        }
        setHasChanges(true);
    };

    const handleSave = async () => {
        // Mock API save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHasChanges(false);
        alert('Availability updated!');
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-deep-slate-blue">Manage Availability</h2>
                    <p className="text-slate-500 text-sm">Click dates to mark them as unavailable.</p>
                </div>

                {hasChanges && (
                    <button
                        onClick={handleSave}
                        className="bg-deep-slate-blue text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-deep-slate-blue/20 animate-pulse"
                    >
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl">
                <button onClick={prevMonth} disabled={isBefore(addMonths(currentMonth, -1), startOfMonth(today))} className="p-2 hover:bg-white rounded-lg disabled:opacity-30 transition-colors">
                    <ChevronLeft className="h-5 w-5 text-slate-600" />
                </button>
                <span className="font-bold text-lg text-slate-700">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <ChevronRight className="h-5 w-5 text-slate-600" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((day) => {
                    const isBlocked = blockedDates.some(d => isSameDay(d, day));
                    const isPast = isBefore(day, today);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => toggleDate(day)}
                            disabled={isPast}
                            className={`
                aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all
                ${isPast
                                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                    : isBlocked
                                        ? 'bg-red-50 text-red-500 border-2 border-red-100 hover:bg-red-100'
                                        : 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100 hover:bg-emerald-100'
                                }
              `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-6 mt-8 justify-center border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-emerald-50 border-2 border-emerald-100" />
                    <span className="text-sm font-medium text-slate-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-red-50 border-2 border-red-100" />
                    <span className="text-sm font-medium text-slate-600">Unavailable (Blocked)</span>
                </div>
            </div>
        </div>
    );
}
