import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const scanRoots = ["public", "src/assets"];
const modelExtensions = new Set([".glb", ".gltf", ".bin", ".fbx", ".obj"]);
const limitBytes = 25 * 1024 * 1024;

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(nextPath, results);
      continue;
    }

    if (entry.isFile() && modelExtensions.has(path.extname(entry.name).toLowerCase())) {
      const size = fs.statSync(nextPath).size;
      results.push({ path: nextPath, size });
    }
  }

  return results;
}

const models = scanRoots.flatMap((scanRoot) => walk(path.join(root, scanRoot)));
const oversized = models.filter((model) => model.size > limitBytes);

if (oversized.length > 0) {
  console.error(`Model size check failed. Limit: ${formatMb(limitBytes)}`);
  for (const model of oversized) {
    console.error(`- ${path.relative(root, model.path)}: ${formatMb(model.size)}`);
  }
  process.exit(1);
}

console.log(`Model size check passed. ${models.length} model file(s), max ${formatMb(limitBytes)}.`);
