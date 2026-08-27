import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const { timetable } = useCollegeData();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSlots = timetable.filter((t) => t.day === selectedDay);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase font-mono">Academic Schedule</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Weekly Class Timetable
          </h1>
          <p className="text-xs text-slate-400">Semester 6 • B.Tech Computer Science & Engineering (Section A)</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Live Session: <strong>CS601 (09:00 - 10:30 AM)</strong></span>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedDay === d
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Slots Matrix */}
      <div className="space-y-4">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot, idx) => (
            <div
              key={slot.id}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono shrink-0">
                  <span className="text-sm font-extrabold text-white block">{slot.startTime}</span>
                  <span className="text-xs text-slate-500">{slot.endTime}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white font-heading">{slot.courseName}</h3>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                      {slot.courseCode}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      slot.type === 'Lab'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {slot.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" /> Instructor: <strong className="text-slate-300">{slot.facultyName}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-start md:self-center">
                <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>Room: <strong className="text-white">{slot.roomNumber}</strong></span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-sm text-slate-500 glass-card rounded-2xl border border-slate-800">
            No scheduled lectures or labs for {selectedDay}.
          </div>
        )}
      </div>
    </div>
  );
};
