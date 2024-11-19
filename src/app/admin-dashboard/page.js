
"use client";

import Dashboard from "@/components/Admin/Dashboard/Dashboard";
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}