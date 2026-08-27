import React, { useState } from 'react';
import { useCollegeData } from '../../context/CollegeDataContext';
import { Notice } from '../../types';
import {
  Bell,
  Plus,
  Trash2,
  AlertTriangle,
  Send,
  CheckCircle2,
  Calendar,
  FileText,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const NoticePublisher: React.FC = () => {
  const { notices, addNotice, deleteNotice } = useCollegeData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Notice['category']>('academic');
  const [targetRole, setTargetRole] = useState<Notice['targetRole']>('all');
  const [publisher, setPublisher] = useState('Office of the Registrar');
  const [content, setContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addNotice({
      title,
      category,
      publisher,
      targetRole,
      content,
      isUrgent,
      attachmentName: attachmentName || undefined
    });

    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setAttachmentName('');
    setIsUrgent(false);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete circular from public and portal noticeboards?')) {
      deleteNotice(id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase font-mono">Communications Desk</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
            Notice & Circular Broadcaster
          </h1>
          <p className="text-xs text-slate-400">Publish urgent institutional alerts, exam schedules, and circulars directly to student/faculty portals.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Broadcast New Circular
        </button>
      </div>

      {/* Notices Grid */}
      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                  {n.category}
                </span>
                {n.isUrgent && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                    Urgent Broadcast
                  </span>
                )}
                <span className="text-xs text-slate-500 font-mono">{n.date}</span>
                <span className="text-xs text-indigo-400 font-semibold">• Target: {n.targetRole.toUpperCase()}</span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">{n.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{n.content}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Issued by: <strong className="text-slate-300">{n.publisher}</strong></span>
                {n.attachmentName && (
                  <span className="text-indigo-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {n.attachmentName}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(n.id)}
              className="self-start md:self-center p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-slate-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-heading">Broadcast Official Circular</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Circular Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Mid-Term Examination 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="academic">Academics</option>
                    <option value="exam">Examination</option>
                    <option value="placement">Placement Drive</option>
                    <option value="event">Fest / Event</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="all">All (Public & Portals)</option>
                    <option value="student">Students Only</option>
                    <option value="faculty">Faculty Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the full circular announcement..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Attachment File Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule_2026.pdf"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="pt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="urgentFlag"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-950 border-slate-700"
                  />
                  <label htmlFor="urgentFlag" className="text-slate-300 font-bold">
                    Mark as Urgent Banner
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Publish Broadcast
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
