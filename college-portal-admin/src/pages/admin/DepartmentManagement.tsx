import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Department } from '../../types';
import {
  Building2,
  Plus,
  FlaskConical,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DepartmentManagement: React.FC = () => {
  const { departments, addDepartment } = useCollegeData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [hod, setHod] = useState('');
  const [description, setDescription] = useState('');
  const [labsCount, setLabsCount] = useState<number>(4);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    addDepartment({
      code: code.toUpperCase(),
      name,
      headOfDepartment: hod || 'Prof. Academic Lead, Ph.D.',
      description,
      establishedYear: 2026,
      facultyCount: 14,
      studentCount: 180,
      programs: [`B.Tech in ${name}`],
      labsCount,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      accentColor: 'indigo'
    });

    setIsModalOpen(false);
    setName('');
    setCode('');
    setHod('');
    setDescription('');

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase font-mono">Academic Structure</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Department & School Builder
          </h1>
          <p className="text-xs text-slate-400">Manage academic departments, degree programs, student capacities, and HOD appointments.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-950 text-indigo-400 border border-slate-800">
                  {dept.code}
                </span>
                <span className="text-xs text-slate-400">Est. {dept.establishedYear}</span>
              </div>

              <h3 className="text-lg font-bold text-white font-heading">{dept.name}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{dept.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">HOD:</span>
                <span className="font-bold text-white">{dept.headOfDepartment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Faculty Count:</span>
                <span className="font-bold text-white">{dept.facultyCount} Professors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Capacity:</span>
                <span className="font-bold text-indigo-400">{dept.studentCount} Students</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-heading">Create Academic Department</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Physical Systems"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CPS"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Head of Department (HOD)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Pendelton, Ph.D."
                  value={hod}
                  onChange={(e) => setHod(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Overview Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe academic mission, research domains..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Research Laboratories Count</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={labsCount}
                  onChange={(e) => setLabsCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Initialize Department
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
