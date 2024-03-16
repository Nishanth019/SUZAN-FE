import Dashboard from "@/components/admin/Dashboard/Dashboard";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";

export default function AdminDashboard() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}