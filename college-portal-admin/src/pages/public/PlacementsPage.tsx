import React from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { UserRole } from '../../types';
import {
  TrendingUp,
  Award,
  Briefcase,
  Building,
  DollarSign,
  CheckCircle2,
  Users,
  Star,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface PlacementsPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const PlacementsPage: React.FC<PlacementsPageProps> = ({ onNavigate }) => {
  const { placementStats } = useCollegeData();

  const salaryTrends = [
    { year: '2022', avg: 10.4, highest: 38.0 },
    { year: '2023', avg: 11.8, highest: 42.0 },
    { year: '2024', avg: 13.2, highest: 44.5 },
    { year: '2025', avg: 14.1, highest: 46.0 },
    { year: '2026 (Ongoing)', avg: 15.6, highest: 48.0 }
  ];

  const domainDistribution = [
    { name: 'Cloud & AI Systems', value: 38, color: '#6366f1' },
    { name: 'Product Software (SDE)', value: 28, color: '#a855f7' },
    { name: 'FinTech & Quant Risk', value: 16, color: '#10b981' },
    { name: 'Core Semiconductors', value: 12, color: '#f59e0b' },
    { name: 'Consulting & Analytics', value: 6, color: '#ec4899' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Award className="w-3.5 h-3.5" /> Department of Training & Corporate Relations
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          Career Placements & Industry Leadership
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Our graduating seniors command industry-leading compensation packages at world-renowned technology conglomerates, quantitative finance firms, and elite research labs.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-black text-white font-heading">$48.0 LPA</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-xs font-bold uppercase text-emerald-400">Highest Package Offered</h4>
          <p className="text-xs text-slate-400 mt-1">NVIDIA - Deep Learning Hardware</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-indigo-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-black text-white font-heading">$15.6 LPA</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-xs font-bold uppercase text-indigo-400">Average Compensation</h4>
          <p className="text-xs text-slate-400 mt-1">Top 25% cohort average: $26.4 LPA</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-purple-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-black text-white font-heading">98.6%</span>
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-xs font-bold uppercase text-purple-400">Placement Conversion</h4>
          <p className="text-xs text-slate-400 mt-1">Over 720+ eligible seniors placed</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-black text-white font-heading">180+</span>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-xs font-bold uppercase text-amber-400">Recruiting Companies</h4>
          <p className="text-xs text-slate-400 mt-1">Fortune 500, FAANG & Unicorns</p>
        </div>
      </div>

      {/* Analytics Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Year-over-Year Salary Growth */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> Year-over-Year CTC Trend ($ LPA)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryTrends}>
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg" fill="#6366f1" radius={[4, 4, 0, 0]} name="Average CTC" />
                <Bar dataKey="highest" fill="#10b981" radius={[4, 4, 0, 0]} name="Highest CTC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Distribution Pie */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400" /> Hiring Distribution by Sector (%)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {domainDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recruiter Details Table */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white font-heading">
          Premier Campus Recruiters & Offer Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placementStats.map((rec, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-extrabold text-white font-heading">{rec.company}</h4>
                  <p className="text-xs text-slate-400">{rec.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-400 font-mono">${rec.packageLPA} LPA</span>
                  <span className="block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {rec.tier}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Key Roles Offered:</p>
                <div className="flex flex-wrap gap-1.5">
                  {rec.rolesOffered.map((r, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                <span>Selected Candidates: <strong className="text-white">{rec.offersCount}</strong></span>
                <span className="text-indigo-400 font-semibold">Drive Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
