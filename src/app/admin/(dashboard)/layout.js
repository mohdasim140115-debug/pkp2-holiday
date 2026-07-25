import AdminSidebar from "../AdminSidebar";

export const metadata = {
  title: "Super Admin | PKP Holidays",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-offwhite">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
    </div>
  );
}
