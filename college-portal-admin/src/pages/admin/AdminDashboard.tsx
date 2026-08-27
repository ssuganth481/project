import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  Bell,
  CheckCircle2,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AdminDashboardProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { students, faculty, departments, admissions, feeTransactions } = useCollegeData();

  const deptData = departments.map((d) => ({
    name: d.code,
    students: d.studentCount,
    faculty: d.facultyCount
  }));

  const admissionStatusData = [
    { name: 'Accepted', value: 42, color: '#10b981' },
    { name: 'Under Review', value: 38, color: '#6366f1' },
    { name: 'Interview Scheduled', value: 16, color: '#f59e0b' },
    { name: 'Rejected', value: 4, color: '#ef4444' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Executive ERP Administration
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[11px] font-bold border border-purple-500/30">
                  Registrar Clearance
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Apex Central Academic Database • Connected: <strong className="text-white">6 Departments, {students.length * 40} Active Students</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('admin-students', 'admin')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" /> Manage Students
            </button>
            <button
              onClick={() => onNavigate('admin-notices', 'admin')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-purple-400" /> Broadcast Notice
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('admin-students', 'admin')}
          className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Enrolled</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">2,700 Students</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">Across 6 Academic Schools</div>
        </div>

        <div
          onClick={() => onNavigate('admin-faculty', 'admin')}
          className="glass-card p-5 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Teaching Faculty</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">118 Professors</div>
          <div className="text-[11px] text-indigo-400 font-semibold mt-1">Student-Faculty Ratio 22:1</div>
        </div>

        <div
          onClick={() => onNavigate('admin-finance', 'admin')}
          className="glass-card p-5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Fee Revenue YTD</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">$4.95M Collected</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">94.2% Collection Target Met</div>
        </div>

        <div
          onClick={() => onNavigate('admin-admissions', 'admin')}
          className="glass-card p-5 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Admissions Desk</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{admissions.length + 840} Applications</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">Fall 2026-27 Intake</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Headcount Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" /> Department Student Enrollment Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="students" fill="#a855f7" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Admission Status Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> 2026 Admission Funnel Breakdown (%)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={admissionStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {admissionStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
