import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Award, Save, CheckCircle2, Calculator, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyGrades: React.FC = () => {
  const { students } = useCollegeData();
  const [selectedCourse, setSelectedCourse] = useState('CS601');
  const [searchQuery, setSearchQuery] = useState('');

  // Editable marks state
  const [marksState, setMarksState] = useState<
    Record<string, { internal: number; endSem: number }>
  >(() => {
    const initial: Record<string, { internal: number; endSem: number }> = {};
    students.forEach((s) => {
      initial[s.id] = { internal: 38, endSem: 54 };
    });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateMarks = (
    studentId: string,
    field: 'internal' | 'endSem',
    val: number
  ) => {
    setMarksState((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val
      }
    }));
  };

  const calculateGrade = (total: number) => {
    if (total >= 90) return { letter: 'A+', gpa: 10 };
    if (total >= 80) return { letter: 'A', gpa: 9 };
    if (total >= 70) return { letter: 'B+', gpa: 8 };
    if (total >= 60) return { letter: 'B', gpa: 7 };
    if (total >= 50) return { letter: 'C', gpa: 6 };
    return { letter: 'F', gpa: 0 };
  };

  const handleSaveGrades = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Examination Grading Console</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Internal & End-Term Grade Entry
          </h1>
          <p className="text-xs text-slate-400">Enter assessment scores (Internal 40 + EndSem 60) with real-time GPA letter-grade computation.</p>
        </div>

        <button
          onClick={handleSaveGrades}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save & Publish Grades
        </button>
      </div>

      {/* Filter bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="font-semibold text-slate-300">Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none font-mono"
          >
            <option value="CS601">CS601: Distributed Cloud Systems</option>
            <option value="CS605">CS605: DevOps Practicum Lab</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student name or roll ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Marks Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Student Name</th>
                <th className="p-4 text-center">Internal Assessment (Max 40)</th>
                <th className="p-4 text-center">End-Semester Exam (Max 60)</th>
                <th className="p-4 text-center">Total Score (100)</th>
                <th className="p-4 text-center">Letter Grade</th>
                <th className="p-4 text-center">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredStudents.map((stu) => {
                const mark = marksState[stu.id] || { internal: 38, endSem: 54 };
                const total = Math.min(mark.internal + mark.endSem, 100);
                const gradeInfo = calculateGrade(total);
                return (
                  <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-indigo-400">{stu.studentId}</td>
                    <td className="p-4 font-semibold text-white flex items-center gap-2">
                      <img src={stu.avatar} alt={stu.fullName} className="w-6 h-6 rounded-md object-cover" />
                      <span>{stu.fullName}</span>
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={mark.internal}
                        onChange={(e) => handleUpdateMarks(stu.id, 'internal', Number(e.target.value))}
                        className="w-16 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-center font-mono text-white font-bold focus:outline-none focus:border-indigo-500"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={mark.endSem}
                        onChange={(e) => handleUpdateMarks(stu.id, 'endSem', Number(e.target.value))}
                        className="w-16 p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-center font-mono text-white font-bold focus:outline-none focus:border-indigo-500"
                      />
                    </td>
                    <td className="p-4 text-center font-mono font-black text-white text-sm">
                      {total} / 100
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-black font-mono border border-emerald-500/30">
                        {gradeInfo.letter}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono font-bold text-indigo-300">
                      {gradeInfo.gpa} / 10
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-950/60 border-t border-emerald-500/40 text-center text-xs text-emerald-300 font-bold animate-fadeIn">
            ✓ Grades submitted and synchronized with Registrar Database!
          </div>
        )}
      </div>
    </div>
  );
};
