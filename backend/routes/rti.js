import express from "express";
import fs from "fs";

const router = express.Router();

// Load authority data
const authorities = JSON.parse(
  fs.readFileSync("./data/authorities.json")
);

// 🔹 Authority Suggestion API
router.post("/suggest-authority", (req, res) => {
  const { query } = req.body;

  let department = "General Administration";

  for (let key in authorities) {
    if (query.toLowerCase().includes(key)) {
      department = authorities[key];
      break;
    }
  }

  res.json({ department });
});

// 🔹 RTI Generator API
router.post("/generate-rti", (req, res) => {
  const { name, address, department, query } = req.body;

  const letter = `
To,
The Public Information Officer,
${department}

Subject: Request under RTI Act 2005

Sir/Madam,
I would like to request the following information:

${query}

Kindly provide the information within 30 days.

Thank you,
${name}
${address}
`;

  res.json({ letter });
});

// 🔹 Response Quality Analyzer
router.post("/analyze-response", (req, res) => {
  const { responseText, daysTaken } = req.body;

  let timeScore = daysTaken <= 30 ? 100 : 50;

  let completenessScore = responseText.length > 50 ? 80 : 40;

  let complianceScore = responseText.toLowerCase().includes("information")
    ? 80
    : 40;

  const finalScore =
    0.4 * timeScore + 0.3 * completenessScore + 0.3 * complianceScore;

  res.json({
    timeScore,
    completenessScore,
    complianceScore,
    finalScore: Math.round(finalScore)
  });
});

export default router;