import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Tirumala Saptagiri API" });
  });

  // API Route: Tirumala Purana Scholar (Gemini 3.7 Flash)
  app.post("/api/gemini/scholar", async (req, res) => {
    try {
      const { question, language = "te", contextTopic } = req.body;

      if (!question || typeof question !== "string") {
        return res.status(400).json({ error: "ప్రశ్న అవసరం (Question is required)" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback spiritual answer if API key is not present in local dev
        return res.json({
          answer: language === "te"
            ? `ఓం నమో వేంకటేశాయ! తిరుమల ఏడుకొండలు (శేషాద్రి, నీలాద్రి, గరుడాద్రి, అంజనాద్రి, వృషభాద్రి, నారాయణాద్రి, వెంకటాద్రి) సాక్షాత్తు ఆదిశేషుని ఏడు పడగల దివ్య రూపం. కలియుగ వైకుంఠమైన తిరుమలలో శ్రీ వేంకటేశ్వరుని దర్శనం సర్వపాపహరణం, ముక్తిదాయకం.`
            : `Om Namo Venkatesaya! The Seven Sacred Hills of Tirumala (Seshadri, Neeladri, Garudadri, Anjanadri, Vrishabhadri, Narayanadri, and Venkatadri) represent the seven divine hoods of Adi Sesha. Lord Venkateswara's abode in Kali Yuga is the supreme sanctuary of grace and liberation.`,
          source: "offline_fallback"
        });
      }

      const systemPrompt = `You are a revered and deeply knowledgeable Vedic and Puranic scholar specializing in Sri Venkateswara Mahatyam, Tirumala Tirupati Devasthanam traditions, Tirumala Saptagiri (The 7 Hills: Seshadri, Neeladri, Garudadri, Anjanadri, Vrishabhadri, Narayanadri, Venkatadri), Puranic legends (Varaha Purana, Padma Purana, Bhavishyottara Purana, Brahmanda Purana), holy tirthams, Annamayya kirtanas, temple sevas, and historical inscriptions.
Respond respectfully, beginning with "ఓం నమో వేంకటేశాయ" (or "Om Namo Venkatesaya" in English).
When language is "te" (Telugu), provide rich, eloquent, authentic Telugu with accurate puranic details, slokas where appropriate, and devout reverence.
When language is "en" (English), provide articulate, devotional, and informative answers with Telugu terms in transliteration.
Include authentic details from TTD publications and sacred puranas.
Topic focus context: ${contextTopic || "Tirumala Saptagiri & Venkateswara Mahatyam"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: question,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const answer = response.text || (language === "te" ? "శ్రీవారి అనుగ్రహం లభించుగాక." : "May Lord Srinivasa bless you.");
      return res.json({ answer, source: "gemini" });
    } catch (error: any) {
      console.error("Gemini Scholar Error:", error);
      res.status(500).json({
        error: "పురాణ సమాచారం పొందడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
        details: error?.message || "Internal server error"
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tirumala Saptagiri Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
