import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readDestinations, writeDestinations, readPackages, writePackages } from "@/lib/admin/data-store";

function normalizePayload(body) {
  return {
    name: String(body.name || "").trim(),
    state: body.state ? String(body.state).trim() : null,
    country: String(body.country || "").trim(),
    type: body.type === "international" ? "international" : "domestic",
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
  const destinations = await readDestinations();
  const destination = destinations.find((d) => d.id === id);
  if (!destination) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ destination });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.country) {
    return NextResponse.json({ error: "Name and country are required" }, { status: 400 });
  }

  const destinations = await readDestinations();
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entry = { id, ...normalizePayload(body) };
  destinations[index] = entry;
  await writeDestinations(destinations);
  revalidatePackagePaths();

  return NextResponse.json({ destination: entry });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const destinations = await readDestinations();
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  destinations.splice(index, 1);
  await writeDestinations(destinations);

  const packages = await readPackages();
  const remainingPackages = packages.filter((p) => p.destinationId !== id);
  if (remainingPackages.length !== packages.length) {
    await writePackages(remainingPackages);
  }

  revalidatePackagePaths();

  return NextResponse.json({ ok: true });
}
