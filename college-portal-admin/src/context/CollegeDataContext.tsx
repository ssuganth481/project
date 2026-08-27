import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Department,
  Program,
  Course,
  Student,
  Faculty,
  AttendanceRecord,
  GradeItem,
  Assignment,
  Notice,
  FeeTransaction,
  PlacementStat,
  TimetableSlot,
  AdmissionApplication
} from '../types';
import {
  initialDepartments,
  initialPrograms,
  initialCourses,
  initialStudents,
  initialFaculty,
  initialAttendance,
  initialGrades,
  initialAssignments,
  initialNotices,
  initialFeeTransactions,
  initialPlacementStats,
  initialTimetable,
  initialAdmissions
} from '../data/mockCollegeData';

interface CollegeDataContextType {
  departments: Department[];
  programs: Program[];
  courses: Course[];
  students: Student[];
  faculty: Faculty[];
  attendance: AttendanceRecord[];
  grades: GradeItem[];
  assignments: Assignment[];
  notices: Notice[];
  feeTransactions: FeeTransaction[];
  placementStats: PlacementStat[];
  timetable: TimetableSlot[];
  admissions: AdmissionApplication[];

  // CRUD Actions
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  addFaculty: (fac: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, data: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;

  addDepartment: (dept: Omit<Department, 'id'>) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;

  submitAssignment: (assignmentId: string, filename: string) => void;
  gradeAssignment: (assignmentId: string, score: number, feedback: string) => void;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;

  payFee: (feeId: string, paymentMethod: string) => string; // returns receipt ID
  submitAdmission: (app: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submissionDate' | 'status'>) => string;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status']) => void;

  markAttendanceForCourse: (courseCode: string, date: string, status: 'present' | 'absent' | 'late', topic: string) => void;
  resetToDefaults: () => void;
}

const CollegeDataContext = createContext<CollegeDataContextType | undefined>(undefined);

