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
  AdmissionApplication,
  User
} from '../types';

export const initialDepartments: Department[] = [
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    headOfDepartment: 'Dr. Sarah Lin, Ph.D.',
    description: 'Pioneering cutting-edge research in Artificial Intelligence, Distributed Cloud Systems, Cybersecurity, and Quantum Computing.',
    establishedYear: 1994,
    facultyCount: 28,
    studentCount: 720,
    programs: ['B.Tech Computer Science', 'M.Tech AI & Data Engineering', 'Ph.D. Computer Systems'],
    labsCount: 8,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'indigo'
  },
  {
    id: 'dept-ai',
    code: 'AIDS',
    name: 'Artificial Intelligence & Data Science',
    headOfDepartment: 'Dr. Alan Vance, Ph.D.',
    description: 'Empowering future innovators with deep learning, natural language processing, computer vision, and cognitive systems.',
    establishedYear: 2019,
    facultyCount: 16,
    studentCount: 360,
    programs: ['B.Tech AI & Data Science', 'M.Tech Deep Learning Architectures'],
    labsCount: 5,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'cyan'
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication Eng.',
    headOfDepartment: 'Dr. Meera Iyer, Ph.D.',
    description: 'Advancing semiconductor design, VLSI architectures, 5G/6G Wireless Networks, and embedded IoT robotics.',
    establishedYear: 1990,
    facultyCount: 22,
    studentCount: 540,
    programs: ['B.Tech ECE', 'M.Tech VLSI & Embedded Systems'],
    labsCount: 7,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'purple'
  },
  {
    id: 'dept-mech',
    code: 'MECH',
    name: 'Mechanical & Automation Engineering',
    headOfDepartment: 'Prof. David Thorne, Ph.D.',
    description: 'Driving smart manufacturing, autonomous automotive systems, thermodynamics, and sustainable aerospace engineering.',
    establishedYear: 1988,
    facultyCount: 20,
    studentCount: 480,
    programs: ['B.Tech Mechanical Engineering', 'M.Tech Robotics & Automation'],
    labsCount: 9,
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'amber'
  },
  {
    id: 'dept-mba',
    code: 'SOM',
    name: 'School of Management & Business',
    headOfDepartment: 'Dr. Elena Rostova, DBA',
    description: 'Fostering global leadership, venture capital strategy, FinTech analytics, and executive business administration.',
    establishedYear: 2002,
    facultyCount: 18,
    studentCount: 320,
    programs: ['MBA Executive Leadership', 'MBA FinTech & Analytics', 'BBA Global Business'],
    labsCount: 3,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'emerald'
  },
  {
    id: 'dept-biotech',
    code: 'BIO',
    name: 'Biotechnology & Bio-Informatics',
    headOfDepartment: 'Dr. Jonathan Cruz, Ph.D.',
    description: 'Unlocking genomic data, synthetic biology, molecular therapeutics, and computational bioinformatics.',
    establishedYear: 2012,
    facultyCount: 14,
    studentCount: 280,
    programs: ['B.Tech Biotechnology', 'M.Sc Bioinformatics'],
    labsCount: 6,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'rose'
  }
];

export const initialPrograms: Program[] = [
  {
    id: 'prog-btech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    code: 'BTCSE',
    departmentId: 'dept-cse',
    degreeType: 'B.Tech',
    duration: '4 Years (8 Semesters)',
    totalCredits: 160,
    feePerYear: 185000,
    eligibility: 'Higher Secondary (10+2) with 75% in PCM and JEE/Apex Entrance Test qualified',
    curriculumHighlights: ['Data Structures & Algorithms', 'Operating Systems & Cloud', 'Full-Stack Web Architectures', 'Artificial Intelligence', 'Compiler Design']
  },
  {
    id: 'prog-btech-aids',
    name: 'B.Tech in Artificial Intelligence & Data Science',
    code: 'BTAIDS',
    departmentId: 'dept-ai',
    degreeType: 'B.Tech',
    duration: '4 Years (8 Semesters)',
    totalCredits: 164,
    feePerYear: 195000,
    eligibility: '10+2 with PCM minimum 75% aggregate score',
    curriculumHighlights: ['Mathematical Foundations of ML', 'Deep Learning & NLP', 'Big Data Engineering', 'Computer Vision', 'Reinforcement Learning']
  },
  {
    id: 'prog-btech-ece',
    name: 'B.Tech in Electronics & Communication',
    code: 'BTECE',
    departmentId: 'dept-ece',
    degreeType: 'B.Tech',
    duration: '4 Years (8 Semesters)',
    totalCredits: 160,
    feePerYear: 175000,
    eligibility: '10+2 with Physics, Mathematics and Chemistry / Computer Science',
    curriculumHighlights: ['Digital Signal Processing', 'Microcontrollers & Embedded C', 'VLSI Design with Verilog', 'Wireless & Satellite Comms']
  },
  {
    id: 'prog-mba-exec',
    name: 'Master of Business Administration (MBA)',
    code: 'MBA-GEN',
    departmentId: 'dept-mba',
    degreeType: 'MBA',
    duration: '2 Years (4 Semesters)',
    totalCredits: 96,
    feePerYear: 240000,
    eligibility: 'Undergraduate degree with min 60% and CAT/GMAT/Apex-MAT percentile > 80',
    curriculumHighlights: ['Strategic Financial Management', 'Marketing Analytics', 'Organizational Dynamics', 'Supply Chain Operations', 'Venture Capital & M&A']
  }
];

