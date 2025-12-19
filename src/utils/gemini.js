import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Simple check to help debug if the key is missing
if (!apiKey) {
  console.error("CRITICAL: API Key is missing. Check .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

// We use 1.5 Flash because it is the current standard for free keys
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateInfographicData = async (topic) => {
  try {
const prompt = `
  ... (your existing instructions) ...

  Return a JSON object with this EXACT structure:
  {
    "title": "A short, punchy headline for the topic",
    "executive_summary": "A 2-3 sentence high-level overview of the topic, written in a journalistic style.",
    "stats": [
      { "label": "Label 1 (e.g. Market Size)", "value": "$10B" },
      { "label": "Label 2 (e.g. Growth)", "value": "+15%" },
      { "label": "Label 3 (e.g. Adoption)", "value": "High" }
    ],
    "chartData": [
      { "name": "Category A", "value": 100 },
      { "name": "Category B", "value": 200 }
    ],
    "references": ["Ref 1", "Ref 2"]
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
    // This helps us see the real error in the console if it happens again
    throw error;
  }
};