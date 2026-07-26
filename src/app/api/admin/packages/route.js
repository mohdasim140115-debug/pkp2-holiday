import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readDestinations, readPackages, writePackages, makeUniqueId } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    destinationId: String(body.destinationId || "").trim(),
    name: String(body.name || "").trim(),
    tag: String(body.tag || "").trim(),
    categories: Array.isArray(body.categories)
      ? body.categories.map((c) => String(c).trim()).filter(Boolean)
      : [],
    days: Number(body.days) || 1,
    nights: Number(body.nights) || 0,
    price: Number(body.price) || 0,
    rating: Number(body.rating) || 4.5,
    img: String(body.img || "").trim(),
    best: String(body.best || "").trim(),
    highlights: Array.isArray(body.highlights)
      ? body.highlights.map((h) => String(h).trim()).filter(Boolean)
      : [],
  };
}

function revalidatePackagePaths() {
  revalidatePath("/packages");
  revalidatePath("/domestic-tours");
  revalidatePath("/international-tours");
  revalidatePath("/", "layout");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destinationId = searchParams.get("destinationId");
  const packages = await readPackages();
  const filtered = destinationId ? packages.filter((p) => p.destinationId === destinationId) : packages;
  return NextResponse.json({ packages: filtered });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.destinationId) {
    return NextResponse.json({ error: "Name and destination are required" }, { status: 400 });
  }

  const destinations = await readDestinations();
  const destination = destinations.find((d) => d.id === body.destinationId);
  if (!destination) {
    return NextResponse.json({ error: "Destination not found" }, { status: 400 });
  }

  const packages = await readPackages();
  const id = makeUniqueId(body.name, packages);
  const entry = { id, ...normalizePayload(body) };

  packages.push(entry);
  await writePackages(packages);
  revalidatePackagePaths();

  return NextResponse.json({ package: entry }, { status: 201 });
}