export const initialCourses: Course[] = [
  {
    id: 'crs-cs601',
    code: 'CS601',
    title: 'Distributed Cloud Systems & Microservices',
    departmentId: 'dept-cse',
    credits: 4,
    semester: 6,
    professorName: 'Dr. Sarah Lin',
    description: 'Design principles of fault-tolerant distributed consensus, Raft algorithms, Kubernetes orchestration, and cloud-native serverless systems.',
    schedule: 'Mon, Wed 09:00 AM - 10:30 AM'
  },
  {
    id: 'crs-cs602',
    code: 'CS602',
    title: 'Advanced Machine Learning & Deep Neural Nets',
    departmentId: 'dept-cse',
    credits: 4,
    semester: 6,
    professorName: 'Dr. Alan Vance',
    description: 'Transformer architectures, diffusion models, attention mechanisms, backpropagation mathematics, and high-performance GPU tensor training.',
    schedule: 'Tue, Thu 10:45 AM - 12:15 PM'
  },
  {
    id: 'crs-cs603',
    code: 'CS603',
    title: 'Information Security & Cryptography',
    departmentId: 'dept-cse',
    credits: 3,
    semester: 6,
    professorName: 'Prof. Mark Jensen',
    description: 'Public-key cryptosystems, RSA, Elliptic Curves, Zero-Knowledge proofs, network vulnerability assessment, and offensive security protocols.',
    schedule: 'Wed, Fri 01:30 PM - 03:00 PM'
  },
  {
    id: 'crs-cs604',
    code: 'CS604',
    title: 'Full-Stack Modern Web Engineering',
    departmentId: 'dept-cse',
    credits: 3,
    semester: 6,
    professorName: 'Dr. Emily Watson',
    description: 'Modern SPA development, state management, asynchronous REST/GraphQL protocols, WebSockets, and scalable backend containerization.',
    schedule: 'Mon, Thu 03:15 PM - 04:45 PM'
  },
  {
    id: 'crs-cs605',
    code: 'CS605',
    title: 'Cloud & DevOps Lab Practicum',
    departmentId: 'dept-cse',
    credits: 2,
    semester: 6,
    professorName: 'Dr. Sarah Lin',
    description: 'Hands-on CI/CD pipeline automation, Terraform Infrastructure as Code, AWS/GCP clusters, and Prometheus observability.',
    schedule: 'Friday 09:00 AM - 01:00 PM'
  }
];

