import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';
import {
  UserCheck,
  BookOpen,
  CheckSquare,
  Award,
  FileText,
  Users,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';

interface FacultyDashboardProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { faculty, students, courses, assignments } = useCollegeData();

  const currentFaculty =
    faculty.find((f) => f.employeeId === currentUser?.employeeId) || faculty[0];

  const atRiskStudents = students.filter(
    (s) => s.attendancePercentage < 75 || s.cgpa < 8.0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Faculty Profile Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentFaculty.avatar}
              alt={currentFaculty.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {currentFaculty.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  {currentFaculty.designation}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Emp ID: <strong className="text-emerald-400 font-mono">{currentFaculty.employeeId}</strong> • {currentFaculty.department} • Office: {currentFaculty.officeRoom}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('faculty-attendance', 'faculty')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" /> Mark Daily Attendance
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('faculty-attendance', 'faculty')}
          className="glass-card p-5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Assigned Classes</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">2 Courses</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            CS601 (Theory) & CS605 (Practicum)
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Enrolled Students</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{students.length * 20} Students</div>
          <div className="text-[11px] text-indigo-400 font-semibold mt-1">Across 3 Batches</div>
        </div>

        <div
          onClick={() => onNavigate('faculty-assignments', 'faculty')}
          className="glass-card p-5 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Course Assignments</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{assignments.length} Created</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">1 Awaiting Grading Feedback</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Research & Citations</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{currentFaculty.publicationsCount} Papers</div>
          <div className="text-[11px] text-purple-400 font-semibold mt-1">h-index: 24 • IEEE Fellow</div>
        </div>
      </div>

      {/* At-Risk Academic Alerts & Assigned Course Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* At Risk Students (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Academic Warning & At-Risk Mentee Alert
              </h3>
              <p className="text-xs text-slate-400">Students with attendance &lt; 75% or GPA requiring faculty intervention.</p>
            </div>
          </div>

          <div className="space-y-3">
            {atRiskStudents.map((stu) => (
              <div
                key={stu.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={stu.avatar}
                    alt={stu.fullName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{stu.fullName}</h4>
                    <p className="text-xs text-slate-400">
                      Roll: <strong className="text-slate-300 font-mono">{stu.studentId}</strong> • {stu.program}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-rose-400 font-bold block">{stu.attendancePercentage}% Attendance</span>
                    <span className="text-slate-400 text-[11px]">CGPA: {stu.cgpa.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => alert(`Opening mentorship communication channel with ${stu.fullName}...`)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white font-semibold transition-colors"
                  >
                    Send Warning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Lecture Schedule for Faculty */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" /> Today's Teaching Schedule
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <span className="text-emerald-400 font-bold block">09:00 AM - 10:30 AM (Active)</span>
              <p className="font-bold text-white">CS601: Distributed Cloud Systems</p>
              <p className="text-slate-400">Turing Hall A-301 • 68 Students</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold block">01:30 PM - 04:30 PM</span>
              <p className="font-bold text-white">CS605: DevOps Practicum Lab</p>
              <p className="text-slate-400">Cloud Lab 4 • Batch A1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
