import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

async function downloadFile(url, filename) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank');
  }
}

function StatCard({ icon, label, value, sub, onClick }) {
  return (
    <div className={`dash-card ${onClick ? 'clickable' : ''}`} onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <strong style={{ fontSize: '1.8rem', margin: '4px 0' }}>{value}</strong>
      <span>{label}</span>
      {onClick && <small style={{ color: '#a855f7', fontSize: '0.72rem', marginTop: 2 }}>Click to view history →</small>}
      {sub && <small style={{ color: '#999', fontSize: '0.75rem' }}>{sub}</small>}
    </div>
  );
}

function ScoreBar({ score }) {
  const color = score >= 70 ? '#2ecc71' : score >= 40 ? '#f39c12' : '#e74c3c';
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <p className="score-label">{score}/100</p>
    </div>
  );
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function BaseModal({ title, count, onClose, onClearAll, clearing, confirmClear, setConfirmClear, search, setSearch, loading, children }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{title}</h3>
            <p className="modal-sub">{count} total</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {count > 0 && !confirmClear && (
              <button className="clear-history-btn" onClick={() => setConfirmClear(true)}>🗑️ Clear All</button>
            )}
            {confirmClear && (
              <>
                <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>Sure?</span>
                <button className="clear-confirm-btn" onClick={onClearAll} disabled={clearing}>{clearing ? '...' : 'Yes'}</button>
                <button className="clear-cancel-btn" onClick={() => setConfirmClear(false)}>No</button>
              </>
            )}
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="modal-filters">
          <input className="history-search" style={{ width: '100%' }} placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="modal-body">
          {loading && <p className="history-loading">Loading...</p>}
          {!loading && children}
        </div>
      </div>
    </div>
  , document.body);
}

function ContentModal({ onClose, username }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/content-history/?filter=all&username=${encodeURIComponent(username)}`)
      .then(r => r.json()).then(setHistory).catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [username]);

  const handleClear = async () => {
    setClearing(true);
    await fetch(`http://127.0.0.1:8000/api/content-history/clear/?username=${encodeURIComponent(username)}`, { method: 'DELETE' });
    setHistory([]); setConfirmClear(false); setClearing(false);
  };

  const filtered = history.filter(i => i.topic.toLowerCase().includes(search.toLowerCase()));

  return (
    <BaseModal title="🎨 Content History" count={history.length} onClose={onClose}
      onClearAll={handleClear} clearing={clearing} confirmClear={confirmClear}
      setConfirmClear={setConfirmClear} search={search} setSearch={setSearch} loading={loading}>
      {filtered.length === 0 && <div className="history-empty"><span>📭</span><p>No content found.</p></div>}
      {filtered.map(item => (
        <div className="history-card" key={item.id}>
          <div className="history-card-header">
            <span className="history-card-topic">📌 {item.topic}</span>
            <span className="history-card-date">{timeAgo(item.created_at)}</span>
          </div>
          <div className="history-card-images">
            {item.file_url && (
              <div className="history-card-img-wrap">
                <p className="history-img-label">🖼️ Version A</p>
                {item.content_type === 'reel'
                  ? <video controls src={item.file_url} className="history-card-img" />
                  : <img src={item.file_url} alt="Version A" className="history-card-img" />}
                <button className="history-download-btn" onClick={() => downloadFile(item.file_url, `post-a-${item.id}.${item.content_type === 'reel' ? 'mp4' : 'png'}`)}>⬇️ Download</button>
              </div>
            )}
            {item.file_url_b && (
              <div className="history-card-img-wrap">
                <p className="history-img-label">🤖 Version B</p>
                {item.content_type === 'reel'
                  ? <video controls src={item.file_url_b} className="history-card-img" />
                  : <img src={item.file_url_b} alt="Version B" className="history-card-img" />}
                <button className="history-download-btn" onClick={() => downloadFile(item.file_url_b, `post-b-${item.id}.${item.content_type === 'reel' ? 'mp4' : 'png'}`)}>⬇️ Download</button>
              </div>
            )}
          </div>
          <div className="history-card-body">
            <div className="history-card-field"><label>🪝 Hook</label><p>{item.hook}</p></div>
            <div className="history-card-field"><label>📝 Caption</label><p>{item.caption}</p></div>
            <div className="history-card-field"><label>#️⃣ Hashtags</label><p className="hashtags">{item.hashtags}</p></div>
          </div>
        </div>
      ))}
    </BaseModal>
  );
}

