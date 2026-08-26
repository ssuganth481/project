import { useState, useEffect, useRef } from 'react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function ProgressBar({ isReel }) {
  const ESTIMATE = isReel ? 120 : 60;
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const pct = Math.min((elapsed / ESTIMATE) * 100, 95);
  const remaining = Math.max(ESTIMATE - elapsed, 0);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = mins > 0 ? `~${mins}m ${secs}s remaining` : `~${secs}s remaining`;

  return (
    <div className="gen-progress">
      <div className="gen-progress-header">
        <span className="gen-progress-label">{isReel ? '🎬 Generating Reel' : '🖼️ Generating Posts'}</span>
        <span className="gen-progress-time">{timeStr}</span>
      </div>
      <div className="gen-progress-track">
        <div className="gen-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="gen-progress-pct">{Math.round(pct)}% complete</p>
    </div>
  );
}

const POST_MESSAGES = [
  '🍳 AI is cooking your images...',
  '🎨 Painting pixels with intelligence...',
  '📸 Generating two versions for you...',
  '✍️ Writing your hook and caption...',
  '🌟 Almost there, adding the final touch...',
];

const REEL_MESSAGES = [
  '🎬 AI is directing your reel...',
  '🎞️ Stitching scenes together...',
  '🎵 Adding background music...',
  '🍳 AI is cooking your reel...',
  '🚀 Rendering your masterpiece...',
  '⏳ Good things take time, hang tight...',
];

function CookingText({ isReel }) {
  const messages = isReel ? REEL_MESSAGES : POST_MESSAGES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % messages.length), 3000);
    return () => clearInterval(t);
  }, [messages.length]);

  return <p className="cooking-text" key={index}>{messages[index]}</p>;
}

function ScoreBar({ score }) {
  const color = score >= 70 ? '#2ecc71' : score >= 40 ? '#f39c12' : '#e74c3c';
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <p className="score-label">{score}/100 — {score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low'} Potential</p>
    </div>
  );
}

