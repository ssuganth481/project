import React, { useState, useEffect, useMemo } from 'react';
import ContentGenerator from './tabs/ContentGenerator';
import Insights from './tabs/Insights';
import Prediction from './tabs/Prediction';
import Dashboard from './tabs/Dashboard';
import Login from './Login';
import Profile from './Profile';
import Onboarding from './Onboarding';
import './App.css';

const NAV = [
  { label: 'Dashboard',         icon: '⚡' },
  { label: 'Content Generator', icon: '🎨' },
  { label: 'Insights',          icon: '📊' },
  { label: 'Prediction',        icon: '🔮' },
];

function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      dur: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 4}s`,
    })), []);

  return (
    <div className="stars-layer">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          '--dur': s.dur,
          animationDelay: s.delay,
        }} />
      ))}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="pulse-rings">
        <div className="pulse-ring" />
        <div className="pulse-ring" />
        <div className="pulse-ring" />
        <img src="/cat.gif" alt="loading" />
      </div>
      <p className="loading-title">Grow AI</p>
      <div className="shimmer-lines">
        <div className="shimmer-line" />
        <div className="shimmer-line" />
        <div className="shimmer-line" />
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const [tabKey, setTabKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => localStorage.getItem('ciq_user'));
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem('ciq_onboarding') === 'true');
  const [contentDefaultView, setContentDefaultView] = useState('generate');
  const [theme, setTheme] = useState(() => localStorage.getItem('ciq_theme') || 'dark');
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfile]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('ciq_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const switchTab = (i) => {
    setActive(i);
    setTabKey(k => k + 1);
    setSidebarOpen(false);
    setContentDefaultView('generate');
  };

  const handleLogin = (username, onboarding) => {
    setUser(username);
    setOnboardingDone(onboarding);
    if (onboarding) localStorage.setItem('ciq_onboarding', 'true');
  };

  const handleOnboardingDone = () => {
    setOnboardingDone(true);
    localStorage.setItem('ciq_onboarding', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('ciq_user');
    localStorage.removeItem('ciq_onboarding');
    setUser(null);
    setOnboardingDone(false);
  };

  if (!ready) return <LoadingScreen />;
  if (!user) return <Login onLogin={handleLogin} />;
  if (!onboardingDone) return <Onboarding user={user} onDone={handleOnboardingDone} />;

  return (
    <>
      <div className="nebula">
        <div className="nebula-blob" />
        <div className="nebula-blob" />
        <div className="nebula-blob" />
      </div>
      <Stars />
      <div className="shooting-star" />

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">Grow<span>AI</span></span>
          </div>
          
          <div className="sidebar-badge">AI Powered</div>
          <nav className="sidebar-nav">
            {NAV.map((item, i) => (
              <button
                key={item.label}
                className={`nav-item ${active === i ? 'active' : ''}`}
                onClick={() => switchTab(i)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {active === i && <span className="nav-indicator" />}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-avatar-row" onClick={() => setShowProfile(p => !p)}>
              <div className="sidebar-avatar">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user)}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="avatar"
                />
              </div>
              <div className="sidebar-avatar-info">
                <p className="sidebar-avatar-name">{user}</p>
                <p className="sidebar-avatar-role">AI User</p>
              </div>
            </div>
            <div className="sidebar-footer-text">© 2026 Grow AI</div>
            <div className="sidebar-footer-names">Suganth S</div>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>☰</button>
          <span className="topbar-title">Grow<span>AI</span></span>
          <span className="topbar-page">{NAV[active].icon} {NAV[active].label}</span>
        </div>

        {/* Main content */}
        <main className="main">
          <div className="page-header">
            <div>
              <h1 className="page-title">{NAV[active].icon} {NAV[active].label}</h1>
              <p className="page-sub">
                {active === 0 && 'Overview of your AI content activity'}
                {active === 1 && 'Generate AI-powered posts and reels'}
                {active === 2 && 'Analyze your Instagram insights'}
                {active === 3 && 'Predict your post performance'}
              </p>
            </div>
            <button className="theme-toggle-btn-top" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="page-content" key={tabKey}>
            {active === 0 && <Dashboard user={user} onContentClick={() => { setContentDefaultView('history'); setActive(1); setTabKey(k => k + 1); }} />}
            {active === 1 && <ContentGenerator user={user} defaultView={contentDefaultView} />}
            {active === 2 && <Insights user={user} />}
            {active === 3 && <Prediction user={user} />}
          </div>
        </main>

        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Profile Popup */}
        {/* Profile Slide Panel */}
        <div className={`profile-slide-panel ${showProfile ? 'open' : ''}`} ref={profileRef}>
          <button className="profile-slide-close" onClick={() => setShowProfile(false)}>✕</button>
          <Profile user={user} onLogout={handleLogout} />
        </div>
        {showProfile && <div className="profile-slide-overlay" onClick={() => setShowProfile(false)} />}
      </div>
    </>
  );
}
