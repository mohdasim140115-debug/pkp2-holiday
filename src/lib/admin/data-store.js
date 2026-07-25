import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson(file) {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
  return JSON.parse(raw);
}

async function writeJson(file, data) {
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function readDestinations() {
  return readJson("destinations.json");
}

export async function writeDestinations(destinations) {
  await writeJson("destinations.json", destinations);
}

function slugifyId(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function makeUniqueId(name, existing) {
  const base = slugifyId(name) || "destination";
  let id = base;
  let n = 2;
  const ids = new Set(existing.map((d) => d.id));
  while (ids.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  return id;
}
