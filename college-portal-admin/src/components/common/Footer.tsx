import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Award,
  Globe,
  Share2,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../../types';

interface FooterProps {
  onNavigate: (view: string, role?: UserRole) => void;
  onOpenRoleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRoleModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-black text-white font-heading">
                  APEX <span className="text-gradient">UNIVERSITY</span>
                </span>
                <p className="text-[10px] uppercase font-mono text-slate-500">Autonomous Technology Campus</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering the next generation of engineers, researchers, and tech entrepreneurs through world-class labs, collaborative pedagogy, and high-impact industry partnerships.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400">
                <Award className="w-3.5 h-3.5" /> NAAC A++ (3.82 CGPA)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <Globe className="w-3.5 h-3.5" /> NIRF Ranked Top 10
              </span>
            </div>
          </div>

          {/* Quick Academic Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Academics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-indigo-400 transition-colors">
                  Computer Science & Eng.
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-indigo-400 transition-colors">
                  AI & Data Science
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-indigo-400 transition-colors">
                  Electronics & Comm.
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-indigo-400 transition-colors">
                  School of Management (MBA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-indigo-400 transition-colors">
                  Research Centers & Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Portal Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Portals & ERP</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenRoleModal} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Student ERP Dashboard
                </button>
              </li>
              <li>
                <button onClick={onOpenRoleModal} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Faculty Academic Hub
                </button>
              </li>
              <li>
                <button onClick={onOpenRoleModal} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Admin Registrar Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placements')} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Placement Officer Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admissions')} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Online Admission 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Campus Address</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Apex University Campus, Innovation Boulevard, Silicon Valley Corridor, CA 94025</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 456-2739</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>registrar@apex.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900 bg-slate-950/90 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p className="text-slate-500">
              © 2026 Apex University of Technology. All Rights Reserved.
            </p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <p className="text-slate-400 flex items-center gap-1.5">
              <span>Developed by</span>
              <span className="font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Suganth S
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 font-mono text-[11px]">
              System Status: ● Online (All Nodes Operable)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
