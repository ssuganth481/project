import { useState, useEffect, useRef } from 'react';

function HealthBar({ score }) {
  const color = score >= 75 ? '#2ecc71' : score >= 50 ? '#f39c12' : '#e74c3c';
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <p className="score-label">{score}/100 — Account Health</p>
    </div>
  );
}

function ResultField({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="result-field">
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}

function DropZone({ preview, onChange, label }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    onChange(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`dropzone ${dragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
      onClick={() => !preview && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
      {preview ? (
        <>
          <img src={preview} alt="preview" className="dropzone-preview" />
          <button type="button" className="dropzone-remove" onClick={(e) => { e.stopPropagation(); onChange(null); }}>✕ Remove</button>
        </>
      ) : (
        <div className="dropzone-placeholder">
          <span className="dropzone-icon">🖼️</span>
          <p className="dropzone-text">{label || 'Drag & drop your image here'}</p>
          <p className="dropzone-sub">or click to browse</p>
        </div>
      )}
    </div>
  );
}

export default function Insights({ user = '' }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Page analysis state
  const [pageUrl, setPageUrl] = useState('');
  const [pageResult, setPageResult] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState('');
  const [savingPage, setSavingPage] = useState(false);
  const [pageSaved, setPageSaved] = useState(false);
  const [savedUrl, setSavedUrl] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/insights-history/?username=${encodeURIComponent(user)}`)
      .then(r => r.json()).then(setHistory).catch(() => {});
    // load saved page url
    fetch(`http://127.0.0.1:8000/core/profile/?username=${encodeURIComponent(user)}`)
      .then(r => r.json()).then(d => { if (d.instagram_url) setSavedUrl(d.instagram_url); }).catch(() => {});
  }, [result, user]);

  const handleAnalyzePage = async () => {
    if (!pageUrl) { setPageError('Enter an Instagram URL first.'); return; }
    setPageLoading(true);
    setPageError('');
    setPageResult(null);
    setPageSaved(false);
    try {
      const res = await fetch('http://127.0.0.1:8000/core/analyze-page/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: pageUrl, username: user }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      setPageResult(data.result);
    } catch (err) {
      setPageError(err.message || 'Failed to analyze.');
    } finally {
      setPageLoading(false);
    }
  };

  const handleSavePage = async () => {
    setSavingPage(true);
    // build a clean readable summary for the AI
    const summary = [
      pageResult.about,
      `Content type: ${pageResult.content_type}`,
      `Target audience: ${pageResult.target_audience}`,
      `Tone: ${pageResult.tone}`,
      `Niche: ${pageResult.niche}`,
    ].filter(Boolean).join('. ');
    try {
      await fetch('http://127.0.0.1:8000/core/save-page-description/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user,
          url: pageUrl,
          description: summary,
        }),
      });
      setPageSaved(true);
      setSavedUrl(pageUrl);
    } catch {}
    finally { setSavingPage(false); }
  };

  const handleImageChange = (file) => {
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setResult(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('username', user);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/insights/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Insights Analyzer</h2>

      {/* Section 1 — Page Analysis */}
      <div className="page-analysis-section">
        <p className="section-title">Analyze Your Instagram Page</p>
        {savedUrl && !pageResult && (
          <p className="page-saved-note">Previously analyzed: <strong>{savedUrl}</strong></p>
        )}
        <div className="page-analysis-row">
          <input
            className="page-url-input"
            value={pageUrl}
            onChange={e => setPageUrl(e.target.value)}
            placeholder="https://www.instagram.com/yourpage/"
          />
          <button className="page-analyze-btn" onClick={handleAnalyzePage} disabled={pageLoading}>
            {pageLoading ? 'Analyzing...' : 'Analyze Page'}
          </button>
        </div>
        {pageError && <p className="error">{pageError}</p>}
        {pageResult && (
          <div className="page-result">
            <div className="page-result-header">
              <strong>{pageResult.account_name}</strong>
              <span>{pageResult.niche}</span>
            </div>
            <div className="result-field"><label>About</label><p>{pageResult.about}</p></div>
            <div className="result-field"><label>Content Type</label><p>{pageResult.content_type}</p></div>
            <div className="result-field"><label>Target Audience</label><p>{pageResult.target_audience}</p></div>
            <div className="result-field"><label>Tone</label><p>{pageResult.tone}</p></div>
            <div className="result-field"><label>Recommended Post Types</label><p>{pageResult.recommended_post_types}</p></div>
            <div className="result-field"><label>Growth Suggestion</label><p>{pageResult.growth_suggestion}</p></div>
            {pageResult.content_ideas?.length > 0 && (
              <div className="result-field">
                <label>Content Ideas</label>
                <ul className="page-ideas-list">
                  {pageResult.content_ideas.map((idea, i) => <li key={i}>{idea}</li>)}
                </ul>
              </div>
            )}
            {!pageSaved ? (
              <button className="page-save-btn" onClick={handleSavePage} disabled={savingPage}>
                {savingPage ? 'Saving...' : 'Save for future reference'}
              </button>
            ) : (
              <p className="page-saved-msg">Saved! AI will use this context for future content generation.</p>
            )}
          </div>
        )}
      </div>

      <hr className="divider" />

      {/* Section 2 — Screenshot Analysis */}
      <p className="section-title">Analyze Insights Screenshot</p>
      <form onSubmit={handleSubmit}>
        <div className="dropzone-row">
          <DropZone
            preview={preview}
            onChange={handleImageChange}
            label="Drag & drop your insights screenshot here"
          />
          <button type="submit" className="dropzone-btn" disabled={loading || !image}>{loading ? '🔍 Analyzing...' : 'Analyze'}</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          {result.health_score != null && (
            <div className="result-field">
              <label>Account Health Score</label>
              <HealthBar score={result.health_score} />
            </div>
          )}

          <ResultField label="Overall Health" value={result.overall_health} />
          <ResultField label="Follower Growth" value={result.follower_growth} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, margin: '12px 0' }}>
            <div className="result-field"><label>Avg Reach</label><p>{result.avg_reach}</p></div>
            <div className="result-field"><label>Avg Likes</label><p>{result.avg_likes}</p></div>
            <div className="result-field"><label>Avg Comments</label><p>{result.avg_comments}</p></div>
            <div className="result-field"><label>Avg Shares</label><p>{result.avg_shares}</p></div>
            <div className="result-field"><label>Avg Saves</label><p>{result.avg_saves}</p></div>
            <div className="result-field"><label>Engagement Rate</label><p>{result.engagement_rate}%</p></div>
          </div>

          <ResultField label="Best Performing Content" value={result.best_performing_content} />
          <ResultField label="Worst Performing Content" value={result.worst_performing_content} />
          <ResultField label="Posting Pattern" value={result.posting_pattern} />
          <ResultField label="Audience Summary" value={result.audience_summary} />
          <ResultField label="Growth Tips" value={result.growth_tips} />
        </div>
      )}

      {history.length > 0 && (
        <>
          <hr className="divider" />
          <p className="section-title">Past Insights</p>
          <div className="history-list">
            {history.map(item => (
              <div className="history-item" key={item.id}>
                <div className="stat"><span>Reach</span><strong>{item.avg_reach}</strong></div>
                <div className="stat"><span>Likes</span><strong>{item.avg_likes}</strong></div>
                <div className="stat"><span>Comments</span><strong>{item.avg_comments}</strong></div>
                <div className="stat"><span>Engagement</span><strong>{item.engagement_rate}%</strong></div>
                <div className="stat"><span>Health</span><strong>{item.overall_health || 'N/A'}</strong></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