export const initialStudents: Student[] = [
  {
    id: 'stu-001',
    studentId: 'APX2023CSE042',
    fullName: 'Suganth S',
    email: 'suganth.s@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    program: 'B.Tech CSE',
    semester: 6,
    batch: '2023 - 2027',
    cgpa: 9.14,
    attendancePercentage: 88.5,
    feesPaid: 185000,
    totalFees: 185000,
    hostelRoom: 'Oak Residence Hall #402-B',
    mentorName: 'Dr. Sarah Lin',
    phone: '+1 (555) 234-8901',
    dob: '2004-05-14',
    bloodGroup: 'O+ Positive',
    enrollmentStatus: 'Active'
  },
  {
    id: 'stu-002',
    studentId: 'APX2023CSE018',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    program: 'B.Tech CSE',
    semester: 6,
    batch: '2023 - 2027',
    cgpa: 9.62,
    attendancePercentage: 94.2,
    feesPaid: 185000,
    totalFees: 185000,
    hostelRoom: 'Maple Tower #210',
    mentorName: 'Dr. Sarah Lin',
    phone: '+1 (555) 345-6712',
    dob: '2004-08-22',
    bloodGroup: 'A+ Positive',
    enrollmentStatus: 'Active'
  },
  {
    id: 'stu-003',
    studentId: 'APX2023CSE089',
    fullName: 'Liam Chen',
    email: 'liam.chen@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    program: 'B.Tech CSE',
    semester: 6,
    batch: '2023 - 2027',
    cgpa: 7.85,
    attendancePercentage: 71.4,
    feesPaid: 120000,
    totalFees: 185000,
    hostelRoom: 'Pine Court #105',
    mentorName: 'Dr. Alan Vance',
    phone: '+1 (555) 890-1234',
    dob: '2003-11-30',
    bloodGroup: 'B+ Positive',
    enrollmentStatus: 'Probation'
  },
  {
    id: 'stu-004',
    studentId: 'APX2023AI007',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    department: 'Artificial Intelligence & Data Science',
    program: 'B.Tech AIDS',
    semester: 6,
    batch: '2023 - 2027',
    cgpa: 8.95,
    attendancePercentage: 89.0,
    feesPaid: 195000,
    totalFees: 195000,
    hostelRoom: 'Cedar Hall #308',
    mentorName: 'Dr. Alan Vance',
    phone: '+1 (555) 789-4561',
    dob: '2004-03-19',
    bloodGroup: 'AB+ Positive',
    enrollmentStatus: 'Active'
  },
  {
    id: 'stu-005',
    studentId: 'APX2023ECE033',
    fullName: 'Marcus Brody',
    email: 'marcus.brody@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    department: 'Electronics & Communication Eng.',
    program: 'B.Tech ECE',
    semester: 6,
    batch: '2023 - 2027',
    cgpa: 8.42,
    attendancePercentage: 82.0,
    feesPaid: 175000,
    totalFees: 175000,
    hostelRoom: 'Oak Residence #112',
    mentorName: 'Dr. Meera Iyer',
    phone: '+1 (555) 432-1098',
    dob: '2003-09-05',
    bloodGroup: 'O- Negative',
    enrollmentStatus: 'Active'
  },
  {
    id: 'stu-006',
    studentId: 'APX2024MBA012',
    fullName: 'Natasha Roman',
    email: 'natasha.r@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    department: 'School of Management & Business',
    program: 'MBA Executive Leadership',
    semester: 2,
    batch: '2024 - 2026',
    cgpa: 9.38,
    attendancePercentage: 96.0,
    feesPaid: 240000,
    totalFees: 240000,
    hostelRoom: 'Executive Suites #501',
    mentorName: 'Dr. Elena Rostova',
    phone: '+1 (555) 678-9012',
    dob: '2001-02-14',
    bloodGroup: 'B- Negative',
    enrollmentStatus: 'Active'
  }
];

