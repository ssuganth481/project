import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Notice, UserRole } from '../../types';
import {
  Bell,
  Search,
  Calendar,
  Download,
  AlertCircle,
  FileText,
  Tag,
  Share2,
  X
} from 'lucide-react';

interface NoticesEventsPageProps {
  onNavigate: (view: string, role?: UserRole) => void;
}

export const NoticesEventsPage: React.FC<NoticesEventsPageProps> = ({ onNavigate }) => {
  const { notices } = useCollegeData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = [
    { id: 'all', label: 'All Announcements' },
    { id: 'exam', label: 'Examinations' },
    { id: 'placement', label: 'Placement Drives' },
    { id: 'academic', label: 'Academics & Research' },
    { id: 'event', label: 'Fests & Events' }
  ];

  const filteredNotices = notices.filter((n) => {
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryColor = (cat: Notice['category']) => {
    switch (cat) {
      case 'exam':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'placement':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'academic':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'event':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
          <Bell className="w-3.5 h-3.5" /> Official Communications Desk
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          Institutional Notices & Circulars
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Official bulletins from the Office of the Registrar, Controller of Examinations, and Dean of Student Welfare.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, exams, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((n) => (
            <div
              key={n.id}
              onClick={() => setActiveNoticeModal(n)}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getCategoryColor(n.category)}`}>
                    {n.category}
                  </span>
                  {n.isUrgent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                      Urgent Alert
                    </span>
                  )}
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {n.date}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">Issued by: {n.publisher}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-indigo-300 transition-colors">
                {n.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {n.content}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                {n.attachmentName ? (
                  <span className="text-indigo-400 font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {n.attachmentName}
                  </span>
                ) : <span />}

                <span className="text-indigo-400 font-bold group-hover:underline">
                  Read Full Notice →
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-sm text-slate-500 glass-card rounded-2xl border border-slate-800">
            No notices match your criteria.
          </div>
        )}
      </div>

      {/* Full Notice Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getCategoryColor(activeNoticeModal.category)}`}>
                  {activeNoticeModal.category}
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-2">
                  {activeNoticeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>{activeNoticeModal.content}</p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-slate-400">Published by: <strong className="text-white">{activeNoticeModal.publisher}</strong></div>
                <div className="text-slate-400">Date of Release: <strong className="text-white">{activeNoticeModal.date}</strong></div>
                <div className="text-slate-400">Target Audience: <strong className="text-white capitalize">{activeNoticeModal.targetRole}</strong></div>
              </div>

              {activeNoticeModal.attachmentName && (
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold text-white">{activeNoticeModal.attachmentName}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${activeNoticeModal.attachmentName}...`)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
