import { NextResponse } from "next/server";
import { readLeads } from "@/lib/admin/data-store";

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ leads });
}
