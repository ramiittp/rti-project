const BASE_URL = "http://YOUR_PC_IP:5000/api"; 
// Example: http://192.168.1.5:5000/api

export const suggestAuthority = async (query) => {
  const res = await fetch(`${BASE_URL}/suggest-authority`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const generateRTI = async (data) => {
  const res = await fetch(`${BASE_URL}/generate-rti`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const analyzeResponse = async (data) => {
  const res = await fetch(`${BASE_URL}/analyze-response`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};