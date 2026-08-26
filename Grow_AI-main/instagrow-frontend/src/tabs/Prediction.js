import { useState, useRef } from 'react';

function ScoreBar({ score }) {
  const color = score >= 70 ? '#2ecc71' : score >= 40 ? '#f39c12' : '#e74c3c';
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <p className="score-label">{score}/100 — {score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low'} Performance</p>
    </div>
  );
}

function ResultField({ label, value }) {
  if (!value) return null;
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

export default function Prediction({ user = '' }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const res = await fetch('http://127.0.0.1:8000/api/predict/', {
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
      <h2>Performance Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="dropzone-row">
          <DropZone
            preview={preview}
            onChange={handleImageChange}
            label="Drag & drop your post image here to predict its performance"
          />
          <button type="submit" className="dropzone-btn" disabled={loading || !image}>{loading ? '🔍 Analyzing...' : 'Predict'}</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <div className="result-field">
            <label>Reach Score</label>
            <ScoreBar score={result.score} />
          </div>

          <ResultField label="Reach Potential" value={result.reach_potential} />
          <ResultField label="Estimated Reach" value={result.estimated_reach} />
          <ResultField label="Verdict" value={result.will_reach} />
          <ResultField label="What's Good" value={result.what_is_good} />
          <ResultField label="What's Bad" value={result.what_is_bad} />
          <ResultField label="How to Improve" value={result.improvements} />
          <ResultField label="Better Caption" value={result.better_caption} />

          {result.better_hashtags && (
            <div className="result-field">
              <label>Better Hashtags</label>
              <p style={{ color: '#5b9bd5', wordBreak: 'break-word' }}>{result.better_hashtags}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
