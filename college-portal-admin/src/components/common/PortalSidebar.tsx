import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Award,
  FileText,
  CreditCard,
  Users,
  Building2,
  Bell,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  LogOut,
  ArrowLeft,
  Briefcase,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface PortalSidebarProps {
  currentView: string;
  onNavigate: (view: string, role?: UserRole) => void;
  onOpenRoleModal: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  currentView,
  onNavigate,
  onOpenRoleModal
}) => {
  const { currentUser, currentRole, logout } = useAuth();

  const getStudentLinks = () => [
    { id: 'student-dashboard', label: 'Academic Overview', icon: LayoutDashboard },
    { id: 'student-timetable', label: 'Class Timetable', icon: Calendar },
    { id: 'student-attendance', label: 'Attendance (75% Check)', icon: CheckSquare },
    { id: 'student-grades', label: 'Grades & Transcript', icon: Award },
    { id: 'student-assignments', label: 'LMS Assignments', icon: FileText },
    { id: 'student-fees', label: 'Fee Invoices & Pay', icon: CreditCard }
  ];

  const getFacultyLinks = () => [
    { id: 'faculty-dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
    { id: 'faculty-attendance', label: 'Mark Attendance', icon: CheckSquare },
    { id: 'faculty-grades', label: 'Marks Entry & Grading', icon: Award },
    { id: 'faculty-assignments', label: 'Assign Homework & Labs', icon: FileText }
  ];

  const getAdminLinks = () => [
    { id: 'admin-dashboard', label: 'Executive ERP Overview', icon: LayoutDashboard },
    { id: 'admin-students', label: 'Student Directory & CRUD', icon: Users },
    { id: 'admin-faculty', label: 'Faculty Directory', icon: UserCheck },
    { id: 'admin-departments', label: 'Department Manager', icon: Building2 },
    { id: 'admin-admissions', label: 'Admissions Desk', icon: UserPlus },
    { id: 'admin-finance', label: 'Fee Revenue & Dues', icon: CreditCard },
    { id: 'admin-notices', label: 'Broadcast Circular', icon: Bell }
  ];

  const getLinks = () => {
    switch (currentRole) {
      case 'student':
        return getStudentLinks();
      case 'faculty':
        return getFacultyLinks();
      case 'admin':
        return getAdminLinks();
      case 'placement':
        return [
          { id: 'placements', label: 'Placement Console', icon: Briefcase },
          { id: 'admin-students', label: 'Eligible Candidates', icon: Users }
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  const getRoleBadge = () => {
    switch (currentRole) {
      case 'student':
        return { text: 'STUDENT PORTAL', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
      case 'faculty':
        return { text: 'FACULTY HUB', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'admin':
        return { text: 'ENTERPRISE ADMIN ERP', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      default:
        return { text: 'PORTAL USER', bg: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const badge = getRoleBadge();

  return (
    <aside className="w-64 shrink-0 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-5rem)] sticky top-20 select-none">
      <div className="p-4 space-y-4">
        {/* User Card */}
        {currentUser && (
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {currentUser.studentId || currentUser.employeeId || currentUser.email}
                </p>
              </div>
            </div>
            <div className="mt-2.5">
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                {badge.text}
              </span>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Navigation</p>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id, currentRole)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/40">
        <button
          onClick={onOpenRoleModal}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/50 transition-colors"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Switch Role Demo
        </button>

        <button
          onClick={() => onNavigate('home', 'public')}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
        </button>

        <button
          onClick={() => {
            logout();
            onNavigate('home', 'public');
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
};
