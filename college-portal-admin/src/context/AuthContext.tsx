import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { demoUsers } from '../data/mockCollegeData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isLoggedIn: boolean;
  loginAs: (role: UserRole) => void;
  loginWithCredentials: (email: string, role: UserRole, customName?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('apex_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return null; // Start on public portal
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('apex_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('apex_current_user');
    }
  }, [currentUser]);

  const loginAs = (role: UserRole) => {
    if (role === 'public') {
      setCurrentUser(null);
      return;
    }
    const demo = demoUsers[role];
    if (demo) {
      setCurrentUser(demo);
    } else {
      setCurrentUser({
        id: `usr-${role}-${Date.now()}`,
        name: `Authorized ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        email: `${role}@apex.edu`,
        role: role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      });
    }
  };

  const loginWithCredentials = (email: string, role: UserRole, customName?: string) => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: customName || (role === 'student' ? 'Suganth S' : role === 'faculty' ? 'Dr. Sarah Lin' : 'Administrator'),
      email: email,
      role: role,
      avatar: role === 'student'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      studentId: role === 'student' ? 'APX2023CSE042' : undefined,
      employeeId: role !== 'student' ? 'EMP-0101' : undefined,
      department: 'Computer Science & Engineering',
      semester: role === 'student' ? 6 : undefined
    };
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const currentRole: UserRole = currentUser ? currentUser.role : 'public';
  const isLoggedIn = currentUser !== null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isLoggedIn,
        loginAs,
        loginWithCredentials,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
