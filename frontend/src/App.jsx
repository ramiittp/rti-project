import { useState } from "react";
import {
  suggestAuthority,
  generateRTI,
  analyzeResponse
} from "./api";

function App() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [letter, setLetter] = useState("");
  const [responseText, setResponseText] = useState("");
  const [days, setDays] = useState("");
  const [score, setScore] = useState(null);

  const handleSuggest = async () => {
    const res = await suggestAuthority(query);
    setDepartment(res.department);
  };

  const handleGenerate = async () => {
    const res = await generateRTI({
      name: "Ram",
      address: "India",
      department,
      query
    });
    setLetter(res.letter);
  };

  const handleAnalyze = async () => {
    const res = await analyzeResponse({
      responseText,
      daysTaken: Number(days)
    });
    setScore(res);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>RTI Generator & Analyzer</h1>

      {/* RTI Generator */}
      <div style={styles.card}>
        <h2>📝 RTI Generator</h2>

        <textarea
          style={styles.textarea}
          placeholder="Enter your RTI query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={styles.row}>
          <button style={styles.button} onClick={handleSuggest}>
            Suggest Authority
          </button>
          <span style={styles.department}>{department}</span>
        </div>

        <button style={styles.primaryButton} onClick={handleGenerate}>
          Generate RTI
        </button>

        {letter && <pre style={styles.output}>{letter}</pre>}
      </div>

      {/* Analyzer */}
      <div style={styles.card}>
        <h2>📊 Response Analyzer</h2>

        <textarea
          style={styles.textarea}
          placeholder="Paste RTI response here..."
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Days taken"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <button style={styles.primaryButton} onClick={handleAnalyze}>
          Analyze Response
        </button>

        {score && (
          <div style={styles.result}>
            <h3>Final Score: {score.finalScore}/100</h3>
            <p>⏱ Time Score: {score.timeScore}</p>
            <p>📄 Completeness: {score.completenessScore}</p>
            <p>✅ Compliance: {score.complianceScore}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  card: {
    background: "#f9f9f9",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  button: {
    padding: "8px 12px",
    border: "none",
    background: "#555",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },
  primaryButton: {
    padding: "10px",
    width: "100%",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  department: {
    fontWeight: "bold"
  },
  output: {
    background: "#fff",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap"
  },
  result: {
    background: "#eaf7ea",
    padding: "10px",
    borderRadius: "5px"
  }
};

export default App;