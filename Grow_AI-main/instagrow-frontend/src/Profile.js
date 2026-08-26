import { useState, useEffect } from 'react';
import './Profile.css';

const NICHES = [
  { value: 'fitness', label: '💪 Fitness & Health' },
  { value: 'tech', label: '💻 Technology' },
  { value: 'food', label: '🍕 Food & Cooking' },
  { value: 'fashion', label: '👗 Fashion & Style' },
  { value: 'education', label: '📚 Education' },
  { value: 'business', label: '💼 Business' },
  { value: 'travel', label: '✈️ Travel' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'beauty', label: '💄 Beauty' },
  { value: 'other', label: '🌟 Other' },
];

const AUDIENCES = [
  { value: 'teens', label: '🧑 Teens (13-17)' },
  { value: 'young_adults', label: '🙋 Young Adults (18-24)' },
  { value: 'adults', label: '👨 Adults (25-34)' },
  { value: 'professionals', label: '👔 Professionals (35+)' },
  { value: 'general', label: '🌍 General Audience' },
];

const GOALS = [
  { value: 'grow_followers', label: '📈 Grow Followers' },
  { value: 'increase_engagement', label: '❤️ Increase Engagement' },
  { value: 'promote_business', label: '🏢 Promote Business' },
  { value: 'build_brand', label: '✨ Build Personal Brand' },
  { value: 'drive_sales', label: '💰 Drive Sales' },
];

export default function Profile({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/core/profile/?username=${encodeURIComponent(user)}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setForm({
          brand_name: data.brand_name || '',
          niche: data.niche || '',
          target_audience: data.target_audience || '',
          posting_goal: data.posting_goal || '',
        });
      })
      .catch(() => {});
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch('http://127.0.0.1:8000/core/save-profile/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg('✅ Saved!');
        setProfile(p => ({ ...p, ...form }));
        setEditing(false);
      }
    } catch {
      setSaveMsg('❌ Failed to save.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      await fetch(`http://127.0.0.1:8000/api/content-history/clear/?username=${encodeURIComponent(user)}`, { method: 'DELETE' });
      await fetch(`http://127.0.0.1:8000/api/insights-history/clear/?username=${encodeURIComponent(user)}`, { method: 'DELETE' });
      await fetch(`http://127.0.0.1:8000/api/predictions-history/clear/?username=${encodeURIComponent(user)}`, { method: 'DELETE' });
      setConfirmReset(false);
      setSaveMsg('✅ All data cleared!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('❌ Failed to reset.');
    } finally {
      setResetting(false);
    }
  };

  const toggleAudience = (val) => {
    const current = form.target_audience.split(',').filter(Boolean);
    const updated = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
    setForm({ ...form, target_audience: updated.join(',') });
  };

  const getNicheLabel = (val) => NICHES.find(n => n.value === val)?.label || val;
  const getGoalLabel = (val) => GOALS.find(g => g.value === val)?.label || val;
  const getAudienceLabels = (val) => val ? val.split(',').map(v => AUDIENCES.find(a => a.value === v)?.label || v).join(', ') : '—';

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Avatar */}
        <div className="profile-avatar">
          <div className="profile-avatar-circle">
            <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
          <div className="profile-avatar-ring" />
        </div>

        {/* Info */}
        <div className="profile-info">
          <h2 className="profile-username">{user}</h2>
        </div>

        {/* Account details */}
        <div className="profile-details">
          <div className="profile-detail-item">
            <span className="profile-detail-icon">📅</span>
            <div>
              <p className="profile-detail-label">Member Since</p>
              <p className="profile-detail-value">{profile?.date_joined || '...'}</p>
            </div>
          </div>
          <div className="profile-detail-item">
            <span className="profile-detail-icon">🕒</span>
            <div>
              <p className="profile-detail-label">Last Login</p>
              <p className="profile-detail-value">{profile?.last_login || '...'}</p>
            </div>
          </div>
        </div>

        {/* AI Profile section */}
        <div className="profile-ai-section">
          <div className="profile-ai-header">
            <span className="profile-ai-title">🤖 What AI knows about you</span>
            <button className="profile-edit-btn" onClick={() => setEditing(e => !e)}>
              {editing ? 'Cancel' : '✏️ Edit'}
            </button>
          </div>

          {!editing ? (
            <div className="profile-ai-view">
              <div className="profile-ai-item"><span>Brand Name</span><strong>{profile?.brand_name || '—'}</strong></div>
              <div className="profile-ai-item"><span>Niche</span><strong>{getNicheLabel(profile?.niche)}</strong></div>
              <div className="profile-ai-item"><span>Target Audience</span><strong>{getAudienceLabels(profile?.target_audience)}</strong></div>
              <div className="profile-ai-item"><span>Posting Goal</span><strong>{getGoalLabel(profile?.posting_goal)}</strong></div>
            </div>
          ) : (
            <div className="profile-ai-edit">
              <div className="profile-edit-field">
                <label>Brand Name</label>
                <input value={form.brand_name} onChange={e => setForm({ ...form, brand_name: e.target.value })} placeholder="e.g. VDart Academy" />
              </div>
              <div className="profile-edit-field">
                <label>Niche</label>
                <div className="profile-edit-grid">
                  {NICHES.map(n => (
                    <button key={n.value} type="button"
                      className={`profile-edit-option ${form.niche === n.value ? 'selected' : ''}`}
                      onClick={() => setForm({ ...form, niche: n.value })}>
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="profile-edit-field">
                <label>Target Audience <span style={{ color: '#64748b', fontWeight: 400 }}>(multi-select)</span></label>
                <div className="profile-edit-grid">
                  {AUDIENCES.map(a => (
                    <button key={a.value} type="button"
                      className={`profile-edit-option ${form.target_audience.split(',').includes(a.value) ? 'selected' : ''}`}
                      onClick={() => toggleAudience(a.value)}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="profile-edit-field">
                <label>Posting Goal</label>
                <div className="profile-edit-grid">
                  {GOALS.map(g => (
                    <button key={g.value} type="button"
                      className={`profile-edit-option ${form.posting_goal === g.value ? 'selected' : ''}`}
                      onClick={() => setForm({ ...form, posting_goal: g.value })}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
              <button className="profile-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          )}
          {saveMsg && <p className="profile-save-msg">{saveMsg}</p>}
        </div>

        {/* Reset data */}
        <div className="profile-reset-section">
          {!confirmReset ? (
            <button className="profile-reset-btn" onClick={() => setConfirmReset(true)}>
              🗑️ Reset All My Data
            </button>
          ) : (
            <div className="profile-reset-confirm">
              <p>This will delete all your content, insights and predictions. Are you sure?</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="profile-reset-confirm-btn" onClick={handleReset} disabled={resetting}>
                  {resetting ? 'Deleting...' : 'Yes, Delete All'}
                </button>
                <button className="profile-reset-cancel-btn" onClick={() => setConfirmReset(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button className="profile-logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
