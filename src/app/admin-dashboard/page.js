import Dashboard from "@/components/Admin/Dashboard/Dashboard";
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";

export default function AdminDashboard() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}