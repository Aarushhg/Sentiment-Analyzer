// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./logo.png"; // ✅ Import your logo

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const saved = localStorage.getItem("dd_history");
    if (saved) setHistory(JSON.parse(saved));
    const savedDark = localStorage.getItem("dd_dark");
    if (savedDark) setDark(savedDark === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("dd_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("dd_dark", dark);
  }, [dark]);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/predict`, { tweet: text });
      setResult(res.data);
      const record = {
        text,
        prediction: res.data.prediction,
        confidence: res.data.confidence,
        time: new Date().toISOString(),
      };
      setHistory((prev) => [record, ...prev].slice(0, 30));
    } catch (err) {
      console.error(err);
      alert("Error calling backend. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" && (e.ctrlKey || e.metaKey)) && !loading && text.trim()) {
      analyze();
    }
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="header">
        {/* ✅ Replace text heading with logo image */}
        <img src={logo} alt="Sentiment Analyzer Logo" className="logo" tabIndex="0" />

        {/* Improved toggle switch */}
        <label className="toggle" aria-label="Toggle dark mode">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark((d) => !d)}
            aria-checked={dark}
          />
          <span className="slider" />
          Dark
        </label>
      </header>

      <main className="main">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text or type here..."
          rows={8}
          onKeyDown={handleKeyDown}
          aria-label="Input text for depression detection"
        />

        <div className="controls">
          <button
            onClick={analyze}
            disabled={!text.trim() || loading}
            aria-disabled={!text.trim() || loading}
            aria-busy={loading}
            aria-label="Analyze text for depression"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            onClick={() => {
              setText("");
              setResult(null);
            }}
            aria-label="Clear input and results"
          >
            Clear
          </button>
        </div>

        {result && (
          <div className="result" role="region" aria-live="polite" aria-atomic="true">
            <h2 tabIndex="0">Prediction: {result.prediction}</h2>
            {result.confidence !== null && (
              <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            )}
            {result.probabilities && (
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(result.probabilities, null, 2)}
              </pre>
            )}
          </div>
        )}

        <section className="history" aria-label="Analysis history">
          <h3>History</h3>
          {history.length === 0 && <p>No entries yet.</p>}
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                <div>
                  <strong>{h.prediction}</strong>{" "}
                  {h.confidence !== null ? `(${(h.confidence * 100).toFixed(1)}%)` : ""}
                </div>
                <div className="small">{new Date(h.time).toLocaleString()}</div>
                <div className="small">{h.text}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