export const initialFaculty: Faculty[] = [
  {
    id: 'fac-001',
    employeeId: 'EMP-FAC-0101',
    fullName: 'Dr. Sarah Lin, Ph.D.',
    email: 'sarah.lin@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    qualification: 'Ph.D. in Distributed Systems, MIT (2012)',
    specialization: 'Cloud Computing, Microservices, Consensus Protocols',
    officeRoom: 'Turing Block, Suite 412',
    phone: '+1 (555) 800-4412',
    publicationsCount: 42,
    experienceYears: 14,
    assignedCourses: ['CS601: Distributed Cloud Systems', 'CS605: Cloud & DevOps Lab']
  },
  {
    id: 'fac-002',
    employeeId: 'EMP-FAC-0102',
    fullName: 'Dr. Alan Vance, Ph.D.',
    email: 'alan.vance@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    department: 'Artificial Intelligence & Data Science',
    designation: 'Professor & Dean of AI Research',
    qualification: 'Ph.D. in Computer Science & AI, Stanford (2014)',
    specialization: 'Generative Models, Deep RL, Computer Vision',
    officeRoom: 'Ada Lovelace Tech Center, Rm 305',
    phone: '+1 (555) 800-4413',
    publicationsCount: 56,
    experienceYears: 12,
    assignedCourses: ['CS602: Advanced Machine Learning', 'AI401: Deep Neural Systems']
  },
  {
    id: 'fac-003',
    employeeId: 'EMP-FAC-0103',
    fullName: 'Dr. Meera Iyer, Ph.D.',
    email: 'meera.iyer@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    department: 'Electronics & Communication Eng.',
    designation: 'Professor & HOD ECE',
    qualification: 'Ph.D. in Microelectronics, UC Berkeley (2010)',
    specialization: 'Semiconductor VLSI, Neuromorphic Chips, 6G Antennas',
    officeRoom: 'Maxwell Science Hall, Rm 218',
    phone: '+1 (555) 800-4414',
    publicationsCount: 38,
    experienceYears: 16,
    assignedCourses: ['EC502: VLSI System Design', 'EC601: Wireless Communications']
  },
  {
    id: 'fac-004',
    employeeId: 'EMP-FAC-0104',
    fullName: 'Prof. Mark Jensen, M.S.',
    email: 'mark.jensen@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    qualification: 'M.S. Cybersecurity, Carnegie Mellon (2015)',
    specialization: 'Cryptanalysis, Zero Trust Networks, Penetration Testing',
    officeRoom: 'Turing Block, Suite 308',
    phone: '+1 (555) 800-4415',
    publicationsCount: 19,
    experienceYears: 10,
    assignedCourses: ['CS603: Information Security & Cryptography']
  },
  {
    id: 'fac-005',
    employeeId: 'EMP-FAC-0105',
    fullName: 'Dr. Emily Watson, Ph.D.',
    email: 'emily.watson@apex.edu',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. Web Systems, Oxford (2018)',
    specialization: 'Reactive Frameworks, WebAssembly, High-Scale Architectures',
    officeRoom: 'Turing Block, Suite 215',
    phone: '+1 (555) 800-4416',
    publicationsCount: 14,
    experienceYears: 7,
    assignedCourses: ['CS604: Full-Stack Modern Web Engineering']
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att-cs601',
    courseCode: 'CS601',
    courseName: 'Distributed Cloud Systems & Microservices',
    facultyName: 'Dr. Sarah Lin',
    totalClasses: 36,
    attendedClasses: 32,
    percentage: 88.8,
    history: [
      { date: '2026-08-25', status: 'present', topicCovered: 'Consensus in Fault-Tolerant Systems & Paxos' },
      { date: '2026-08-22', status: 'present', topicCovered: 'Raft Leader Election & Log Replication' },
      { date: '2026-08-18', status: 'absent', topicCovered: 'Distributed Snapshot Algorithms' },
      { date: '2026-08-15', status: 'present', topicCovered: 'gRPC Protobuf Services & Inter-Process Comms' },
      { date: '2026-08-11', status: 'present', topicCovered: 'Kubernetes Ingress & Envoy Sidecars' }
    ]
  },
  {
    id: 'att-cs602',
    courseCode: 'CS602',
    courseName: 'Advanced Machine Learning & Deep Neural Nets',
    facultyName: 'Dr. Alan Vance',
    totalClasses: 34,
    attendedClasses: 31,
    percentage: 91.2,
    history: [
      { date: '2026-08-26', status: 'present', topicCovered: 'FlashAttention-3 & GPU SRAM Optimization' },
      { date: '2026-08-24', status: 'present', topicCovered: 'Transformer Positional Encodings (RoPE)' },
      { date: '2026-08-19', status: 'present', topicCovered: 'Denoising Diffusion Probabilistic Models' },
      { date: '2026-08-17', status: 'late', topicCovered: 'Contrastive Latent Representations (CLIP)' }
    ]
  },
  {
    id: 'att-cs603',
    courseCode: 'CS603',
    courseName: 'Information Security & Cryptography',
    facultyName: 'Prof. Mark Jensen',
    totalClasses: 30,
    attendedClasses: 25,
    percentage: 83.3,
    history: [
      { date: '2026-08-26', status: 'present', topicCovered: 'Post-Quantum Lattice-Based Key Exchange (Kyber)' },
      { date: '2026-08-21', status: 'absent', topicCovered: 'Zero-Knowledge SNARKs & Circuit Proofs' },
      { date: '2026-08-14', status: 'present', topicCovered: 'Elliptic Curve Diffie-Hellman Key Agreement' }
    ]
  },
  {
    id: 'att-cs604',
    courseCode: 'CS604',
    courseName: 'Full-Stack Modern Web Engineering',
    facultyName: 'Dr. Emily Watson',
    totalClasses: 28,
    attendedClasses: 26,
    percentage: 92.8,
    history: [
      { date: '2026-08-27', status: 'present', topicCovered: 'Realtime WebSocket State Synchronization' },
      { date: '2026-08-23', status: 'present', topicCovered: 'Edge SSR & Server Components Hydration' },
      { date: '2026-08-20', status: 'present', topicCovered: 'GraphQL Federation & Schema Stitching' }
    ]
  },
  {
    id: 'att-cs605',
    courseCode: 'CS605',
    courseName: 'Cloud & DevOps Lab Practicum',
    facultyName: 'Dr. Sarah Lin',
    totalClasses: 12,
    attendedClasses: 11,
    percentage: 91.6,
    history: [
      { date: '2026-08-22', status: 'present', topicCovered: 'Terraform AWS EKS Cluster Provisioning' },
      { date: '2026-08-15', status: 'present', topicCovered: 'ArgoCD GitOps Pipeline Integration' }
    ]
  }
];

