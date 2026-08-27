import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Department, UserRole } from '../../types';
import {
  BookOpen,
  Award,
  Users,
  FlaskConical,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Download,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface AcademicsPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onNavigate }) => {
  const { departments, programs, faculty } = useCollegeData();
  const [selectedDept, setSelectedDept] = useState<Department | null>(departments[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredDepts = departments.filter((d) => {
    if (filterCategory === 'tech') return ['dept-cse', 'dept-ai', 'dept-ece', 'dept-mech'].includes(d.id);
    if (filterCategory === 'biz') return d.id === 'dept-mba';
    if (filterCategory === 'bio') return d.id === 'dept-biotech';
    return true;
  });

  const deptFaculty = faculty.filter(
    (f) => selectedDept && f.department.toLowerCase().includes(selectedDept.name.toLowerCase().slice(0, 10))
  );

  const deptPrograms = programs.filter(
    (p) => selectedDept && p.departmentId === selectedDept.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Academic Framework</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          Departments & Degree Programs
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Interdisciplinary curricula benchmarked against world standards, combining rigorous theory with cutting-edge experimental laboratory practice.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Departments (6)' },
          { id: 'tech', label: 'Engineering & Computing' },
          { id: 'biz', label: 'School of Management' },
          { id: 'bio', label: 'Biotechnology & Life Sciences' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => {
          const isSelected = selectedDept?.id === dept.id;
          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-indigo-400">
                    {dept.code}
                  </span>
                  <span className="text-[11px] text-slate-400">Est. {dept.establishedYear}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-indigo-300 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5 text-indigo-400" /> {dept.labsCount} Labs
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> {dept.facultyCount} Faculty
                  </span>
                </div>
                <span className="text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Department Comprehensive Inspector */}
      {selectedDept && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-8 animate-fadeIn">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                  {selectedDept.code} Department
                </span>
                <span className="text-xs text-slate-400">Active Curriculum Fall 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {selectedDept.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {selectedDept.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <span>Apply for {selectedDept.code}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Department Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Head of Department</p>
              <p className="text-sm font-bold text-white mt-1">{selectedDept.headOfDepartment}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Student Strength</p>
              <p className="text-sm font-bold text-white mt-1">{selectedDept.studentCount} Undergrad & Postgrad</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Dedicated Labs</p>
              <p className="text-sm font-bold text-white mt-1">{selectedDept.labsCount} High-Performance Labs</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Degree Offerings</p>
              <p className="text-sm font-bold text-indigo-400 mt-1">{selectedDept.programs.length} Certified Degrees</p>
            </div>
          </div>

          {/* Programs under this department */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Degree Programs & Curricula
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDept.programs.map((progName, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{progName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                      Full-Time
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Comprehensive 8-semester curriculum including core foundations, open electives, industrial internships, and capstone thesis defense.
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Total Credits: 160</span>
                    <button
                      onClick={() => alert(`Downloading official syllabus brochure for ${progName}...`)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Syllabus PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
