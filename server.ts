import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables. Please set it in the Secrets panel.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API endpoints FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Security analysis proxy endpoint
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { type, logData, promptExtra } = req.body;
      
      if (!logData) {
        return res.status(400).json({ error: "No telemetry/log data provided for analysis." });
      }

      const client = getGeminiClient();

      const systemInstruction = `You are NEXUS, an advanced military-grade AI Security Cyber Defense and Forensic Intelligence Engine. 
Analyze the provided user registration/login/session activity telemetry and determine if there is an active threat (such as bot registering duplicate accounts, spam, SQL injection, hijacked credit cards, disposable email usage, or dictionary attacks).
Return a comprehensive, polished, and highly professional cyber forensics report in JSON format.
The output MUST be parseable JSON matching this syntax strictly:
{
  "analyzedAt": "ISO date string",
  "threatType": "Short category name (e.g., BOT_REPLAY_ATTACK, SPAM_REGISTRATION, INJECTION_ATTEMPT, CLEARED)",
  "riskScore": 0 to 100 integer,
  "severity": "Low" | "Medium" | "High" | "Critical",
  "assessment": "Detailed multi-paragraph professional analyst evaluation of what patterns were detected (e.g. click timings, fake emails, fast fingerprint typing).",
  "forensicIndicators": ["List of suspicious indicators spotted"],
  "mitigationSteps": ["Specific threat mitigation actions recommended"],
  "honeypotScore": 0 to 100 percentage (likelihood of being a dummy bot or automated scraper),
  "deceptionRoute": "MIRAGE Honeypot Destination or Normal Session"
}
Ensure the output is pure JSON. Do not wrap in markdown code blocks like \`\`\`json. Just standard raw text in JSON format.`;

      const prompt = `Perform instant forensic intelligence analysis on this cybersecurity event:
Event Type/Context: ${type || 'REAL-TIME SESSION TELEMETRY'}
Telemetry Data: ${JSON.stringify(logData, null, 2)}
Additional Instructions: ${promptExtra || 'None'}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (parseErr) {
        console.error("Error parsing Gemini JSON response. Raw text:", responseText);
        // Fallback structured data if parsing fails
        parsedData = {
          analyzedAt: new Date().toISOString(),
          threatType: "ANALYSIS_PARSING_FAILED",
          riskScore: 85,
          severity: "High",
          assessment: "Intelligence reports parsing failure. AI raw remarks: " + responseText,
          forensicIndicators: ["Invalid JSON format in model outputs"],
          mitigationSteps: ["Review model parameters", "Trigger adaptive OTP for all nodes"],
          honeypotScore: 90,
          deceptionRoute: "MIRAGE Honeypot Admin Override"
        };
      }

      res.json(parsedData);
    } catch (err: any) {
      console.error("Gemini API Cyber Defense error:", err);
      res.status(500).json({
        error: err.message || "Threat intelligence service offline",
        details: "Is GEMINI_API_KEY correctly configured in the AI Studio Secrets panel?"
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NEXUS Server] Active on port ${PORT}`);
  });
}

startServer();
