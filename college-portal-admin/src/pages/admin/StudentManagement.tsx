import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Student } from '../../types';
import { generateBonafideCertificatePDF, generateGradeTranscriptPDF } from '../../utils/pdfGenerator';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  CheckCircle2,
  Award,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentManagement: React.FC = () => {
  const { students, departments, addStudent, updateStudent, deleteStudent, grades } = useCollegeData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  // Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [deptName, setDeptName] = useState(departments[0]?.name || 'Computer Science & Engineering');
  const [program, setProgram] = useState('B.Tech CSE');
  const [semester, setSemester] = useState<number>(6);
  const [cgpa, setCgpa] = useState<number>(8.5);
  const [attendancePct, setAttendancePct] = useState<number>(85.0);
  const [hostelRoom, setHostelRoom] = useState('Oak Residence #302');
  const [mentorName, setMentorName] = useState('Dr. Sarah Lin');

  const filteredStudents = students.filter((s) => {
    const matchesDept = selectedDept === 'all' || s.department === selectedDept;
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFullName('');
    setStudentId(`APX2023CSE0${Math.floor(10 + Math.random() * 89)}`);
    setEmail('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (stu: Student) => {
    setEditingStudent(stu);
    setFullName(stu.fullName);
    setStudentId(stu.studentId);
    setEmail(stu.email);
    setDeptName(stu.department);
    setProgram(stu.program);
    setSemester(stu.semester);
    setCgpa(stu.cgpa);
    setAttendancePct(stu.attendancePercentage);
    setHostelRoom(stu.hostelRoom);
    setMentorName(stu.mentorName);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !studentId) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        fullName,
        studentId,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@apex.edu`,
        department: deptName,
        program,
        semester,
        cgpa,
        attendancePercentage: attendancePct,
        hostelRoom,
        mentorName
      });
    } else {
      addStudent({
        studentId,
        fullName,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@apex.edu`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        department: deptName,
        program,
        semester,
        batch: '2023 - 2027',
        cgpa,
        attendancePercentage: attendancePct,
        feesPaid: 185000,
        totalFees: 185000,
        hostelRoom,
        mentorName,
        phone: '+1 (555) 456-7890',
        dob: '2004-01-15',
        bloodGroup: 'O+',
        enrollmentStatus: 'Active'
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
    if (confirm('Are you sure you want to remove this student record from Central ERP?')) {
      deleteStudent(id);
    }
  };

  const handleDownloadBonafide = (stu: Student) => {
    generateBonafideCertificatePDF(stu);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase font-mono">Central Registrar Hub</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Student Information Directory (CRUD)
          </h1>
          <p className="text-xs text-slate-400">Enroll new candidates, manage academic records, and issue instant certified Bonafide PDFs.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Enroll New Student
        </button>
      </div>

      {/* Filter & Search */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="font-semibold text-slate-300">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
          >
            <option value="all">All Departments ({departments.length})</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Student Profile</th>
                <th className="p-4">Department & Program</th>
                <th className="p-4 text-center">Semester</th>
                <th className="p-4 text-center">CGPA</th>
                <th className="p-4 text-center">Attendance</th>
                <th className="p-4 text-center">Bonafide PDF</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">{stu.studentId}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img src={stu.avatar} alt={stu.fullName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-white">{stu.fullName}</div>
                        <div className="text-[11px] text-slate-400">{stu.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{stu.program}</div>
                    <div className="text-[10px] text-slate-400">{stu.department}</div>
                  </td>
                  <td className="p-4 text-center font-mono font-bold">Sem {stu.semester}</td>
                  <td className="p-4 text-center font-mono font-bold text-emerald-400">{stu.cgpa.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        stu.attendancePercentage >= 75
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {stu.attendancePercentage}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDownloadBonafide(stu)}
                      title="Issue Bonafide PDF"
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors text-[11px] font-semibold"
                    >
                      Issue PDF
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(stu)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stu.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-heading">
                {editingStudent ? 'Edit Student Record' : 'Enroll New Student'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Student Roll ID</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Academic Department</label>
                <select
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Semester</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={(e) => setCgpa(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Attendance %</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={attendancePct}
                    onChange={(e) => setAttendancePct(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hostel Allotment</label>
                  <input
                    type="text"
                    value={hostelRoom}
                    onChange={(e) => setHostelRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Faculty Mentor</label>
                  <input
                    type="text"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Student Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
