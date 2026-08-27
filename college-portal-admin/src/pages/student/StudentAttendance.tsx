import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import {
  CheckSquare,
  AlertTriangle,
  Calculator,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { attendance } = useCollegeData();
  const [selectedSubject, setSelectedSubject] = useState(attendance[0]);

  // Leave Form
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Attendance Calculator
  const [calcSubjectId, setCalcSubjectId] = useState(attendance[0]?.id || '');
  const [plannedMisses, setPlannedMisses] = useState<number>(2);

  const selectedForCalc = attendance.find((a) => a.id === calcSubjectId) || attendance[0];
  const projectedClasses = selectedForCalc ? selectedForCalc.totalClasses + plannedMisses : 0;
  const projectedAttended = selectedForCalc ? selectedForCalc.attendedClasses : 0;
  const projectedPercentage = projectedClasses > 0 ? ((projectedAttended / projectedClasses) * 100).toFixed(1) : '0';

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason || !leaveDate) return;
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setLeaveReason('');
      setLeaveDate('');
    }, 4000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Academic Compliance</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Attendance Records & Analysis
          </h1>
          <p className="text-xs text-slate-400">Institutional Mandate: Minimum 75% attendance required for semester end-term exams.</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Compliant Status: 88.5% Cumulative</span>
        </div>
      </div>

      {/* Subject Wise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {attendance.map((att) => {
          const isSafe = att.percentage >= 75;
          const isSelected = selectedSubject?.id === att.id;
          return (
            <div
              key={att.id}
              onClick={() => setSelectedSubject(att)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50 shadow-xl'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                    {att.courseCode}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">{att.courseName}</h3>
                  <p className="text-[11px] text-slate-400">Faculty: {att.facultyName}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-black font-heading ${isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {att.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      isSafe ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-amber-500'
                    }`}
                    style={{ width: `${Math.min(att.percentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Attended: {att.attendedClasses} / {att.totalClasses} classes</span>
                  <span>{isSafe ? 'Eligible for Finals' : 'Attendance Shortage'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Section: History & Interactive Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Log History (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading">
              Session-by-Session Log ({selectedSubject?.courseCode})
            </h3>
            <span className="text-xs text-slate-400">Total Records: {selectedSubject?.history.length}</span>
          </div>

          <div className="space-y-2.5">
            {selectedSubject?.history.map((h, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">{h.date}</span>
                  <span className="text-slate-200 font-medium">{h.topicCovered || 'Regular Class Session'}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    h.status === 'present'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : h.status === 'late'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 75% Safety Calculator & Leave Application */}
        <div className="space-y-6">
          {/* Calculator */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" /> Attendance Safe Predictor
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Subject</label>
                <select
                  value={calcSubjectId}
                  onChange={(e) => setCalcSubjectId(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                >
                  {attendance.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.courseCode} ({a.percentage}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  If I miss next <strong className="text-white">{plannedMisses}</strong> classes:
                </label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={plannedMisses}
                  onChange={(e) => setPlannedMisses(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[11px]">Projected Percentage:</span>
                <span
                  className={`text-2xl font-black font-heading ${
                    Number(projectedPercentage) >= 75 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {projectedPercentage}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {Number(projectedPercentage) >= 75 ? 'Safe for Hall Ticket' : '⚠️ Risk of Exam Debarment'}
                </span>
              </div>
            </div>
          </div>

          {/* Leave Request Form */}
          <form onSubmit={handleApplyLeave} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Submit Duty / Medical Leave</h4>
            <div>
              <label className="block text-slate-400 mb-1">Date of Leave</label>
              <input
                type="date"
                required
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Reason / Duty Description</label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Hackathon participation, medical leave..."
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none"
              />
            </div>

            {leaveSubmitted ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-semibold text-center text-xs">
                ✓ Leave application forwarded to HOD!
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit to Department HOD
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
