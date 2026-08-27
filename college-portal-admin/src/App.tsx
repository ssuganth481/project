import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CollegeDataProvider } from './context/CollegeDataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PortalSidebar } from './components/common/PortalSidebar';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { CommandPalette } from './components/common/CommandPalette';
import { UserRole } from './types';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AcademicsPage } from './pages/public/AcademicsPage';
import { AdmissionsPage } from './pages/public/AdmissionsPage';
import { PlacementsPage } from './pages/public/PlacementsPage';
import { CampusLifePage } from './pages/public/CampusLifePage';
import { NoticesEventsPage } from './pages/public/NoticesEventsPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentTimetable } from './pages/student/StudentTimetable';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentGrades } from './pages/student/StudentGrades';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentFees } from './pages/student/StudentFees';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyAttendance } from './pages/faculty/FacultyAttendance';
import { FacultyGrades } from './pages/faculty/FacultyGrades';
import { FacultyAssignments } from './pages/faculty/FacultyAssignments';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentManagement } from './pages/admin/StudentManagement';
import { FacultyManagement } from './pages/admin/FacultyManagement';
import { DepartmentManagement } from './pages/admin/DepartmentManagement';
import { FinanceManagement } from './pages/admin/FinanceManagement';
import { NoticePublisher } from './pages/admin/NoticePublisher';
import { AdmissionsDesk } from './pages/admin/AdmissionsDesk';

const MainLayout: React.FC = () => {
  const { currentRole, currentUser } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync default view when role changes
  useEffect(() => {
    if (currentRole === 'student' && !currentView.startsWith('student-')) {
      setCurrentView('student-dashboard');
    } else if (currentRole === 'faculty' && !currentView.startsWith('faculty-')) {
      setCurrentView('faculty-dashboard');
    } else if (currentRole === 'admin' && !currentView.startsWith('admin-')) {
      setCurrentView('admin-dashboard');
    } else if (currentRole === 'placement' && !currentView.startsWith('placements')) {
      setCurrentView('placements');
    } else if (currentRole === 'public' && (currentView.startsWith('student-') || currentView.startsWith('faculty-') || currentView.startsWith('admin-'))) {
      setCurrentView('home');
    }
  }, [currentRole]);

  // Keyboard shortcut for Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: string, targetRole?: UserRole) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPortalView =
    currentUser !== null &&
    (currentView.startsWith('student-') ||
      currentView.startsWith('faculty-') ||
      currentView.startsWith('admin-'));

  const renderContent = () => {
    switch (currentView) {
      // Public Views
      case 'home':
        return <HomePage onNavigate={handleNavigate} onOpenRoleModal={() => setIsRoleModalOpen(true)} />;
      case 'academics':
        return <AcademicsPage onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsPage onNavigate={handleNavigate} />;
      case 'placements':
        return <PlacementsPage onNavigate={handleNavigate} />;
      case 'campus-life':
        return <CampusLifePage onNavigate={handleNavigate} />;
      case 'notices':
        return <NoticesEventsPage onNavigate={handleNavigate} />;

      // Student Portal
      case 'student-dashboard':
        return <StudentDashboard onNavigate={handleNavigate} />;
      case 'student-timetable':
        return <StudentTimetable />;
      case 'student-attendance':
        return <StudentAttendance />;
      case 'student-grades':
        return <StudentGrades />;
      case 'student-assignments':
        return <StudentAssignments />;
      case 'student-fees':
        return <StudentFees />;

      // Faculty Portal
      case 'faculty-dashboard':
        return <FacultyDashboard onNavigate={handleNavigate} />;
      case 'faculty-attendance':
        return <FacultyAttendance />;
      case 'faculty-grades':
        return <FacultyGrades />;
      case 'faculty-assignments':
        return <FacultyAssignments />;

      // Admin Portal
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-students':
        return <StudentManagement />;
      case 'admin-faculty':
        return <FacultyManagement />;
      case 'admin-departments':
        return <DepartmentManagement />;
      case 'admin-finance':
        return <FinanceManagement />;
      case 'admin-notices':
        return <NoticePublisher />;
      case 'admin-admissions':
        return <AdmissionsDesk />;

      default:
        return <HomePage onNavigate={handleNavigate} onOpenRoleModal={() => setIsRoleModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Universal Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Area */}
      <div className="flex-1 flex w-full">
        {isPortalView && (
          <PortalSidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />
        )}

        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>

      {/* Footer (Rendered on public pages) */}
      {!isPortalView && (
        <Footer
          onNavigate={handleNavigate}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />
      )}

      {/* Role Switcher Dialog Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={(role) => {
          if (role === 'student') setCurrentView('student-dashboard');
          else if (role === 'faculty') setCurrentView('faculty-dashboard');
          else if (role === 'admin') setCurrentView('admin-dashboard');
          else if (role === 'placement') setCurrentView('placements');
          else setCurrentView('home');
        }}
      />

      {/* Global Command Search Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CollegeDataProvider>
        <MainLayout />
      </CollegeDataProvider>
    </AuthProvider>
  );
}
