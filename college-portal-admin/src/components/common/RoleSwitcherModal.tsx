import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  Globe,
  X,
  Sparkles,
  ArrowRight,
  LogIn,
  KeyRound,
  UserCheck
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  onSelectRole
}) => {
  const { currentRole, loginAs, loginWithCredentials } = useAuth();
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>('student');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleQuickSelect = (role: UserRole) => {
    loginAs(role);
    onSelectRole(role);
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    loginWithCredentials(customEmail, customRole, customName || undefined);
    onSelectRole(customRole);
    onClose();
  };

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Student Portal',
      persona: 'Alex Johnson (B.Tech CSE - 6th Sem)',
      description: 'Check attendance, timetable, submit assignments, view CGPA grades & pay fees.',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400',
      badge: 'Student ID: APX2023CSE042'
    },
    {
      id: 'faculty' as UserRole,
      title: 'Faculty Academic Hub',
      persona: 'Dr. Sarah Lin (Professor & HOD)',
      description: 'Mark student attendance, manage course syllabi, enter exam grades & upload assignments.',
      icon: UserCheck,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      badge: 'Emp ID: EMP-FAC-0101'
    },
    {
      id: 'admin' as UserRole,
      title: 'Enterprise Admin ERP',
      persona: 'Prof. Robert Sterling (Registrar & Dean)',
      description: 'Institutional analytics, student/faculty records CRUD, fee collection, notice broadcasting.',
      icon: ShieldCheck,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      badge: 'Admin Access: Full ERP'
    },
    {
      id: 'placement' as UserRole,
      title: 'Placement Officer Portal',
      persona: 'Elena Vance (Head of Placements)',
      description: 'Manage recruiter companies, student eligibility shortlists, job drives & stats.',
      icon: Briefcase,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      badge: 'Corporate Relations'
    },
    {
      id: 'public' as UserRole,
      title: 'Public Institutional Portal',
      persona: 'Prospective Student / Visitor View',
      description: 'Explore campus virtual tours, academic courses, online admission applications & public circulars.',
      icon: Globe,
      color: 'from-slate-500/20 to-slate-700/20 border-slate-600/30 text-slate-300',
      badge: 'Public Website'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Select Access Role & Demo Login</h2>
              <p className="text-xs text-slate-400">Switch personas instantly to explore role-based portal features</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3">
          <button
            onClick={() => setActiveTab('quick')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quick'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 1-Click Instant Demo Personas
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Custom Credentials
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'quick' ? (
            <div className="grid gap-3">
              {roles.map((r) => {
                const Icon = r.icon;
                const isCurrent = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleQuickSelect(r.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 group ${
                      isCurrent
                        ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/50'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br border ${r.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                          {r.title}
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Active
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-300 mb-1">{r.persona}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center text-indigo-400">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Institutional Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@apex.edu"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Role Permission</label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="student">Student Portal</option>
                  <option value="faculty">Faculty Portal</option>
                  <option value="admin">Administrator (ERP)</option>
                  <option value="placement">Placement Officer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <LogIn className="w-4 h-4" /> Authenticate & Access Portal
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800/80 text-center text-xs text-slate-500">
          Apex University Unified Authentication Gateway • Mock ERP Engine v2.4
        </div>
      </div>
    </div>
  );
};
