
import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' })); // Allow large payloads for base64 images

  // Helper to read data
  const readData = async () => {
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      return {};
    }
  };

  // Helper to write data
  const writeData = async (data: any) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  };

  // API routes
  app.get("/api/data/:key", async (req, res) => {
    const { key } = req.params;
    const data = await readData();
    res.json(data[key] || null);
  });

  app.post("/api/data/:key", async (req, res) => {
    const { key } = req.params;
    const value = req.body;
    const data = await readData();
    data[key] = value;
    await writeData(data);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