export const CollegeDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('apex_departments');
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  const [programs] = useState<Program[]>(initialPrograms);
  const [courses] = useState<Course[]>(initialCourses);

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('apex_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('apex_faculty');
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('apex_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [grades] = useState<GradeItem[]>(() => {
    const saved = localStorage.getItem('apex_grades');
    return saved ? JSON.parse(saved) : initialGrades;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('apex_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('apex_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [feeTransactions, setFeeTransactions] = useState<FeeTransaction[]>(() => {
    const saved = localStorage.getItem('apex_fees');
    return saved ? JSON.parse(saved) : initialFeeTransactions;
  });

  const [placementStats] = useState<PlacementStat[]>(initialPlacementStats);
  const [timetable] = useState<TimetableSlot[]>(initialTimetable);

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('apex_admissions');
    return saved ? JSON.parse(saved) : initialAdmissions;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('apex_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('apex_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('apex_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('apex_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('apex_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('apex_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('apex_fees', JSON.stringify(feeTransactions));
  }, [feeTransactions]);

  useEffect(() => {
    localStorage.setItem('apex_admissions', JSON.stringify(admissions));
  }, [admissions]);

  // Actions
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((stu) => (stu.id === id ? { ...stu, ...data } : stu))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((stu) => stu.id !== id));
  };

  const addFaculty = (facData: Omit<Faculty, 'id'>) => {
    const newFac: Faculty = {
      ...facData,
      id: `fac-${Date.now()}`
    };
    setFaculty((prev) => [newFac, ...prev]);
  };

  const updateFaculty = (id: string, data: Partial<Faculty>) => {
    setFaculty((prev) =>
      prev.map((fac) => (fac.id === id ? { ...fac, ...data } : fac))
    );
  };

  const deleteFaculty = (id: string) => {
    setFaculty((prev) => prev.filter((fac) => fac.id !== id));
  };

  const addDepartment = (deptData: Omit<Department, 'id'>) => {
    const newDept: Department = {
      ...deptData,
      id: `dept-${Date.now()}`
    };
    setDepartments((prev) => [...prev, newDept]);
  };

  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: today
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const submitAssignment = (assignmentId: string, filename: string) => {
    const today = new Date().toISOString().split('T')[0];
    setAssignments((prev) =>
      prev.map((asn) =>
        asn.id === assignmentId
          ? {
              ...asn,
              status: 'submitted',
              submittedFile: filename,
              submissionDate: today
            }
          : asn
      )
    );
  };

  const gradeAssignment = (assignmentId: string, score: number, feedback: string) => {
    setAssignments((prev) =>
      prev.map((asn) =>
        asn.id === assignmentId
          ? {
              ...asn,
              status: 'graded',
              score,
              feedback
            }
          : asn
      )
    );
  };

  const createAssignment = (asnData: Omit<Assignment, 'id' | 'status'>) => {
    const newAsn: Assignment = {
      ...asnData,
      id: `asn-${Date.now()}`,
      status: 'pending'
    };
    setAssignments((prev) => [newAsn, ...prev]);
  };

  const payFee = (feeId: string, paymentMethod: string): string => {
    const receiptNum = `REC-APX-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];

    setFeeTransactions((prev) =>
      prev.map((fee) =>
        fee.id === feeId
          ? {
              ...fee,
              status: 'paid',
              paidDate: today,
              paymentMethod,
              receiptId: receiptNum
            }
          : fee
      )
    );
    return receiptNum;
  };

  const submitAdmission = (appData: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submissionDate' | 'status'>): string => {
    const appNum = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newApp: AdmissionApplication = {
      ...appData,
      id: `adm-${Date.now()}`,
      applicationNumber: appNum,
      submissionDate: today,
      status: 'Submitted'
    };

    setAdmissions((prev) => [newApp, ...prev]);
    return appNum;
  };

  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status']) => {
    setAdmissions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const markAttendanceForCourse = (courseCode: string, date: string, status: 'present' | 'absent' | 'late', topic: string) => {
    setAttendance((prev) =>
      prev.map((att) => {
        if (att.courseCode === courseCode) {
          const newHistory = [{ date, status, topicCovered: topic }, ...att.history];
          const newTotal = att.totalClasses + 1;
          const newAttended = status === 'present' ? att.attendedClasses + 1 : status === 'late' ? att.attendedClasses + 0.5 : att.attendedClasses;
          const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
          return {
            ...att,
            totalClasses: newTotal,
            attendedClasses: newAttended,
            percentage: newPct,
            history: newHistory
          };
        }
        return att;
      })
    );
  };

  const resetToDefaults = () => {
    localStorage.removeItem('apex_departments');
    localStorage.removeItem('apex_students');
    localStorage.removeItem('apex_faculty');
    localStorage.removeItem('apex_attendance');
    localStorage.removeItem('apex_grades');
    localStorage.removeItem('apex_assignments');
    localStorage.removeItem('apex_notices');
    localStorage.removeItem('apex_fees');
    localStorage.removeItem('apex_admissions');

    setDepartments(initialDepartments);
    setStudents(initialStudents);
    setFaculty(initialFaculty);
    setAttendance(initialAttendance);
    setAssignments(initialAssignments);
    setNotices(initialNotices);
    setFeeTransactions(initialFeeTransactions);
    setAdmissions(initialAdmissions);
  };

  return (
    <CollegeDataContext.Provider
      value={{
        departments,
        programs,
        courses,
        students,
        faculty,
        attendance,
        grades,
        assignments,
        notices,
        feeTransactions,
        placementStats,
        timetable,
        admissions,
        addStudent,
        updateStudent,
        deleteStudent,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        addDepartment,
        addNotice,
        deleteNotice,
        submitAssignment,
        gradeAssignment,
        createAssignment,
        payFee,
        submitAdmission,
        updateAdmissionStatus,
        markAttendanceForCourse,
        resetToDefaults
      }}
    >
      {children}
    </CollegeDataContext.Provider>
  );
};

export const useCollegeData = () => {
  const context = useContext(CollegeDataContext);
  if (!context) {
    throw new Error('useCollegeData must be used within a CollegeDataProvider');
  }
  return context;
};
