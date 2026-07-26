import { readReviews } from "@/lib/admin/data-store";
import ReviewsTable from "./ReviewsTable";
import AddReviewForm from "./AddReviewForm";

export default async function AdminReviewsPage() {
  const reviews = await readReviews();
  const sorted = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Review Approvals</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {reviews.length} reviews total · {pendingCount} pending approval
          </p>
        </div>
        <AddReviewForm />
      </div>

      <ReviewsTable reviews={sorted} />
    </div>
  );
}
