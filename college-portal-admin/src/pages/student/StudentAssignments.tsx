import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Assignment } from '../../types';
import confetti from 'canvas-confetti';
import {
  FileText,
  Clock,
  CheckCircle2,
  UploadCloud,
  AlertCircle,
  FileCheck,
  Award,
  X
} from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const { assignments, submitAssignment } = useCollegeData();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [activeSubmitModal, setActiveSubmitModal] = useState<Assignment | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmitModal || !uploadFileName) return;

    submitAssignment(activeSubmitModal.id, uploadFileName);
    setActiveSubmitModal(null);
    setUploadFileName('');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">Pending Submission</span>;
      case 'submitted':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">Submitted (Awaiting Grading)</span>;
      case 'graded':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">Graded & Evaluated</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase font-mono">Learning Management System</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Coursework & Lab Assignments
          </h1>
          <p className="text-xs text-slate-400">Track deadlines, submit code repositories, and view professor grading evaluations.</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          {(['all', 'pending', 'submitted', 'graded'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === f
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((asn) => (
          <div
            key={asn.id}
            className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                  {asn.courseCode}
                </span>
                {getStatusBadge(asn.status)}
              </div>

              <h3 className="text-base font-bold text-white font-heading">{asn.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{asn.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Due: <strong className="text-slate-200">{asn.dueDate}</strong>
                </span>
                <span>Max Points: <strong className="text-white">{asn.maxScore}</strong></span>
              </div>

              {asn.status === 'graded' && (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400">Score Awarded:</span>
                    <span className="font-black text-white font-mono text-sm">{asn.score} / {asn.maxScore}</span>
                  </div>
                  {asn.feedback && (
                    <p className="text-[11px] text-slate-300 italic">"{asn.feedback}"</p>
                  )}
                </div>
              )}

              {asn.status === 'pending' && (
                <button
                  onClick={() => setActiveSubmitModal(asn)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" /> Upload & Submit Solution
                </button>
              )}

              {asn.status === 'submitted' && (
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{asn.submittedFile}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Submitted {asn.submissionDate}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {activeSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-heading">Submit Coursework</h3>
                <p className="text-xs text-slate-400">{activeSubmitModal.title}</p>
              </div>
              <button
                onClick={() => setActiveSubmitModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">File Name / Repository URL</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. raft_consensus_alex_j.go or github.com/user/project"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="text-slate-400">Drag and drop code files, zip archives, or paste links</p>
                <p className="text-[10px] text-slate-500">Supported: .go, .py, .java, .pdf, .zip (Max 50MB)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Confirm & Hand In Assignment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
