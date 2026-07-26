import { readLeads } from "@/lib/admin/data-store";
import LeadsTable from "./LeadsTable";

export default async function AdminLeadsPage() {
  const leads = await readLeads();
  const sorted = [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy">Leads & Bookings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {leads.length} enquiries total · {newCount} new
        </p>
      </div>

      <LeadsTable leads={sorted} />
    </div>
  );
}
