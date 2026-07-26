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

export async function readPackages() {
  return readJson("packages.json");
}

export async function writePackages(packages) {
  await writeJson("packages.json", packages);
}

export async function readLeads() {
  return readJson("leads.json");
}

export async function writeLeads(leads) {
  await writeJson("leads.json", leads);
}

export async function readBlogs() {
  return readJson("blogs.json");
}

export async function writeBlogs(blogs) {
  await writeJson("blogs.json", blogs);
}

export async function readGallery() {
  return readJson("gallery.json");
}

export async function writeGallery(gallery) {
  await writeJson("gallery.json", gallery);
}

export async function readReviews() {
  return readJson("reviews.json");
}

export async function writeReviews(reviews) {
  await writeJson("reviews.json", reviews);
}

export async function readCategories() {
  return readJson("categories.json");
}

export async function writeCategories(categories) {
  await writeJson("categories.json", categories);
}

export async function readSeo() {
  return readJson("seo.json");
}

export async function writeSeo(seo) {
  await writeJson("seo.json", seo);
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