function PredictionPanel({ prediction }) {
  if (!prediction) return (
    <div className="prediction-panel">
      <p className="prediction-panel-title">🔮 Post Prediction</p>
      <p style={{ color: '#475569', fontSize: '0.85rem' }}>Prediction unavailable</p>
    </div>
  );
  return (
    <div className="prediction-panel">
      <p className="prediction-panel-title">🔮 Post Prediction</p>
      <ScoreBar score={prediction.reach_score || 0} />
      {prediction.reach_potential && <div className="pred-field"><span>Potential</span><strong>{prediction.reach_potential}</strong></div>}
      {prediction.estimated_reach && <div className="pred-field"><span>Est. Reach</span><strong>{prediction.estimated_reach}</strong></div>}
      {prediction.will_reach && <div className="pred-field"><span>Verdict</span><p>{prediction.will_reach}</p></div>}
      {prediction.what_is_good && <div className="pred-field"><span>✅ What's Good</span><p>{prediction.what_is_good}</p></div>}
      {prediction.what_is_bad && <div className="pred-field"><span>❌ What's Bad</span><p>{prediction.what_is_bad}</p></div>}
      {prediction.improvements && <div className="pred-field"><span>💡 Improvements</span><p>{prediction.improvements}</p></div>}
    </div>
  );
}

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

function VersionCard({ label, fileUrl, data, contentType, prediction }) {
  const [expanded, setExpanded] = useState(false);
  const [showPred, setShowPred] = useState(false);
  const hashtagsText = Array.isArray(data?.hashtags)
    ? data.hashtags.map(t => `#${t.replace('#', '')}`).join(' ')
    : data?.hashtags || '';

  return (
    <div className="version-card">
      <div className="version-label">{label}</div>
      {fileUrl ? (
        <div className="version-preview">
          {contentType === 'reel' ? <video controls src={fileUrl} /> : <img src={fileUrl} alt={label} />}
        </div>
      ) : (
        <div className="version-preview-empty">⚠️ Image generation failed</div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="use-this-btn" style={{ flex: 1 }} onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Hide Details' : '✅ Use This'}
        </button>
        <button className="use-this-btn" style={{ flex: 1 }} onClick={() => setShowPred(e => !e)}>
          {showPred ? 'Hide Prediction' : '🔮 Predict'}
        </button>
        {fileUrl && (
          <button className="use-this-btn" onClick={() => downloadFile(fileUrl, `grow-ai-${Date.now()}.${contentType === 'reel' ? 'mp4' : 'png'}`)}>
            ⬇️
          </button>
        )}
      </div>
      {expanded && (
        <div className="version-details">
          <div className="result-field"><label>Hook</label><p>{data?.hook}</p></div>
          <div className="result-field"><label>Caption</label><p>{data?.caption}</p><CopyButton text={data?.caption || ''} /></div>
          <div className="result-field"><label>Hashtags</label><p className="hashtags">{hashtagsText}</p><CopyButton text={hashtagsText} /></div>
        </div>
      )}
      {showPred && <PredictionPanel prediction={prediction} />}
    </div>
  );
}

const ASPECT_RATIOS = {
  post: [
    { label: '1:1 Square', value: '1:1' },
    { label: '4:5 Portrait', value: '4:5' },
    { label: '16:9 Landscape', value: '16:9' },
  ],
  reel: [
    { label: '9:16 Standard', value: '9:16' },
    { label: '4:5 Short', value: '4:5' },
  ],
};

export default function ContentGenerator({ defaultView = 'generate', user = '' }) {
  const [form, setForm] = useState({ topic: '', context: '', content_type: 'post', aspect_ratio: '1:1' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hooks, setHooks] = useState([]);
  const [hooksLoading, setHooksLoading] = useState(false);
  const [view, setView] = useState(defaultView);
  const [history, setHistory] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [historyLoading, setHistoryLoading] = useState(false);
  const [searchTopic, setSearchTopic] = useState('');

  // Auto-fetch history if defaultView is history
  useEffect(() => {
    if (defaultView === 'history') fetchHistory('all');
  }, [defaultView]);

  const handleContentTypeChange = (e) => {
    const ct = e.target.value;
    setForm({ ...form, content_type: ct, aspect_ratio: ASPECT_RATIOS[ct][0].value });
  };

  const fetchHistory = async (filter) => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/content-history/?filter=${filter}`);
      const data = await res.json();
      setHistory(data);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleViewHistory = () => {
    setView('history');
    fetchHistory(historyFilter);
  };

  const handleFilterChange = (f) => {
    setHistoryFilter(f);
    fetchHistory(f);
  };

  const filteredHistory = history.filter(item =>
    item.topic.toLowerCase().includes(searchTopic.toLowerCase())
  );

  const handleGetIdeas = async () => {
    if (!form.topic) { setError('Enter a topic first.'); return; }
    setHooksLoading(true);
    setHooks([]);
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/get-hooks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: form.topic }),
      });
      const data = await res.json();
      if (data.hooks) setHooks(data.hooks);
      else setError('Failed to get ideas.');
    } catch {
      setError('Failed to connect to the server.');
    } finally {
      setHooksLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/generate-content/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, username: user }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (showGenerateAgain) => (
    <div className="form-container">
      <div className="form-group">
        <label>Content Type</label>
        <select value={form.content_type} onChange={handleContentTypeChange}>
          <option value="post">Post</option>
          <option value="reel">Reel</option>
        </select>
      </div>
      <div className="form-row-topic">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Topic</label>
          <input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Social Media Growth" required />
        </div>
        <div className="form-group" style={{ width: 220 }}>
          <label>Aspect Ratio</label>
          <select value={form.aspect_ratio} onChange={e => setForm({ ...form, aspect_ratio: e.target.value })}>
            {ASPECT_RATIOS[form.content_type].map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="context-label-row">
          <label>Specific Context <span style={{ color: '#475569', fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
          <span className="ideas-hint">
            Not sure what to write?{' '}
            <button type="button" className="ideas-link" onClick={handleGetIdeas} disabled={hooksLoading}>
              {hooksLoading ? 'Getting ideas...' : 'Get Ideas →'}
            </button>
          </span>
        </div>
        <input value={form.context} onChange={e => setForm({ ...form, context: e.target.value })} placeholder="e.g. Tips for growing your Instagram engagement" />
        {hooks.length > 0 && (
          <select className="hooks-dropdown" onChange={e => setForm({ ...form, context: e.target.value })} defaultValue="">
            <option value="" disabled>Select a hook idea...</option>
            {hooks.map((h, i) => <option key={i} value={h.hook}>[{h.style}] {h.hook}</option>)}
          </select>
        )}
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Generating...' : showGenerateAgain ? 'Generate Again' : 'Generate'}</button>
    </div>
  );

  return (
    <div>
      <h2>Content Generator</h2>

      {!result && (
        <div className="gen-form-centered">
          <form onSubmit={handleSubmit}>{renderForm(false)}</form>
        </div>
      )}

      {loading && (
        <div className="gen-loading">
          <div className="gen-pulse-rings">
            <div className="gen-pulse-ring" />
            <div className="gen-pulse-ring" />
            <img src="/cat.gif" alt="generating" />
          </div>
          <CookingText isReel={form.content_type === 'reel'} />
          <ProgressBar isReel={form.content_type === 'reel'} />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="gen-result-layout">
          <div className="gen-result-left">
            <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>{renderForm(true)}</form>
            {result.content_type === 'reel' ? (
              <div className="result">
                {result.file_url_a && <div className="media-preview"><video controls src={result.file_url_a} /></div>}
                <div className="result-field"><label>Hook</label><p>{result.hook}</p></div>
                <div className="result-field"><label>Caption</label><p>{result.caption}</p><CopyButton text={result.caption} /></div>
                <div className="result-field">
                  <label>Hashtags</label>
                  <p className="hashtags">{Array.isArray(result.hashtags) ? result.hashtags.map(t => `#${t.replace('#', '')}`).join(' ') : ''}</p>
                  <CopyButton text={Array.isArray(result.hashtags) ? result.hashtags.map(t => `#${t.replace('#', '')}`).join(' ') : ''} />
                </div>
              </div>
            ) : (
              <div className="dual-output">
                <VersionCard label="Version A — Pexels" fileUrl={result.file_url_a} data={result} contentType={result.content_type} prediction={result.prediction_a} />
                <VersionCard label="Version B — AI Generated" fileUrl={result.file_url_b} data={{ hook: result.hook_b, caption: result.caption_b, hashtags: result.hashtags_b }} contentType={result.content_type} prediction={result.prediction_b} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