function InsightsModal({ onClose, username }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/insights-history/?username=${encodeURIComponent(username)}`)
      .then(r => r.json()).then(setHistory).catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [username]);

  const handleClear = async () => {
    setClearing(true);
    await fetch(`http://127.0.0.1:8000/api/insights-history/clear/?username=${encodeURIComponent(username)}`, { method: 'DELETE' });
    setHistory([]); setConfirmClear(false); setClearing(false);
  };

  const filtered = history.filter(i => (i.overall_health || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <BaseModal title="📊 Insights History" count={history.length} onClose={onClose}
      onClearAll={handleClear} clearing={clearing} confirmClear={confirmClear}
      setConfirmClear={setConfirmClear} search={search} setSearch={setSearch} loading={loading}>
      {filtered.length === 0 && <div className="history-empty"><span>📭</span><p>No insights found.</p></div>}
      {filtered.map(item => (
        <div className="history-card" key={item.id}>
          <div className="history-card-header">
            <span className="history-card-topic">📊 {item.overall_health || 'Insight'}</span>
            <span className="history-card-date">{timeAgo(item.created_at)}</span>
          </div>
          <div className="history-card-content">
            {item.image && <div className="history-card-media"><img src={`http://127.0.0.1:8000${item.image}`} alt="insight" /></div>}
            <div className="history-card-body">
              <div className="history-card-field"><label>👁️ Avg Reach</label><p>{item.avg_reach}</p></div>
              <div className="history-card-field"><label>❤️ Avg Likes</label><p>{item.avg_likes}</p></div>
              <div className="history-card-field"><label>💬 Avg Comments</label><p>{item.avg_comments}</p></div>
              <div className="history-card-field"><label>📈 Engagement Rate</label><p>{item.engagement_rate}%</p></div>
              <div className="history-card-field"><label>🏥 Health Score</label><p>{item.health_score}/100</p></div>
              {item.growth_tips && <div className="history-card-field"><label>💡 Growth Tips</label><p>{item.growth_tips}</p></div>}
            </div>
          </div>
        </div>
      ))}
    </BaseModal>
  );
}

