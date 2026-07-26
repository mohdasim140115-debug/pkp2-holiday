import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { readLeads, writeLeads } from "@/lib/admin/data-store";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.phone || !body.email) {
    return NextResponse.json({ error: "Name, phone and email are required" }, { status: 400 });
  }

  const lead = {
    id: randomUUID(),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    whatsapp: body.whatsapp ? String(body.whatsapp).trim() : "",
    email: String(body.email).trim(),
    travelDate: body.travelDate || "",
    adults: body.adults ? Number(body.adults) : null,
    children: body.children ? Number(body.children) : null,
    budget: body.budget || "",
    destination: body.destination || "",
    message: body.message ? String(body.message).trim() : "",
    status: "new",
    createdAt: new Date().toISOString(),
  };

  const leads = await readLeads();
  leads.unshift(lead);
  await writeLeads(leads);

  return NextResponse.json({ ok: true }, { status: 201 });
}
