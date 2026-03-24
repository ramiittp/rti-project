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
  const [days, setDays] = useState(0);
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
    <div style={{ padding: "20px" }}>
      <h2>RTI Generator</h2>

      <textarea
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <br />
      <button onClick={handleSuggest}>Suggest Authority</button>

      <p>Department: {department}</p>

      <button onClick={handleGenerate}>Generate RTI</button>

      <pre>{letter}</pre>

      <hr />

      <h2>Response Analyzer</h2>

      <textarea
        placeholder="Paste response"
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Days taken"
        onChange={(e) => setDays(e.target.value)}
      />

      <button onClick={handleAnalyze}>Analyze</button>

      {score && (
        <div>
          <p>Final Score: {score.finalScore}</p>
          <p>Time Score: {score.timeScore}</p>
          <p>Completeness: {score.completenessScore}</p>
          <p>Compliance: {score.complianceScore}</p>
        </div>
      )}
    </div>
  );
}

export default App;