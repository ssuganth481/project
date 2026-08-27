import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Award,
  Users,
  Building,
  Briefcase,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Play,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';

interface HomePageProps {
  onNavigate: (view: string, role?: UserRole) => void;
  onOpenRoleModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenRoleModal }) => {
  const { departments, notices, placementStats } = useCollegeData();

  const stats = [
    { label: 'NIRF All-India Rank', value: '#8', desc: 'Ranked Top 10 by Ministry of Education', icon: Award, color: 'text-amber-400' },
    { label: 'Campus Placement Rate', value: '98.6%', desc: 'Highest Package: $48.0 LPA (NVIDIA)', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Enrolled Innovators', value: '4,800+', desc: 'Across 6 Engineering & MBA Disciplines', icon: Users, color: 'text-indigo-400' },
    { label: 'Annual Research Grants', value: '$3.5M+', desc: 'Funded by NSF, IEEE & Tech Giants', icon: Building, color: 'text-rose-400' }
  ];

  const pillars = [
    {
      title: 'World-Class AI & Cloud Labs',
      desc: 'Hands-on training with NVIDIA H100 GPU clusters, Quantum Computing simulators, and AWS cloud sandboxes.',
      icon: Sparkles
    },
    {
      title: 'Industry-Integrated Pedagogy',
      desc: 'Curriculum co-designed with engineers from Google, Microsoft, and Qualcomm to guarantee day-1 job readiness.',
      icon: Briefcase
    },
    {
      title: 'Global Exchange & Patents',
      desc: 'Dual-degree exchange options with MIT and Oxford, alongside 120+ active faculty and student patents.',
      icon: Award
    },
    {
      title: 'Vibrant Campus & Hostels',
      desc: 'Modern sports arenas, 24/7 digital library, air-conditioned smart hostels, and 30+ vibrant student tech clubs.',
      icon: Building
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Urgent Announcement Ticker */}
          {notices.length > 0 && (
            <div className="mb-8 flex items-center justify-center">
              <div
                onClick={() => onNavigate('notices')}
                className="cursor-pointer inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-500/60 shadow-lg transition-all text-xs text-slate-300 group"
              >
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase border border-rose-500/30 animate-pulse">
                  Urgent Notice
                </span>
                <span className="truncate max-w-md font-medium text-white group-hover:text-indigo-300">
                  {notices[0].title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          )}

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Shaping Leaders in AI, Engineering & Business
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-heading leading-tight">
              Where Future <span className="text-gradient">Innovators</span> Transform Ideas into Impact.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Apex University is an autonomous premier institution dedicated to academic rigor, cutting-edge AI research, and industry-leading career placements.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <span>Apply for Admissions 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRoleModal}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Access Student & Faculty Portals</span>
              </button>
            </div>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {stats.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-white font-heading group-hover:scale-105 transition-transform">
                      {st.value}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${st.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 mb-1">{st.label}</h4>
                  <p className="text-xs text-slate-400">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Departments & Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Academic Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1">
              Explore Our Core Disciplines
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Accredited degree programs designed for tomorrow's technologies with interdisciplinary lab modules.
            </p>
          </div>
          <button
            onClick={() => onNavigate('academics')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 font-bold text-xs border border-slate-800 flex items-center gap-2 transition-all"
          >
            <span>View All 6 Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.slice(0, 6).map((dept) => (
            <div
              key={dept.id}
              onClick={() => onNavigate('academics')}
              className="cursor-pointer group glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono font-bold text-white">
                  {dept.code}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white font-heading leading-snug group-hover:text-indigo-300 transition-colors">
                    {dept.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {dept.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">HOD: {dept.headOfDepartment.split(',')[0]}</span>
                  <span className="text-indigo-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter & Placement Wall */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Industry Partnerships</span>
            <h2 className="text-3xl font-extrabold text-white font-heading mt-1">
              Top Recruiters & Global Placements
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Over 180+ Fortune 500 corporations and high-growth unicorns hire directly from Apex campus drives.
            </p>
          </div>

          {/* Placement cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {placementStats.map((pl, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-xl text-center border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center space-y-2"
              >
                <div className="text-base font-black text-white font-heading">{pl.company}</div>
                <div className="text-sm font-extrabold text-emerald-400 font-mono">${pl.packageLPA} LPA</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  {pl.tier}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('placements')}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View Full Placement Records & Alumni Success Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Why Apex University</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-2 leading-tight">
              An Ecosystem Engineered for Excellence and Groundbreaking Discovery.
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              We blend state-of-the-art computational infrastructure with individualized faculty mentorship. Our students lead international hackathons, publish in top-tier conferences, and launch venture-backed startups right from our campus incubation labs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {pillars.map((pil, idx) => {
                const Icon = pil.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{pil.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pil.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Campus Highlight Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden h-64 border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
                alt="Campus View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">Central Innovation Quad</h4>
                  <p className="text-xs text-slate-300">120-Acre Smart Connected Campus</p>
                </div>
                <button
                  onClick={() => onNavigate('campus-life')}
                  className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Admissions 2026 Applications Closing Soon</span>
                <span className="text-rose-400 font-mono font-bold">14 Days Left</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-rose-500 h-2 rounded-full w-4/5" />
              </div>
            </div>

            <button
              onClick={() => onNavigate('admissions')}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>Start Online Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Ready to Accelerate Your Academic Journey?
            </h2>
            <p className="text-sm text-slate-300">
              Apply online for Fall 2026 undergraduate, postgraduate, or research fellowships. Scholarships up to 100% available for meritorious students.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-8 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-xl transition-all"
              >
                Apply Online Now
              </button>
              <button
                onClick={() => onNavigate('academics')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700"
              >
                Explore Curricula
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
