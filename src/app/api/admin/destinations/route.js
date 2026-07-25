import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readDestinations, writeDestinations, makeUniqueId } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    name: String(body.name || "").trim(),
    state: body.state ? String(body.state).trim() : null,
    country: String(body.country || "").trim(),
    type: body.type === "international" ? "international" : "domestic",
    categories: Array.isArray(body.categories)
      ? body.categories.map((c) => String(c).trim()).filter(Boolean)
      : [],
    days: Number(body.days) || 1,
    nights: Number(body.nights) || 0,
    price: Number(body.price) || 0,
    rating: Number(body.rating) || 4.5,
    img: String(body.img || "").trim(),
    tag: String(body.tag || "").trim(),
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

export async function GET() {
  const destinations = await readDestinations();
  return NextResponse.json({ destinations });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.country) {
    return NextResponse.json({ error: "Name and country are required" }, { status: 400 });
  }

  const destinations = await readDestinations();
  const id = makeUniqueId(body.name, destinations);
  const entry = { id, ...normalizePayload(body) };

  destinations.push(entry);
  await writeDestinations(destinations);
  revalidatePackagePaths();

  return NextResponse.json({ destination: entry }, { status: 201 });
}