export const initialGrades: GradeItem[] = [
  {
    id: 'grd-cs601',
    courseCode: 'CS601',
    courseName: 'Distributed Cloud Systems & Microservices',
    credits: 4,
    internalMarks: 38,
    endSemMarks: 54,
    totalMarks: 92,
    gradePoint: 10,
    letterGrade: 'A+',
    semester: 6
  },
  {
    id: 'grd-cs602',
    courseCode: 'CS602',
    courseName: 'Advanced Machine Learning & Deep Neural Nets',
    credits: 4,
    internalMarks: 36,
    endSemMarks: 52,
    totalMarks: 88,
    gradePoint: 9,
    letterGrade: 'A',
    semester: 6
  },
  {
    id: 'grd-cs603',
    courseCode: 'CS603',
    courseName: 'Information Security & Cryptography',
    credits: 3,
    internalMarks: 34,
    endSemMarks: 48,
    totalMarks: 82,
    gradePoint: 9,
    letterGrade: 'A',
    semester: 6
  },
  {
    id: 'grd-cs604',
    courseCode: 'CS604',
    courseName: 'Full-Stack Modern Web Engineering',
    credits: 3,
    internalMarks: 39,
    endSemMarks: 57,
    totalMarks: 96,
    gradePoint: 10,
    letterGrade: 'A+',
    semester: 6
  },
  {
    id: 'grd-cs605',
    courseCode: 'CS605',
    courseName: 'Cloud & DevOps Lab Practicum',
    credits: 2,
    internalMarks: 40,
    endSemMarks: 55,
    totalMarks: 95,
    gradePoint: 10,
    letterGrade: 'A+',
    semester: 6
  },
  {
    id: 'grd-cs501',
    courseCode: 'CS501',
    courseName: 'Database Management & Internals',
    credits: 4,
    internalMarks: 37,
    endSemMarks: 51,
    totalMarks: 88,
    gradePoint: 9,
    letterGrade: 'A',
    semester: 5
  },
  {
    id: 'grd-cs502',
    courseCode: 'CS502',
    courseName: 'Computer Networks & Protocols',
    credits: 4,
    internalMarks: 38,
    endSemMarks: 53,
    totalMarks: 91,
    gradePoint: 10,
    letterGrade: 'A+',
    semester: 5
  },
  {
    id: 'grd-cs503',
    courseCode: 'CS503',
    courseName: 'Theory of Computation & Automata',
    credits: 3,
    internalMarks: 32,
    endSemMarks: 46,
    totalMarks: 78,
    gradePoint: 8,
    letterGrade: 'B+',
    semester: 5
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: 'asn-001',
    courseCode: 'CS601',
    courseName: 'Distributed Cloud Systems',
    title: 'Lab 4: Raft Consensus Implementation in Go',
    description: 'Implement leader election, log replication, and heartbeat keepalive mechanisms according to the Raft protocol paper.',
    assignedDate: '2026-08-20',
    dueDate: '2026-09-05',
    maxScore: 100,
    status: 'pending'
  },
  {
    id: 'asn-002',
    courseCode: 'CS602',
    courseName: 'Advanced Machine Learning',
    title: 'Project 2: Vision Transformer from Scratch (PyTorch)',
    description: 'Construct a multi-head patch-embedding vision transformer architecture for ImageNet subset classification with benchmark results.',
    assignedDate: '2026-08-15',
    dueDate: '2026-08-30',
    maxScore: 100,
    status: 'submitted',
    submittedFile: 'vit_scratch_alex_johnson.py',
    submissionDate: '2026-08-26'
  },
  {
    id: 'asn-003',
    courseCode: 'CS604',
    courseName: 'Full-Stack Modern Web Engineering',
    title: 'Milestone 3: Realtime Collaborative Canvas App',
    description: 'Build a multiplayer whiteboard using WebSockets, WebRTC mesh, and optimistic UI updates.',
    assignedDate: '2026-08-10',
    dueDate: '2026-08-24',
    maxScore: 100,
    status: 'graded',
    score: 98,
    feedback: 'Exceptional zero-latency sync architecture and pristine TypeScript typing. Excellent work!',
    submittedFile: 'collab_canvas_repo.zip',
    submissionDate: '2026-08-23'
  },
  {
    id: 'asn-004',
    courseCode: 'CS603',
    courseName: 'Information Security & Cryptography',
    title: 'Cryptanalysis of AES Side-Channel Attack',
    description: 'Perform a differential power analysis simulation on 128-bit key recovery with report.',
    assignedDate: '2026-08-22',
    dueDate: '2026-09-08',
    maxScore: 50,
    status: 'pending'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not-001',
    title: 'End-Semester Examination Schedule - Fall 2026 Published',
    category: 'exam',
    date: '2026-08-27',
    publisher: 'Controller of Examinations (CoE)',
    targetRole: 'all',
    content: 'The official timetable for all undergraduate and postgraduate Fall 2026 theory and practical examinations has been released. Download your Hall Tickets from the portal starting Sept 1st.',
    isUrgent: true,
    attachmentName: 'Fall_2026_Exam_Schedule_Official.pdf'
  },
  {
    id: 'not-002',
    title: 'Campus Placements 2026-27: Google, Microsoft & NVIDIA Hiring Drive',
    category: 'placement',
    date: '2026-08-26',
    publisher: 'Department of Training & Placements (T&P)',
    targetRole: 'student',
    content: 'Registration window for Tier-1 Super Dream companies is now open. Eligible students with CGPA >= 8.5 and no active backlogs must submit their resumes by August 31st 11:59 PM.',
    isUrgent: true,
    attachmentName: 'Campus_Placement_Eligible_List.pdf'
  },
  {
    id: 'not-003',
    title: 'Annual Tech Fest "Apex HackGrid 2026" - $25,000 Prize Pool',
    category: 'event',
    date: '2026-08-24',
    publisher: 'Student Affairs & Innovation Club',
    targetRole: 'all',
    content: 'Apex University invites student innovators for the 36-hour national hackathon on AI, Web3, and Green Energy. Mentors from Silicon Valley leading workshops.',
    isUrgent: false,
    attachmentName: 'HackGrid2026_Brochure.pdf'
  },
  {
    id: 'not-004',
    title: 'Research Grant Allocation: $1.2M Funded for Quantum Computing Lab',
    category: 'academic',
    date: '2026-08-21',
    publisher: 'Office of Dean (R&D)',
    targetRole: 'faculty',
    content: 'Congratulations to the Department of CSE on securing National Science Foundation grant for research on scalable fault-tolerant quantum algorithms.',
    isUrgent: false
  },
  {
    id: 'not-005',
    title: 'Hostel Night-Pass Policy & Cafeteria Menu Revision',
    category: 'general',
    date: '2026-08-18',
    publisher: 'Chief Warden Office',
    targetRole: 'student',
    content: 'Updated guidelines for hostel biometric check-ins and new multi-cuisine dietary options introduced across all 4 dining halls.',
    isUrgent: false
  }
];

