import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Award,
  Calendar,
  CheckSquare,
  FileText,
  CreditCard,
  TrendingUp,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { generateGradeTranscriptPDF, generateBonafideCertificatePDF } from '../../utils/pdfGenerator';

interface StudentDashboardProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { students, attendance, grades, assignments, feeTransactions, timetable } = useCollegeData();

  // Find active student (default to first mock student)
  const currentStudent =
    students.find((s) => s.studentId === currentUser?.studentId) || students[0];

  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const pendingFees = feeTransactions.filter((f) => f.status === 'pending');

  const todayClasses = timetable.filter((t) => t.day === 'Monday');

  const handleDownloadTranscript = () => {
    generateGradeTranscriptPDF(currentStudent, grades);
  };

  const handleDownloadBonafide = () => {
    generateBonafideCertificatePDF(currentStudent);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Welcome back, {currentStudent.fullName}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  {currentStudent.enrollmentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Roll ID: <strong className="text-indigo-400 font-mono">{currentStudent.studentId}</strong> • {currentStudent.program} (Semester {currentStudent.semester})
              </p>
            </div>
          </div>

          {/* Quick PDF generator triggers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadTranscript}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Grade Transcript PDF
            </button>
            <button
              onClick={handleDownloadBonafide}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" /> Bonafide Certificate PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* CGPA */}
        <div
          onClick={() => onNavigate('student-grades', 'student')}
          className="glass-card p-5 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Cumulative CGPA</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{currentStudent.cgpa.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Top 5% in {currentStudent.department.slice(0, 16)}
          </div>
        </div>

        {/* Overall Attendance */}
        <div
          onClick={() => onNavigate('student-attendance', 'student')}
          className="glass-card p-5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{currentStudent.attendancePercentage}%</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            ✓ Safe (&gt; 75% Min Exam Threshold)
          </div>
        </div>

        {/* Pending Assignments */}
        <div
          onClick={() => onNavigate('student-assignments', 'student')}
          className="glass-card p-5 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">LMS Assignments</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{pendingAssignments.length} Pending</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">
            Next due in 4 days (Raft Consensus)
          </div>
        </div>

        {/* Fees Status */}
        <div
          onClick={() => onNavigate('student-fees', 'student')}
          className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Fee Status</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">
            {pendingFees.length > 0 ? '$' + pendingFees[0].amount.toLocaleString() : 'All Paid'}
          </div>
          <div className="text-[11px] text-purple-400 font-semibold mt-1">
            {pendingFees.length > 0 ? 'Upcoming Sem 7 Registration' : 'No Overdue Balance'}
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Attendance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" /> Today's Lecture Schedule (Monday)
            </h3>
            <button
              onClick={() => onNavigate('student-timetable', 'student')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Full Timetable <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((slot, index) => (
              <div
                key={slot.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  index === 0
                    ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                    <span className="text-xs font-bold text-white block">{slot.startTime}</span>
                    <span className="text-[10px] text-slate-500">{slot.endTime}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{slot.courseName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {slot.courseCode}
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold animate-pulse">
                          ● Now Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Faculty: {slot.facultyName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {slot.roomNumber}
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 text-indigo-300 font-semibold border border-slate-800">
                    {slot.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Profile & Academic Contacts */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white font-heading">Academic Dossier</h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Academic Faculty Mentor</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{currentStudent.mentorName}</span>
              <span className="text-indigo-400 text-[11px]">Office Hours: Mon, Thu 2:00 PM</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Hostel Residence</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{currentStudent.hostelRoom}</span>
              <span className="text-slate-400 text-[11px]">Warden: Dr. Paul Davis</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Registered Blood Group</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{currentStudent.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
