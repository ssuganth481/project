import { useState } from 'react';
import './Login.css';

const NICHES = [
  { value: 'fitness', label: '💪 Fitness & Health' },
  { value: 'tech', label: '💻 Technology' },
  { value: 'food', label: '🍕 Food & Cooking' },
  { value: 'fashion', label: '👗 Fashion & Style' },
  { value: 'education', label: '📚 Education' },
  { value: 'business', label: '💼 Business & Entrepreneurship' },
  { value: 'travel', label: '✈️ Travel' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'beauty', label: '💄 Beauty & Skincare' },
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

export default function Onboarding({ user, onDone }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    brand_name: '',
    niche: '',
    target_audience: '',
    posting_goal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/core/save-profile/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, ...form }),
      });
      const data = await res.json();
      if (data.success) onDone();
      else setError(data.error || 'Failed to save.');
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-blob b1" />
        <div className="login-blob b2" />
        <div className="login-blob b3" />
      </div>

      <div className="login-card" style={{ maxWidth: 480 }}>
        <div className="login-logo">
          <div className="login-logo-icon">🚀</div>
          <h1>Let's set up your profile</h1>
          <span>Step {step} of 3 — helps AI personalize your content</span>
        </div>

        <div className="onboarding-progress">
          {[1, 2, 3].map(s => (
            <div key={s} className={`onboarding-step ${step >= s ? 'active' : ''}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="login-form">
            <div className="login-field">
              <label>Your Brand / Account Name</label>
              <input
                type="text"
                placeholder="e.g. John's Kitchen, Grow Studio..."
                value={form.brand_name}
                onChange={e => setForm({ ...form, brand_name: e.target.value })}
                autoFocus
              />
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: 4 }}>
                This will appear on your generated posts
              </p>
            </div>
            <button className="login-btn" onClick={() => setStep(2)}>
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="login-form">
            <div className="login-field">
              <label>Your Niche</label>
              <div className="onboarding-grid">
                {NICHES.map(n => (
                  <button
                    key={n.value}
                    type="button"
                    className={`onboarding-option ${form.niche === n.value ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, niche: n.value })}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="login-btn" style={{ background: '#f3f4f6', color: '#374151', boxShadow: 'none' }} onClick={() => setStep(1)}>← Back</button>
              <button className="login-btn" style={{ flex: 1 }} onClick={() => setStep(3)} disabled={!form.niche}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="login-form">
            <div className="login-field">
              <label>Target Audience</label>
              <div className="onboarding-grid">
                {AUDIENCES.map(a => {
                  const selected = form.target_audience.split(',').filter(Boolean).includes(a.value);
                  return (
                    <button
                      key={a.value}
                      type="button"
                      className={`onboarding-option ${selected ? 'selected' : ''}`}
                      onClick={() => {
                        const current = form.target_audience.split(',').filter(Boolean);
                        const updated = selected ? current.filter(v => v !== a.value) : [...current, a.value];
                        setForm({ ...form, target_audience: updated.join(',') });
                      }}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>You can select multiple</p>
            </div>
            <div className="login-field" style={{ marginTop: 12 }}>
              <label>Posting Goal</label>
              <div className="onboarding-grid">
                {GOALS.map(g => (
                  <button
                    key={g.value}
                    type="button"
                    className={`onboarding-option ${form.posting_goal === g.value ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, posting_goal: g.value })}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="login-error">{error}</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="login-btn" style={{ background: '#f3f4f6', color: '#374151', boxShadow: 'none' }} onClick={() => setStep(2)}>← Back</button>
              <button className="login-btn" style={{ flex: 1 }} onClick={handleSubmit} disabled={loading || !form.target_audience || !form.posting_goal}>
                {loading ? 'Saving...' : 'Get Started'}
              </button>
            </div>
          </div>
        )}

        <p className="login-switch" style={{ marginTop: 12 }}>
          <button onClick={onDone}>Skip for now</button>
        </p>
      </div>
    </div>
  );
}
