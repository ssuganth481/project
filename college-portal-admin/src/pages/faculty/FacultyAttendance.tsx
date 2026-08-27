import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import {
  CheckSquare,
  Users,
  Calendar,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyAttendance: React.FC = () => {
  const { students, markAttendanceForCourse } = useCollegeData();

  const [selectedCourse, setSelectedCourse] = useState('CS601');
  const [topicCovered, setTopicCovered] = useState('Consensus Protocols & Byzantine Fault Tolerance');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  // Attendance state for students
  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const initial: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach((s) => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendanceState(updated);
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicCovered) return;

    // Apply to college context
    markAttendanceForCourse(selectedCourse, sessionDate, 'present', topicCovered);

    setSavedSuccess(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  const presentCount = Object.values(attendanceState).filter((v) => v === 'present').length;
  const absentCount = Object.values(attendanceState).filter((v) => v === 'absent').length;
  const lateCount = Object.values(attendanceState).filter((v) => v === 'late').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Academic Class Register</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Student Attendance Marking
          </h1>
          <p className="text-xs text-slate-400">Record lecture attendance, record lecture syllabus topics, and sync to student ERP instantly.</p>
        </div>

        <button
          onClick={handleMarkAllPresent}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
        >
          ✓ Set All as Present
        </button>
      </div>

      {/* Session Config Bar */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Course Code & Section</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none"
          >
            <option value="CS601">CS601: Distributed Cloud Systems (6th Sem A)</option>
            <option value="CS605">CS605: DevOps Practicum Lab (6th Sem Lab 1)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Lecture Date</label>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Syllabus Topic Covered</label>
          <input
            type="text"
            required
            placeholder="e.g. Paxos & Raft Consensus algorithms"
            value={topicCovered}
            onChange={(e) => setTopicCovered(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Live Stats summary */}
      <div className="flex items-center gap-4 text-xs">
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
          Present: {presentCount}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
          Absent: {absentCount}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
          Late: {lateCount}
        </span>
      </div>

      {/* Student Roster Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Enrolled Student Cohort ({students.length} Students)</h3>
          <span className="text-xs text-slate-400 font-mono">Realtime Roster</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {students.map((stu) => {
            const status = attendanceState[stu.id] || 'present';
            return (
              <div
                key={stu.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={stu.avatar}
                    alt={stu.fullName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{stu.fullName}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {stu.studentId} • Current Att: <strong className="text-indigo-400">{stu.attendancePercentage}%</strong>
                    </p>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(stu.id, 'present')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      status === 'present'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(stu.id, 'late')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      status === 'late'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(stu.id, 'absent')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      status === 'absent'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Bottom Bar */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {savedSuccess ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-pulse">
                ✓ Attendance registered successfully into student records!
              </span>
            ) : (
              <span>Confirming records will automatically recalculate % for 75% thresholds.</span>
            )}
          </div>

          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save & Sync Session Attendance
          </button>
        </div>
      </div>
    </div>
  );
};
