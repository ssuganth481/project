import React from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { AdmissionApplication } from '../../types';
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Calendar,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdmissionsDesk: React.FC = () => {
  const { admissions, updateAdmissionStatus } = useCollegeData();

  const handleUpdateStatus = (id: string, status: AdmissionApplication['status']) => {
    updateAdmissionStatus(id, status);
    if (status === 'Accepted') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase font-mono">Enrollment Operations</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Admissions Desk & Application Review
          </h1>
          <p className="text-xs text-slate-400">Review incoming candidate dossiers, verify eligibility % scores, schedule interviews, and accept enrollments.</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
          <span>{admissions.length} Applications in Processing Queue</span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">App Ref No</th>
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Target Program</th>
                <th className="p-4 text-center">Score (10+2)</th>
                <th className="p-4 text-center">Date Applied</th>
                <th className="p-4 text-center">Current Status</th>
                <th className="p-4 text-right">Admissions Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {admissions.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-amber-400">{app.applicationNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{app.fullName}</div>
                    <div className="text-[11px] text-slate-400">{app.email} • {app.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{app.program}</div>
                    <div className="text-[10px] text-slate-400">{app.department}</div>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-emerald-400">{app.previousMarks}%</td>
                  <td className="p-4 text-center font-mono text-slate-400">{app.submissionDate}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'Rejected'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : app.status === 'Interview Scheduled'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'Accepted')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-bold transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'Interview Scheduled')}
                        className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white text-[11px] font-bold transition-colors"
                      >
                        Interview
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-[11px] font-bold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
