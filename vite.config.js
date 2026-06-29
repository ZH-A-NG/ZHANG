import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const commerceDataPath = path.resolve(projectRoot, "src/data/commerceWorks.json");
const commerceUploadDir = path.resolve(projectRoot, "public/assets/commerce/works");
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function safeFileName(fileName) {
  const parsed = path.parse(fileName || "image.png");
  const ext = parsed.ext.toLowerCase();
  const safeExt = allowedExtensions.has(ext) ? ext : ".png";
  const base = (parsed.name || "image")
    .normalize("NFKD")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "image";
  return `${Date.now()}-${base}${safeExt}`;
}

function commerceWorksApi() {
  return {
    name: "commerce-works-local-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/commerce-works")) {
          next();
          return;
        }

        try {
          if (req.method === "GET" && req.url === "/api/commerce-works") {
            const text = await fs.readFile(commerceDataPath, "utf8");
            sendJson(res, 200, JSON.parse(text));
            return;
          }

          if (req.method === "POST" && req.url === "/api/commerce-works/save") {
            const body = await readBody(req);
            const payload = JSON.parse(body || "{}");
            if (!Array.isArray(payload.groups)) {
              sendJson(res, 400, { error: "Invalid commerce works payload." });
              return;
            }
            await fs.mkdir(path.dirname(commerceDataPath), { recursive: true });
            await fs.writeFile(commerceDataPath, `${JSON.stringify({ groups: payload.groups }, null, 2)}\n`, "utf8");
            sendJson(res, 200, { ok: true });
            server.ws.send({ type: "full-reload" });
            return;
          }

          if (req.method === "POST" && req.url === "/api/commerce-works/upload") {
            const body = await readBody(req);
            const payload = JSON.parse(body || "{}");
            const match = String(payload.dataUrl || "").match(/^data:image\/(png|jpeg|jpg|webp|avif);base64,(.+)$/);
            if (!match) {
              sendJson(res, 400, { error: "Only JPG, PNG, WebP, and AVIF images are supported." });
              return;
            }
            const fileName = safeFileName(payload.fileName);
            const filePath = path.join(commerceUploadDir, fileName);
            await fs.mkdir(commerceUploadDir, { recursive: true });
            await fs.writeFile(filePath, Buffer.from(match[2], "base64"));
            sendJson(res, 200, { src: `/assets/commerce/works/${fileName}`, fileName });
            return;
          }

          sendJson(res, 404, { error: "Not found." });
        } catch (error) {
          sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
        }
      });
    },
  };
}

export default defineConfig({
  assetsInclude: ["**/*.glb"],
  plugins: [react(), commerceWorksApi()],
});
