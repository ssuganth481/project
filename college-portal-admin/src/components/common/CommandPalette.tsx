import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  CreditCard,
  Bell,
  GraduationCap,
  Users,
  Building2,
  FileText,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, role?: UserRole) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { loginAs } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const commands = [
    {
      title: 'Student Dashboard',
      category: 'Student Portal',
      icon: GraduationCap,
      action: () => {
        loginAs('student');
        onNavigate('student-dashboard', 'student');
      }
    },
    {
      title: 'View CGPA & Gradebook Transcripts',
      category: 'Student Portal',
      icon: Award,
      action: () => {
        loginAs('student');
        onNavigate('student-grades', 'student');
      }
    },
    {
      title: 'Live Timetable & Weekly Schedule',
      category: 'Student Portal',
      icon: Calendar,
      action: () => {
        loginAs('student');
        onNavigate('student-timetable', 'student');
      }
    },
    {
      title: 'Tuition Fee Payment & Receipts',
      category: 'Student Portal',
      icon: CreditCard,
      action: () => {
        loginAs('student');
        onNavigate('student-fees', 'student');
      }
    },
    {
      title: 'LMS Assignments & Submissions',
      category: 'Student Portal',
      icon: FileText,
      action: () => {
        loginAs('student');
        onNavigate('student-assignments', 'student');
      }
    },
    {
      title: 'Faculty Hub - Mark Attendance',
      category: 'Faculty Portal',
      icon: Users,
      action: () => {
        loginAs('faculty');
        onNavigate('faculty-attendance', 'faculty');
      }
    },
    {
      title: 'Faculty Hub - Internal Marks Entry',
      category: 'Faculty Portal',
      icon: Award,
      action: () => {
        loginAs('faculty');
        onNavigate('faculty-grades', 'faculty');
      }
    },
    {
      title: 'Admin ERP - Student Records CRUD',
      category: 'Admin Portal',
      icon: Users,
      action: () => {
        loginAs('admin');
        onNavigate('admin-students', 'admin');
      }
    },
    {
      title: 'Admin ERP - Faculty & Staff Directory',
      category: 'Admin Portal',
      icon: Building2,
      action: () => {
        loginAs('admin');
        onNavigate('admin-faculty', 'admin');
      }
    },
    {
      title: 'Admin ERP - Notice & Circular Broadcast',
      category: 'Admin Portal',
      icon: Bell,
      action: () => {
        loginAs('admin');
        onNavigate('admin-notices', 'admin');
      }
    },
    {
      title: 'Academic Departments Catalog',
      category: 'Public Portal',
      icon: BookOpen,
      action: () => onNavigate('academics')
    },
    {
      title: 'Online Admissions Application Wizard',
      category: 'Public Portal',
      icon: Sparkles,
      action: () => onNavigate('admissions')
    },
    {
      title: 'Campus Placements & Recruiter Records',
      category: 'Public Portal',
      icon: Award,
      action: () => onNavigate('placements')
    },
    {
      title: 'Notice Board & Official Circulars',
      category: 'Public Portal',
      icon: Bell,
      action: () => onNavigate('notices')
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command, page name, or service... (e.g. grades, fees, attendance)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-indigo-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-indigo-300">
                        {cmd.title}
                      </div>
                      <div className="text-xs text-slate-400">{cmd.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-indigo-400 transition-all" />
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-slate-400">
              No matching pages or commands found for "{query}".
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
          <span>Use navigation shortcuts</span>
          <span>Apex University System Search</span>
        </div>
      </div>
    </div>
  );
};
