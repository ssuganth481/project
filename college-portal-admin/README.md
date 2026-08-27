# 🎓 Apex University | Web Portal & Enterprise ERP Administration Suite

> A modern, full-stack, enterprise-grade **College Web Portal & ERP Administration Platform** built with **React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts, and jsPDF**.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 System Overview & Key Architecture

Apex University Portal is an all-in-one institutional web application delivering a unified experience for prospective applicants, enrolled students, faculty professors, and institutional administrators.

```
+---------------------------------------------------------------------------------------------------+
|                                 Apex University Web Ecosystem                                     |
+---------------------------------------------------------------------------------------------------+
|  1. Public Institutional Portal       |  2. Role-Based Access Control      |  3. Student Portal   |
|     - Dynamic Hero & Campus Tour      |     - Student Login (Alex J.)      |     - CGPA & Gradebook|
|     - Academics & 6 Departments       |     - Faculty Login (Dr. Sarah)    |     - Live Timetable |
|     - Online Admission & Fee Calc     |     - Admin / Dean (Robert S.)     |     - Attendance >75%|
|     - Notice Board & PDF Circulars    |     - Placement Head (Elena V.)    |     - Assignments/LMS|
|     - Placements & Recruiters Wall    |     - Parent / Guest Portal        |     - Fee Pay/Receipt|
|---------------------------------------+------------------------------------+----------------------|
|  4. Faculty Academic Hub              |  5. Enterprise Admin ERP           |  6. Utilities & PDF  |
|     - Mark Attendance (Interactive)   |     - Institutional Analytics KPI  |     - Hall Ticket Gen|
|     - Grade Entry & Assessments       |     - Student & Faculty CRUD       |     - Fee Receipt PDF|
|     - Course Material & LMS Publisher |     - Department & Course Builder  |     - Bonafide Cert  |
|     - At-Risk Student Analytics       |     - Circular & Alert Broadcast   |     - Command Bar K  |
+---------------------------------------------------------------------------------------------------+
```

---

## 🚀 Key Feature Matrix

