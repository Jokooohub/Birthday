import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Birthday Wish & Poem Helper Endpoint
  app.post("/api/generate-wish", async (req, res) => {
    try {
      const { name, relation, tone } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          wish: `Happy 25th Birthday ${name || 'beautiful'}! Wishing you a quarter-century filled with endless love, laughter, radiant health, and unforgettable adventures! ✨💖`,
          source: 'fallback'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Write a short, heartfelt, aesthetic 25th birthday wish for a girl named "${name || 'her'}". 
The wish is from her ${relation || 'friend'}, in a ${tone || 'sweet and romantic'} tone.
Keep it between 2 to 4 sentences, formatted with charming pastel emojis (✨, 💖, 🌸, 🎂, 🥂).
Focus on celebrating her reaching 25 years old (quarter century) and being loved and special. Do not include quotes or surrounding text.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const wishText = response.text ? response.text.trim() : `Happy 25th Birthday ${name}! May your day be as sparkling and magnificent as you are! ✨🌸`;

      return res.json({ wish: wishText, source: 'ai' });
    } catch (error) {
      console.error("Error generating wish with Gemini:", error);
      return res.json({
        wish: `Happy 25th Birthday! Wishing you a magical quarter-century milestone overflowing with happiness, warm memories, and love! 🌸🎂✨`,
        source: 'fallback'
      });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
