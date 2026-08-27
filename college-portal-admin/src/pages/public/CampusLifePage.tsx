import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  Compass,
  Home,
  BookOpen,
  Coffee,
  Trophy,
  Users,
  Music,
  Code,
  Zap,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface CampusLifePageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'clubs' | 'hostels' | 'library' | 'sports'>('clubs');

  const clubs = [
    {
      name: 'Apex Robotics & AI Guild',
      category: 'Technical',
      members: 340,
      lead: 'Prof. David Thorne',
      desc: 'Autonomous drones, battlebots, RoboCup champions, and humanoid robotics research.',
      icon: Code,
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      name: 'ACM / IEEE Student Chapter',
      category: 'Technical',
      members: 520,
      lead: 'Dr. Sarah Lin',
      desc: 'Competitive programming bootcamps, monthly hackathons, and open source incubations.',
      icon: Zap,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    },
    {
      name: 'Apex Symphony & Dramatics Club',
      category: 'Cultural',
      members: 210,
      lead: 'Elena Rostova',
      desc: 'Annual theatrical productions, orchestral recitals, indie rock bands, and inter-college fests.',
      icon: Music,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Varsity Athletics & Esports League',
      category: 'Sports',
      members: 460,
      lead: 'Coach Henderson',
      desc: 'State-champion basketball squad, Olympic-sized swimming, badminton courts, and FIFA/Valorant arena.',
      icon: Trophy,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" /> Student Affairs & Campus Culture
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          Life at Apex University
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Beyond lecture halls, discover a thriving ecosystem of 30+ student organizations, state-of-the-art residential suites, athletic centers, and cultural fests.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 justify-center">
        {[
          { id: 'clubs', label: 'Student Clubs & Societies', icon: Users },
          { id: 'hostels', label: 'Smart Hostels & Dining', icon: Home },
          { id: 'library', label: 'Digital Library & Hubs', icon: BookOpen },
          { id: 'sports', label: 'Sports Arena & Complex', icon: Trophy }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`pb-4 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === t.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Clubs Grid */}
      {activeTab === 'clubs' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubs.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br border ${c.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {c.members}+ Active Members
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">{c.name}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{c.category} Society • Faculty Mentor: {c.lead}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hostels Tab */}
      {activeTab === 'hostels' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Residential Life</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Smart, Connected Living Accommodations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                4 Modern residence towers (Oak, Pine, Maple, Cedar) equipped with high-speed fiber-optic Wi-Fi, biometric security, air conditioning, study lounges, and round-the-clock medical wardens.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Single & Double occupancy studio rooms with attached en-suite bathrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-cuisine dining hall serving nutritious dietary menu cycles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Power backup, automated laundry rooms, and gymnasium</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 h-72">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
                alt="Hostel Room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-700 h-72">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
                alt="Library View"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Knowledge Center</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Central Computational & Digital Library
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Spanning 4 floors with over 150,000 physical volumes, 2.5 million e-books, and subscriptions to IEEE Xplore, ScienceDirect, ACM Digital Library, and SpringerNature.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Digital Terminals:</span>
                  <span className="font-bold text-white text-sm">250 Workstations</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Reading Hours:</span>
                  <span className="font-bold text-white text-sm">24/7 Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sports Tab */}
      {activeTab === 'sports' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">Athletics & Recreation</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Olympic-Standard Sports Arena
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nurturing physical wellness alongside intellect with FIFA-regulation football turf, Olympic 50m swimming facility, indoor badminton courts, and squash arena.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900 text-amber-400 border border-slate-800 text-xs font-semibold">
                  National University Games Champions 2025
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 h-72">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
                alt="Sports Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
