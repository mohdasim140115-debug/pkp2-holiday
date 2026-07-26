import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readDestinations, readPackages, writePackages } from "@/lib/admin/data-store";
import { slugify } from "@/lib/data/packages";

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

export async function GET(request, { params }) {
  const { id } = await params;
  const packages = await readPackages();
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ package: pkg });
}

export async function PUT(request, { params }) {
  const { id } = await params;
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
  const index = packages.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entry = { id, ...normalizePayload(body) };
  packages[index] = entry;
  await writePackages(packages);
  revalidatePackagePaths();
  revalidatePath(`/packages/${slugify(entry.name)}`);

  return NextResponse.json({ package: entry });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const packages = await readPackages();
  const index = packages.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  packages.splice(index, 1);
  await writePackages(packages);
  revalidatePackagePaths();

  return NextResponse.json({ ok: true });
}
