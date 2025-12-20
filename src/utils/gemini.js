import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("CRITICAL: API Key is missing. Check .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

// USE 'gemini-1.5-flash' (Standard, fast, and reliable)
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export const generateInfographicData = async (topic) => {
  try {
    // We inject the ${topic} variable right at the start
    const prompt = `
      You are an expert data analyst and journalist.
      Generate a professional infographic report on the specific topic: "${topic}".

      Analyze the current trends, market data, and future outlook for "${topic}".
      
      Return a JSON object with this EXACT structure (do not use Markdown, just raw JSON):
      {
        "title": "A short, punchy headline for the report (max 6 words)",
        "executive_summary": "A 2-3 sentence high-level overview of ${topic}, written in a professional journalistic style.",
        "stats": [
          { "label": "Key Metric 1 (e.g. Market Value)", "value": "Number (e.g. $10B)" },
          { "label": "Key Metric 2 (e.g. Growth Rate)", "value": "Percentage (e.g. +15%)" },
          { "label": "Key Metric 3 (e.g. Adoption/User base)", "value": "Short text or number" }
        ],
        "chartData": [
          { "name": "Category A", "value": 100 },
          { "name": "Category B", "value": 150 },
          { "name": "Category C", "value": 75 },
          { "name": "Category D", "value": 50 }
        ],
        "references": [
          "Real-world source 1",
          "Real-world source 2"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // CLEANUP: Remove any accidental markdown code blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("Generation Failed:", error);
    throw error;
  }
};