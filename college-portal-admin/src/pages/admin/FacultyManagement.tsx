import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Faculty } from '../../types';
import {
  UserCheck,
  Plus,
  Search,
  Building,
  Mail,
  Phone,
  Award,
  Trash2,
  Edit2,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyManagement: React.FC = () => {
  const { faculty, departments, addFaculty, updateFaculty, deleteFaculty } = useCollegeData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFac, setEditingFac] = useState<Faculty | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(departments[0]?.name || 'Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [qualification, setQualification] = useState('Ph.D. Computer Science');
  const [specialization, setSpecialization] = useState('Artificial Intelligence & Cloud');
  const [officeRoom, setOfficeRoom] = useState('Turing Block Suite 305');
  const [publicationsCount, setPublicationsCount] = useState<number>(12);

  const filteredFaculty = faculty.filter(
    (f) =>
      f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingFac(null);
    setFullName('');
    setEmployeeId(`EMP-FAC-010${Math.floor(6 + Math.random() * 80)}`);
    setEmail('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !employeeId) return;

    if (editingFac) {
      updateFaculty(editingFac.id, {
        fullName,
        employeeId,
        email: email || `${fullName.toLowerCase().replace(/[\s.]+/g, '')}@apex.edu`,
        department,
        designation,
        qualification,
        specialization,
        officeRoom,
        publicationsCount
      });
    } else {
      addFaculty({
        fullName,
        employeeId,
        email: email || `${fullName.toLowerCase().replace(/[\s.]+/g, '')}@apex.edu`,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        department,
        designation,
        qualification,
        specialization,
        officeRoom,
        phone: '+1 (555) 800-4400',
        publicationsCount,
        experienceYears: 8,
        assignedCourses: ['CS601: Distributed Systems']
      });
    }

    setIsModalOpen(false);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove faculty member from university faculty roster?')) {
      deleteFaculty(id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase font-mono">Academic Human Resources</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Faculty & Professorial Directory
          </h1>
          <p className="text-xs text-slate-400">Manage academic appointments, department allocations, research outputs, and office locations.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Appoint New Faculty
        </button>
      </div>

      {/* Search bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, employee ID, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <span className="text-slate-400 font-semibold">{filteredFaculty.length} Faculty Members Listed</span>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <img
                  src={fac.avatar}
                  alt={fac.fullName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                />
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 text-indigo-400 border border-slate-800">
                  {fac.employeeId}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-heading">{fac.fullName}</h3>
                <p className="text-xs text-indigo-400 font-semibold">{fac.designation}</p>
                <p className="text-[11px] text-slate-400">{fac.department}</p>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <p className="text-slate-400">Qual: <strong className="text-slate-200">{fac.qualification}</strong></p>
                <p className="text-slate-400">Spec: <strong className="text-slate-200">{fac.specialization}</strong></p>
                <p className="text-slate-400">Office: <strong className="text-slate-200">{fac.officeRoom}</strong></p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> {fac.publicationsCount} Publications
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(fac.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
              <h3 className="font-bold text-white text-base font-heading">Appoint Faculty Member</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name with Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert Chen, Ph.D."
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Academic Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation</label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Professor & Head of Department">Professor & HOD</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Office Location</label>
                  <input
                    type="text"
                    value={officeRoom}
                    onChange={(e) => setOfficeRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Specialization & Research Focus</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Faculty Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
