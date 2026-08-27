import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Search,
  LogIn,
  LogOut,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Award,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, role?: UserRole) => void;
  onOpenRoleModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenRoleModal,
  onOpenCommandPalette
}) => {
  const { currentUser, currentRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'academics', label: 'Academics & Depts' },
    { id: 'admissions', label: 'Admissions 2026' },
    { id: 'placements', label: 'Placements' },
    { id: 'campus-life', label: 'Campus Life' },
    { id: 'notices', label: 'Notices & Circulars' }
  ];

  const getPortalLabel = () => {
    switch (currentRole) {
      case 'student':
        return 'Student Portal';
      case 'faculty':
        return 'Faculty Hub';
      case 'admin':
        return 'Admin ERP';
      case 'placement':
        return 'T&P Officer';
      default:
        return 'Portal Login';
    }
  };

  const getPortalDashboardId = () => {
    switch (currentRole) {
      case 'student':
        return 'student-dashboard';
      case 'faculty':
        return 'faculty-dashboard';
      case 'admin':
        return 'admin-dashboard';
      case 'placement':
        return 'placements';
      default:
        return 'home';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      {/* Top micro-bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-slate-900/90 text-[11px] text-slate-400 border-b border-slate-800/50">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
            <Award className="w-3.5 h-3.5" /> NAAC A++ Accredited • NIRF Top 10 Institutional Rank
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Phone className="w-3 h-3" /> Admissions Hotline: +1 (800) 456-APEX (2739)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold animate-pulse">
            ● Admissions Open: Fall 2026-27
          </span>
          <button
            onClick={() => onNavigate('notices')}
            className="hover:text-white transition-colors"
          >
            Exam Circulars
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenRoleModal}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Switch Role / Demo Persona
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </div>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-heading">
                APEX <span className="text-gradient">UNIVERSITY</span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-mono font-medium">
                Institute of Technology & Science
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Portal Access */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all group"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
              <span>Search portal...</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Portal Action / Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-indigo-500/40"
                  />
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-indigo-400 font-medium capitalize">
                      {getPortalLabel()}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                {/* User Dropdown Menu */}
                {portalDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setPortalDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate(getPortalDashboardId(), currentRole);
                        setPortalDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-400" /> Go to {getPortalLabel()}
                    </button>

                    <button
                      onClick={() => {
                        onOpenRoleModal();
                        setPortalDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" /> Switch Role Persona
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        onNavigate('home', 'public');
                        setPortalDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-2 mt-1 border-t border-slate-800"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenRoleModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <LogIn className="w-4 h-4" /> Portal Login / Roles
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold ${
                currentView === link.id
                  ? 'bg-indigo-600/20 text-indigo-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenRoleModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {currentUser ? `Switch Role (${currentUser.name})` : 'Portal Login & Demo Switcher'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
