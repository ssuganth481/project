export type UserRole = 'public' | 'student' | 'faculty' | 'admin' | 'placement' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  studentId?: string;
  employeeId?: string;
  department?: string;
  year?: number;
  semester?: number;
  designation?: string;
  phone?: string;
  joinDate?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  headOfDepartment: string;
  description: string;
  establishedYear: number;
  facultyCount: number;
  studentCount: number;
  programs: string[];
  labsCount: number;
  image: string;
  accentColor: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  degreeType: 'B.Tech' | 'M.Tech' | 'MBA' | 'Ph.D' | 'B.Sc';
  duration: string;
  totalCredits: number;
  feePerYear: number;
  eligibility: string;
  curriculumHighlights: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  credits: number;
  semester: number;
  professorName: string;
  description: string;
  schedule: string;
}

export interface AttendanceHistory {
  date: string;
  status: 'present' | 'absent' | 'late';
  topicCovered?: string;
}

export interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  history: AttendanceHistory[];
}

export interface GradeItem {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  internalMarks: number; // max 40
  endSemMarks: number;   // max 60
  totalMarks: number;    // max 100
  gradePoint: number;    // 1-10
  letterGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  semester: number;
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  maxScore: number;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  submittedFile?: string;
  submissionDate?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'academic' | 'exam' | 'event' | 'placement' | 'general' | 'urgent';
  date: string;
  publisher: string;
  targetRole: 'all' | 'student' | 'faculty';
  content: string;
  isUrgent?: boolean;
  attachmentName?: string;
}

export interface FeeTransaction {
  id: string;
  invoiceNumber: string;
  title: string;
  semester: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  receiptId?: string;
  breakdown: {
    tuition: number;
    labExam: number;
    library: number;
    hostelMess?: number;
    sportsClub: number;
  };
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  avatar: string;
  department: string;
  program: string;
  semester: number;
  batch: string;
  cgpa: number;
  attendancePercentage: number;
  feesPaid: number;
  totalFees: number;
  hostelRoom: string;
  mentorName: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  enrollmentStatus: 'Active' | 'Probation' | 'Alumni' | 'Suspended';
}

export interface Faculty {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  avatar: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  officeRoom: string;
  phone: string;
  publicationsCount: number;
  experienceYears: number;
  assignedCourses: string[];
}

export interface PlacementStat {
  company: string;
  logo: string;
  packageLPA: number;
  rolesOffered: string[];
  offersCount: number;
  tier: 'Dream' | 'Super Dream' | 'Core' | 'Mass';
  category: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // "09:00 AM"
  endTime: string;   // "10:00 AM"
  courseCode: string;
  courseName: string;
  facultyName: string;
  roomNumber: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  department: string;
  previousMarks: number;
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Accepted' | 'Rejected';
  category: 'General' | 'OBC' | 'SC/ST' | 'International';
}