export const initialFeeTransactions: FeeTransaction[] = [
  {
    id: 'fee-001',
    invoiceNumber: 'INV-2026-FALL-0042',
    title: 'Fall Semester 2026 - Academic & Lab Tuition',
    semester: 6,
    amount: 185000,
    dueDate: '2026-08-10',
    paidDate: '2026-08-04',
    status: 'paid',
    paymentMethod: 'UPI / Online Card (Apex Portal Gateway)',
    receiptId: 'REC-APX-894102',
    breakdown: {
      tuition: 135000,
      labExam: 25000,
      library: 10000,
      sportsClub: 5000,
      hostelMess: 10000
    }
  },
  {
    id: 'fee-002',
    invoiceNumber: 'INV-2026-SPR-0042',
    title: 'Spring Semester 2026 - Academic Tuition',
    semester: 5,
    amount: 185000,
    dueDate: '2026-01-15',
    paidDate: '2026-01-10',
    status: 'paid',
    paymentMethod: 'Net Banking (Axis Bank)',
    receiptId: 'REC-APX-672190',
    breakdown: {
      tuition: 135000,
      labExam: 25000,
      library: 10000,
      sportsClub: 5000,
      hostelMess: 10000
    }
  },
  {
    id: 'fee-003',
    invoiceNumber: 'INV-2027-SPR-0042',
    title: 'Spring Semester 2027 - Advanced Registration',
    semester: 7,
    amount: 185000,
    dueDate: '2027-01-10',
    status: 'pending',
    breakdown: {
      tuition: 135000,
      labExam: 25000,
      library: 10000,
      sportsClub: 5000,
      hostelMess: 10000
    }
  }
];

