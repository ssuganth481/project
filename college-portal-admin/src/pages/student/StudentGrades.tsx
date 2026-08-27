import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCollegeData } from '../../context/CollegeDataContext';
import {
  Award,
  Download,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { generateGradeTranscriptPDF } from '../../utils/pdfGenerator';

export const StudentGrades: React.FC = () => {
  const { currentUser } = useAuth();
  const { students, grades } = useCollegeData();
  const [selectedSemester, setSelectedSemester] = useState<number>(6);

  const currentStudent =
    students.find((s) => s.studentId === currentUser?.studentId) || students[0];

  const semesterHistory = [
    { sem: 1, sgpa: 8.85, credits: 24, status: 'Passed (Distinction)' },
    { sem: 2, sgpa: 9.10, credits: 24, status: 'Passed (Distinction)' },
    { sem: 3, sgpa: 8.95, credits: 22, status: 'Passed (Distinction)' },
    { sem: 4, sgpa: 9.25, credits: 24, status: 'Passed (Distinction)' },
    { sem: 5, sgpa: 9.30, credits: 24, status: 'Passed (Distinction)' },
    { sem: 6, sgpa: 9.42, credits: 16, status: 'Current Evaluation' }
  ];

  const filteredGrades = grades.filter((g) => g.semester === selectedSemester);

  const handleDownloadPDF = () => {
    generateGradeTranscriptPDF(currentStudent, filteredGrades.length > 0 ? filteredGrades : grades);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase font-mono">Academic Performance</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Gradebook & Official Transcripts
          </h1>
          <p className="text-xs text-slate-400">Cumulative Performance Index (CPI/CGPA): <strong>{currentStudent.cgpa.toFixed(2)} / 10.00</strong></p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Official Transcript PDF
        </button>
      </div>

      {/* Semester SGPA Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {semesterHistory.map((s) => (
          <button
            key={s.sem}
            onClick={() => setSelectedSemester(s.sem)}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedSemester === s.sem
                ? 'bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg'
                : 'glass-card border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-bold text-slate-400 block">Semester {s.sem}</span>
            <span className="text-2xl font-black text-white font-heading my-1 block">{s.sgpa.toFixed(2)}</span>
            <span className="text-[10px] text-indigo-400 font-semibold">{s.credits} Credits</span>
          </button>
        ))}
      </div>

      {/* Grades Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Semester {selectedSemester} Subject Marks & Letter Grades</h3>
          </div>
          <span className="text-xs text-emerald-400 font-bold">Status: All Clear (No Backlogs)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Course Code</th>
                <th className="p-4">Course Title</th>
                <th className="p-4 text-center">Credits</th>
                <th className="p-4 text-center">Internal Marks (40)</th>
                <th className="p-4 text-center">End-Sem Marks (60)</th>
                <th className="p-4 text-center">Total Marks (100)</th>
                <th className="p-4 text-center">Letter Grade</th>
                <th className="p-4 text-center">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {(filteredGrades.length > 0 ? filteredGrades : grades.slice(0, 5)).map((g) => (
                <tr key={g.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-400">{g.courseCode}</td>
                  <td className="p-4 font-semibold text-white">{g.courseName}</td>
                  <td className="p-4 text-center font-mono">{g.credits}</td>
                  <td className="p-4 text-center font-mono">{g.internalMarks}</td>
                  <td className="p-4 text-center font-mono">{g.endSemMarks}</td>
                  <td className="p-4 text-center font-mono font-bold text-white">{g.totalMarks}</td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-black font-mono border border-emerald-500/30">
                      {g.letterGrade}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-indigo-300">{g.gradePoint} / 10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
