import { NextResponse } from "next/server";
import { readLeads, writeLeads } from "@/lib/admin/data-store";

const VALID_STATUSES = ["new", "contacted", "closed"];

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const leads = await readLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  leads[index] = { ...leads[index], status: body.status };
  await writeLeads(leads);

  return NextResponse.json({ lead: leads[index] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const leads = await readLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  leads.splice(index, 1);
  await writeLeads(leads);

  return NextResponse.json({ ok: true });
}