export const initialPlacementStats: PlacementStat[] = [
  {
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=150&q=80',
    packageLPA: 45.5,
    rolesOffered: ['Software Engineer L3', 'Cloud Systems Specialist', 'Site Reliability Engineer'],
    offersCount: 14,
    tier: 'Super Dream',
    category: 'Product & Cloud'
  },
  {
    company: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=150&q=80',
    packageLPA: 43.0,
    rolesOffered: ['SDE-1', 'Azure Cloud Architect', 'Data Scientist'],
    offersCount: 18,
    tier: 'Super Dream',
    category: 'Product & Cloud'
  },
  {
    company: 'NVIDIA',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    packageLPA: 48.0,
    rolesOffered: ['CUDA Systems Engineer', 'Deep Learning Hardware Architect'],
    offersCount: 9,
    tier: 'Super Dream',
    category: 'AI & Hardware'
  },
  {
    company: 'Amazon AWS',
    logo: 'https://images.unsplash.com/photo-1523474253246-72cb9ae38b35?auto=format&fit=crop&w=150&q=80',
    packageLPA: 38.0,
    rolesOffered: ['Software Development Engineer', 'DevOps Solutions Architect'],
    offersCount: 26,
    tier: 'Dream',
    category: 'E-Commerce & Cloud'
  },
  {
    company: 'Goldman Sachs',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80',
    packageLPA: 34.0,
    rolesOffered: ['Quantitative Risk Analyst', 'FinTech Platform Engineer'],
    offersCount: 12,
    tier: 'Dream',
    category: 'Investment Banking'
  },
  {
    company: 'Qualcomm',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80',
    packageLPA: 28.5,
    rolesOffered: ['5G Modem Firmware Engineer', 'SoC Verification Lead'],
    offersCount: 16,
    tier: 'Dream',
    category: 'Semiconductors'
  }
];