function PredictionsModal({ onClose, username }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/predictions-history/?username=${encodeURIComponent(username)}`)
      .then(r => r.json()).then(setHistory).catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [username]);

  const handleClear = async () => {
    setClearing(true);
    await fetch(`http://127.0.0.1:8000/api/predictions-history/clear/?username=${encodeURIComponent(username)}`, { method: 'DELETE' });
    setHistory([]); setConfirmClear(false); setClearing(false);
  };

  const filtered = history.filter(i => (i.reach_potential || i.result || '').toLowerCase().includes(search.toLowerCase()));
  const scoreColor = (s) => s >= 70 ? '#2ecc71' : s >= 40 ? '#f39c12' : '#e74c3c';

  return (
    <BaseModal title="🔮 Predictions History" count={history.length} onClose={onClose}
      onClearAll={handleClear} clearing={clearing} confirmClear={confirmClear}
      setConfirmClear={setConfirmClear} search={search} setSearch={setSearch} loading={loading}>
      {filtered.length === 0 && <div className="history-empty"><span>📭</span><p>No predictions found.</p></div>}
      {filtered.map(item => (
        <div className="history-card" key={item.id}>
          <div className="history-card-header">
            <span className="history-card-topic">🔮 {item.reach_potential || item.result}</span>
            <span className="history-card-date">{timeAgo(item.created_at)}</span>
          </div>
          <div className="history-card-content">
            {item.image && <div className="history-card-media"><img src={`http://127.0.0.1:8000${item.image}`} alt="prediction" /></div>}
            <div className="history-card-body">
              <div className="history-card-field">
                <label>🎯 Score</label>
                <div className="score-bar-wrap">
                  <div className="score-bar-bg">
                    <div className="score-bar-fill" style={{ width: `${item.score}%`, background: scoreColor(item.score) }} />
                  </div>
                  <p className="score-label">{item.score}/100</p>
                </div>
              </div>
              {item.estimated_reach && <div className="history-card-field"><label>👥 Est. Reach</label><p>{item.estimated_reach}</p></div>}
              {item.what_is_good && <div className="history-card-field"><label>✅ What's Good</label><p>{item.what_is_good}</p></div>}
              {item.what_is_bad && <div className="history-card-field"><label>❌ What's Bad</label><p>{item.what_is_bad}</p></div>}
              {item.improvements && <div className="history-card-field"><label>💡 Improvements</label><p>{item.improvements}</p></div>}
            </div>
          </div>
        </div>
      ))}
    </BaseModal>
  );
}

function TrendingWidget() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [copied, setCopied] = useState(null);

  const fetchTrends = (force = false) => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/trending/${force ? '?force=true' : ''}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) { setTrends(data); setError(''); }
        else setError(data.error || 'Failed to load trends.');
        setLastUpdated(new Date());
      })
      .catch(() => setError('Failed to load trends.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrends();
    const interval = setInterval(() => fetchTrends(), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const copyHashtags = (hashtags, rank) => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(rank);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="trending-widget">
      <div className="trending-widget-header">
        <div>
          <p className="section-title" style={{ marginBottom: 2 }}>Trending Now</p>
          {lastUpdated && (
            <span className="trending-updated">
              Updated {timeAgo(lastUpdated.toISOString())} · auto-refreshes every 30 min
            </span>
          )}
        </div>
        <button className="trending-refresh-btn" onClick={() => fetchTrends(true)} disabled={loading}>
          {loading ? '⏳' : '🔄'} Refresh
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading && !trends.length && (
        <div className="trending-skeleton-list">
          {[...Array(6)].map((_, i) => <div className="trending-skeleton" key={i} />)}
        </div>
      )}

      {!error && trends.length > 0 && (
        <div className="trending-list">
          {trends.map(item => (
            <div className="trending-card" key={item.rank}>
              <div className="trending-card-top">
                <span className="trending-rank">#{item.rank}</span>
                <span className="trending-topic">{item.topic}</span>
              </div>
              <div className="trending-hashtags">
                {item.hashtags.map((tag, i) => (
                  <span className="trending-tag" key={i}>{tag}</span>
                ))}
              </div>
              <button
                className={`trending-copy-btn ${copied === item.rank ? 'copied' : ''}`}
                onClick={() => copyHashtags(item.hashtags, item.rank)}
              >
                {copied === item.rank ? '✅ Copied!' : '📋 Copy hashtags'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ user = '' }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/dashboard/?username=${encodeURIComponent(user)}`)
      .then(r => r.json()).then(setData)
      .catch(() => setError('Failed to load dashboard.'));
  }, [user]);

  if (error) return <div><h2>Dashboard</h2><p className="error">{error}</p></div>;
  if (!data) return <div><h2>Dashboard</h2><p style={{ color: '#999' }}>Loading...</p></div>;

  return (
    <div>
      <h2>Dashboard</h2>

      {modal === 'content'     && <ContentModal     onClose={() => setModal(null)} username={user} />}
      {modal === 'insights'    && <InsightsModal    onClose={() => setModal(null)} username={user} />}
      {modal === 'predictions' && <PredictionsModal onClose={() => setModal(null)} username={user} />}

      <div className="dash-main-layout">
        {/* LEFT: stats */}
        <div className="dash-left">
          <p className="section-title">Overview</p>
          <div className="dashboard-grid">
            <StatCard label="Content Generated"  value={data.total_content}     onClick={() => setModal('content')} />
            <StatCard label="Insights Analyzed"  value={data.total_insights}    onClick={() => setModal('insights')} />
            <StatCard label="Predictions Made"   value={data.total_predictions} onClick={() => setModal('predictions')} />
          </div>

          {data.total_insights > 0 && (
            <>
              <p className="section-title" style={{ marginTop: 24 }}>Quick Stats</p>
              <div className="dashboard-grid">
                <StatCard label="Avg Reach"        value={data.avg_reach.toLocaleString()}    sub="across all insights" />
                <StatCard label="Avg Engagement"   value={`${data.avg_engagement_rate}%`}     sub="across all insights" />
                <StatCard label="Avg Health Score" value={`${data.avg_health_score}/100`}     sub="account health" />
                {data.total_predictions > 0 && (
                  <>
                    <StatCard label="Best Post Score" value={`${data.best_prediction_score}/100`} sub="highest prediction" />
                    <StatCard label="Avg Post Score"  value={`${data.avg_prediction_score}/100`}  sub="across all predictions" />
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT: trending */}
        <div className="dash-right">
          <TrendingWidget />
        </div>
      </div>

      {/* BOTTOM: recent activity full width */}
      <p className="section-title" style={{ marginTop: 32 }}>Recent Activity</p>

      {data.recent_content?.length > 0 && (
        <>
          <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: 6 }}>Content Generated</p>
          <div className="history-list">
            {data.recent_content.map((item, i) => (
              <div className="history-item" key={i}>
                <div className="stat"><span>Topic</span><strong>{item.topic}</strong></div>
                <div className="stat"><span>When</span><strong>{timeAgo(item.created_at)}</strong></div>
              </div>
            ))}
          </div>
        </>
      )}

      {data.recent_insights?.length > 0 && (
        <>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '16px 0 6px' }}>Recent Insights</p>
          <div className="history-list">
            {data.recent_insights.map((item, i) => (
              <div className="history-item" key={i}>
                <div className="stat"><span>Reach</span><strong>{item.avg_reach}</strong></div>
                <div className="stat"><span>Engagement</span><strong>{item.engagement_rate}%</strong></div>
                <div className="stat"><span>Health</span><strong>{item.overall_health || 'N/A'}</strong></div>
                <div className="stat"><span>Score</span><strong>{item.health_score ?? 'N/A'}</strong></div>
                <div className="stat"><span>When</span><strong>{timeAgo(item.created_at)}</strong></div>
              </div>
            ))}
          </div>
        </>
      )}

      {data.recent_predictions?.length > 0 && (
        <>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: '16px 0 6px' }}>Recent Predictions</p>
          <div className="history-list">
            {data.recent_predictions.map((item, i) => (
              <div className="history-item" key={i} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div className="stat"><span>Potential</span><strong>{item.reach_potential || item.result}</strong></div>
                  <div className="stat"><span>When</span><strong>{timeAgo(item.created_at)}</strong></div>
                </div>
                <ScoreBar score={item.score} />
              </div>
            ))}
          </div>
        </>
      )}

      {!data.total_content && !data.total_insights && !data.total_predictions && (
        <p style={{ color: '#999', fontSize: '0.9rem' }}>No data yet. Start by generating content or analyzing insights.</p>
      )}
    </div>
  );
}
