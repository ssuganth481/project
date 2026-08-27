import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Assignment } from '../../types';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  Award,
  FileCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyAssignments: React.FC = () => {
  const { assignments, createAssignment, gradeAssignment } = useCollegeData();

  // Create Assignment Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('CS601');
  const [courseName, setCourseName] = useState('Distributed Cloud Systems');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-15');
  const [maxScore, setMaxScore] = useState<number>(100);

  // Grade Modal
  const [gradingAsn, setGradingAsn] = useState<Assignment | null>(null);
  const [awardedScore, setAwardedScore] = useState<number>(95);
  const [facultyFeedback, setFacultyFeedback] = useState('Clean implementation with great test coverage.');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    createAssignment({
      courseCode,
      courseName,
      title,
      description,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate,
      maxScore
    });

    setIsCreateOpen(false);
    setTitle('');
    setDescription('');

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingAsn) return;

    gradeAssignment(gradingAsn.id, awardedScore, facultyFeedback);
    setGradingAsn(null);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">LMS Coursework Manager</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Assignments & Submissions Evaluation
          </h1>
          <p className="text-xs text-slate-400">Publish problem statements, lab assignments, and grade student submissions with individualized feedback.</p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Assignment
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((asn) => (
          <div
            key={asn.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                  {asn.courseCode}
                </span>
                <span className="text-xs text-slate-400">Max Score: <strong className="text-white">{asn.maxScore} pts</strong></span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">{asn.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{asn.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Due Date: <strong className="text-slate-200">{asn.dueDate}</strong>
                </span>
                <span className="text-emerald-400 font-semibold capitalize">{asn.status}</span>
              </div>

              {asn.submittedFile && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <strong>{asn.submittedFile}</strong>
                  </span>
                  <button
                    onClick={() => setGradingAsn(asn)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    Grade Solution
                  </button>
                </div>
              )}

              {asn.status === 'graded' && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  <span>Graded: <strong>{asn.score} / {asn.maxScore}</strong> • Feedback recorded</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-heading">Broadcast New Assignment</h3>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Course Code</label>
                <select
                  value={courseCode}
                  onChange={(e) => {
                    setCourseCode(e.target.value);
                    setCourseName(e.target.value === 'CS601' ? 'Distributed Cloud Systems' : 'DevOps Practicum Lab');
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="CS601">CS601: Distributed Cloud Systems</option>
                  <option value="CS605">CS605: DevOps Practicum Lab</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus in Go"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Description & Instructions</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe problem specifications, submission criteria..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Maximum Points</label>
                  <input
                    type="number"
                    required
                    value={maxScore}
                    onChange={(e) => setMaxScore(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Publish Assignment to Course LMS
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {gradingAsn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-heading">Evaluate Submission</h3>
                <p className="text-xs text-slate-400">{gradingAsn.title}</p>
              </div>
              <button onClick={() => setGradingAsn(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGradeSubmission} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Submitted File / Artifact:</span>
                <span className="font-mono font-bold text-indigo-400 text-sm">{gradingAsn.submittedFile}</span>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Awarded Points (Max: {gradingAsn.maxScore})</label>
                <input
                  type="number"
                  min="0"
                  max={gradingAsn.maxScore}
                  value={awardedScore}
                  onChange={(e) => setAwardedScore(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Professor Qualitative Feedback</label>
                <textarea
                  rows={3}
                  value={facultyFeedback}
                  onChange={(e) => setFacultyFeedback(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" /> Save Grade & Notify Student
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