export const initialTimetable: TimetableSlot[] = [
  {
    id: 'tt-mon-1',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'CS601',
    courseName: 'Distributed Cloud Systems',
    facultyName: 'Dr. Sarah Lin',
    roomNumber: 'Turing Hall A-301',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-2',
    day: 'Monday',
    startTime: '10:45 AM',
    endTime: '12:15 PM',
    courseCode: 'CS602',
    courseName: 'Advanced Machine Learning',
    facultyName: 'Dr. Alan Vance',
    roomNumber: 'Ada Hall B-204',
    type: 'Lecture'
  },
  {
    id: 'tt-mon-3',
    day: 'Monday',
    startTime: '01:30 PM',
    endTime: '04:30 PM',
    courseCode: 'CS605',
    courseName: 'Cloud & DevOps Practicum Lab',
    facultyName: 'Dr. Sarah Lin',
    roomNumber: 'Cloud Computing Lab 4',
    type: 'Lab'
  },
  {
    id: 'tt-tue-1',
    day: 'Tuesday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'CS603',
    courseName: 'Information Security & Cryptography',
    facultyName: 'Prof. Mark Jensen',
    roomNumber: 'Turing Hall A-301',
    type: 'Lecture'
  },
  {
    id: 'tt-tue-2',
    day: 'Tuesday',
    startTime: '10:45 AM',
    endTime: '12:15 PM',
    courseCode: 'CS604',
    courseName: 'Full-Stack Modern Web Engineering',
    facultyName: 'Dr. Emily Watson',
    roomNumber: 'CS Seminar Room 2',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-1',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'CS601',
    courseName: 'Distributed Cloud Systems',
    facultyName: 'Dr. Sarah Lin',
    roomNumber: 'Turing Hall A-301',
    type: 'Lecture'
  },
  {
    id: 'tt-wed-2',
    day: 'Wednesday',
    startTime: '10:45 AM',
    endTime: '12:15 PM',
    courseCode: 'CS602',
    courseName: 'Advanced Machine Learning',
    facultyName: 'Dr. Alan Vance',
    roomNumber: 'Ada Hall B-204',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-1',
    day: 'Thursday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'CS603',
    courseName: 'Information Security & Cryptography',
    facultyName: 'Prof. Mark Jensen',
    roomNumber: 'Turing Hall A-301',
    type: 'Lecture'
  },
  {
    id: 'tt-thu-2',
    day: 'Thursday',
    startTime: '10:45 AM',
    endTime: '12:15 PM',
    courseCode: 'CS604',
    courseName: 'Full-Stack Modern Web Engineering',
    facultyName: 'Dr. Emily Watson',
    roomNumber: 'CS Seminar Room 2',
    type: 'Lecture'
  },
  {
    id: 'tt-fri-1',
    day: 'Friday',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    courseCode: 'CS605',
    courseName: 'Cloud & DevOps Lab Practicum',
    facultyName: 'Dr. Sarah Lin',
    roomNumber: 'Cloud Computing Lab 4',
    type: 'Lab'
  }
];

export const initialAdmissions: AdmissionApplication[] = [
  {
    id: 'adm-001',
    applicationNumber: 'ADM-2026-8801',
    fullName: 'Lucas Bennett',
    email: 'lucas.b@gmail.com',
    phone: '+1 (555) 777-1234',
    program: 'B.Tech in Computer Science & Engineering',
    department: 'Computer Science & Engineering',
    previousMarks: 94.5,
    submissionDate: '2026-08-25',
    status: 'Interview Scheduled',
    category: 'General'
  },
  {
    id: 'adm-002',
    applicationNumber: 'ADM-2026-8802',
    fullName: 'Emily Zhang',
    email: 'emily.z@gmail.com',
    phone: '+1 (555) 888-2345',
    program: 'B.Tech in Artificial Intelligence & Data Science',
    department: 'Artificial Intelligence & Data Science',
    previousMarks: 97.2,
    submissionDate: '2026-08-24',
    status: 'Accepted',
    category: 'General'
  },
  {
    id: 'adm-003',
    applicationNumber: 'ADM-2026-8803',
    fullName: 'Rahul Nair',
    email: 'rahul.n@gmail.com',
    phone: '+1 (555) 999-3456',
    program: 'Master of Business Administration (MBA)',
    department: 'School of Management & Business',
    previousMarks: 89.0,
    submissionDate: '2026-08-22',
    status: 'Under Review',
    category: 'General'
  }
];

export const demoUsers: Record<string, User> = {
  student: {
    id: 'usr-student',
    name: 'Suganth S',
    email: 'suganth.s@apex.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    studentId: 'APX2023CSE042',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 6,
    phone: '+1 (555) 234-8901',
    joinDate: '2023-08-01'
  },
  faculty: {
    id: 'usr-faculty',
    name: 'Dr. Sarah Lin',
    email: 'sarah.lin@apex.edu',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    employeeId: 'EMP-FAC-0101',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    phone: '+1 (555) 800-4412',
    joinDate: '2015-06-15'
  },
  admin: {
    id: 'usr-admin',
    name: 'Prof. Robert Sterling',
    email: 'registrar@apex.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    employeeId: 'EMP-ADM-0001',
    designation: 'Registrar & Chief Academic Administrator',
    department: 'Central Administration Office',
    phone: '+1 (555) 800-1000',
    joinDate: '2010-01-10'
  },
  placement: {
    id: 'usr-placement',
    name: 'Elena Vance',
    email: 'placements@apex.edu',
    role: 'placement',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    employeeId: 'EMP-TNP-0042',
    designation: 'Head of Corporate Relations & Placements',
    department: 'Training & Placements Cell',
    phone: '+1 (555) 800-2200',
    joinDate: '2018-04-01'
  }
};