### 🌐 1. Public University Portal
- **Dynamic Institutional Hero**: Campus metrics counters (NIRF #8, 98.6% Placement rate, $3.5M research grants), dean's welcome address, and urgent alert ticker.
- **Academic Departments Directory**: Detailed explorer covering 6 major disciplines (*Computer Science, AI & Data Science, Electronics & Comm, Mechanical, School of Management, and Biotechnology*).
- **Online Admissions Application Wizard**: 3-step application workflow with live eligibility validation, category selection, and instant reference ID generator.
- **Merit Scholarship & Fee Calculator**: Real-time slider estimator calculating up to 75% tuition fee waivers based on academic score.
- **Placements & Career Wall**: Interactive Recharts salary distribution graphs ($48.0 LPA highest, $15.6 LPA avg) and recruiter hiring statistics (Google, Microsoft, NVIDIA, Amazon).
- **Campus Life & Virtual Tour**: Interactive showcases for 30+ student clubs, residential smart hostels, digital computational library, and Olympic sports arenas.
- **Notice Board & Circulars**: Categorized announcements (*Exams, Placements, Events, Urgent*) with full modal reading and PDF attachment previews.

### 🎓 2. Student Information System (SIS)
- **Academic Command Center**: Real-time CGPA tracker (9.14/10.00), credit completion gauge, and class schedule countdown.
- **Interactive Weekly Timetable**: Day-by-day lecture & lab schedule with room locator and "Currently Live" session indicator.
- **Attendance Tracker & 75% Safe Predictor**: Subject-wise percentage progress bars, detailed class session logs, and predictive calculator ("How many classes can I miss and stay &gt;75%?").
- **Official Gradebook**: Semester-by-semester SGPA progression and **1-Click Official Transcript PDF Download** via jsPDF.
- **LMS Coursework & Assignments**: Filterable submission tracker, code upload simulation, deadline alerts, and professor feedback viewer.
- **Tuition Fee Invoices & Payment Gateway**: Electronic invoice breakdowns, simulated secure payment checkout (Cards, UPI QR, NetBanking), and **1-Click Official Fee Receipt PDF Download**.

### 👨‍🏫 3. Faculty Academic Hub
- **Professorial Dashboard**: Course assignment metrics, publications counter, and urgent at-risk mentee alerts.
- **Batch Attendance Register**: Interactive roster where professors can toggle Present / Absent / Late, mark all present, record syllabus topics covered, and sync directly to student dashboards.
- **Internal Assessment & Exam Grading**: Score entry table (Internal 40 + EndSem 60) with auto-computed GPA letter grades.
- **Coursework & Assignment Manager**: Create new assignments, establish deadlines, review student uploads, and provide scores with feedback.

### 🛡️ 4. Enterprise Admin ERP
- **Executive Analytics Console**: Institutional KPIs, department-wise student enrollment distributions, and admission funnel analytics.
- **Student Information CRUD**: Full directory management with search, department filtering, profile editor, and **1-Click Certified Bonafide Student Certificate PDF Issuance**.
- **Faculty Directory Management**: Appoint new faculty, update research credentials, and assign course workloads.
- **Department & Degree Builder**: Create new departments, configure laboratories, and assign Heads of Department (HODs).
- **Bursar & Revenue Analytics**: Complete financial ledger tracking realized vs pending tuition collections.
- **Notice & Alert Broadcaster**: Instant circular broadcast engine with audience targeting (*Public, Students, Faculty*) and urgent banner flags.
- **Admissions Desk**: Review incoming student applications, schedule interviews, and accept/reject candidates.

### ⚡ 5. Power User Utilities
- **Command Palette (`Ctrl+K` / `Cmd+K`)**: Instant modal search for fast navigation across all pages, services, and student tools.
- **1-Click Persona Switcher**: Seamlessly switch between Student, Faculty, Admin, Placement Officer, and Public view without manual authentication delays.
- **Real PDF Generation Engine**: Generates genuine downloadable vector PDF documents (*Transcripts, Receipts, Bonafide Certificates*) directly in the client browser.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | React 19 (TypeScript) |
| **Build Tooling** | Vite 8.x + Rollup |
| **Styling & Theme** | Tailwind CSS v4 + Custom Glassmorphism System |
| **Icons & Typography** | Lucide React + Plus Jakarta Sans, Outfit, JetBrains Mono |
| **Data Visualizations** | Recharts (Responsive Bar & Pie Charts) |
| **PDF Generation** | jsPDF (Vector documents with custom headers & signatures) |
| **Micro-Interactions** | Framer Motion + Canvas Confetti |
| **State & Persistence** | React Context API + LocalStorage Data Engine |

---

## 📁 Project Directory Structure

```
college-portal-admin/
├── public/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Header.tsx              # Universal navigation & micro-bar
│   │       ├── Footer.tsx              # 5-column university footer
│   │       ├── PortalSidebar.tsx       # Role-tailored dashboard sidebar
│   │       ├── RoleSwitcherModal.tsx   # 1-Click persona & login modal
│   │       └── CommandPalette.tsx      # Global Ctrl+K search modal
│   ├── context/
│   │   ├── AuthContext.tsx             # Authentication & active role state
│   │   └── CollegeDataContext.tsx      # CRUD state store & local storage sync
│   ├── data/
│   │   └── mockCollegeData.ts          # 50+ students, faculty, departments & fees
│   ├── pages/
│   │   ├── public/                     # Public university website pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── AcademicsPage.tsx
│   │   │   ├── AdmissionsPage.tsx
│   │   │   ├── PlacementsPage.tsx
│   │   │   ├── CampusLifePage.tsx
│   │   │   └── NoticesEventsPage.tsx
│   │   ├── student/                    # Student Portal (/portal/student)
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── StudentTimetable.tsx
│   │   │   ├── StudentAttendance.tsx
│   │   │   ├── StudentGrades.tsx
│   │   │   ├── StudentAssignments.tsx
│   │   │   └── StudentFees.tsx
│   │   ├── faculty/                    # Faculty Hub (/portal/faculty)
│   │   │   ├── FacultyDashboard.tsx
│   │   │   ├── FacultyAttendance.tsx
│   │   │   ├── FacultyGrades.tsx
│   │   │   └── FacultyAssignments.tsx
│   │   └── admin/                      # Admin ERP (/portal/admin)
│   │       ├── AdminDashboard.tsx
│   │       ├── StudentManagement.tsx
│   │       ├── FacultyManagement.tsx
│   │       ├── DepartmentManagement.tsx
│   │       ├── FinanceManagement.tsx
│   │       ├── NoticePublisher.tsx
│   │       └── AdmissionsDesk.tsx
│   ├── types/
│   │   └── index.ts                    # Complete TypeScript data contracts
│   ├── utils/
│   │   └── pdfGenerator.ts             # jsPDF Transcripts, Receipts & Certificates
│   ├── App.tsx                         # Master routing & layout orchestrator
│   ├── main.tsx                        # React DOM root entry
│   └── index.css                       # Tailwind v4 & glassmorphic tokens
├── index.html                          # Meta tags, fonts & SEO configuration
├── package.json                        # Scripts and dependencies
├── tsconfig.json                       # TypeScript compiler settings
└── vite.config.ts                      # Vite configuration with Tailwind plugin
```

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x recommended)
- **npm**: v9.0.0 or higher

### 1. Clone the repository
```bash
git clone https://github.com/your-username/college-portal-admin.git
cd college-portal-admin
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
The optimized static bundle will be generated in the `dist/` directory ready for deployment on Vercel, Netlify, or GitHub Pages.

---

## 🎯 Demo Personas to Explore

Click **"Portal Login / Roles"** in the top navigation bar to test any of the preloaded personas:

| Role | Persona Name | Key Actions to Test |
|---|---|---|
| 🎓 **Student** | Alex Johnson | View live timetable, test 75% attendance predictor, submit LMS assignment, download Grade Transcript PDF & pay fee invoice |
| 👨‍🏫 **Faculty** | Dr. Sarah Lin | Mark batch attendance for CS601, enter internal marks, create a coursework assignment |
| 🛡️ **Admin** | Prof. Robert Sterling | Enroll new student, issue Bonafide Certificate PDF, review admission applications, broadcast urgent circular |
| 💼 **Placement Head** | Elena Vance | Inspect company salary trends & recruiter statistics |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
