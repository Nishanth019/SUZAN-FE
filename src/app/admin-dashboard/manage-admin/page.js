'use client'
import React from "react";
import DefaultLayout from "@/components/Admin/Layouts/DefaultLayout";
import AdminAccsess from "@/components/Admin/Access/AdminAccsess";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ManageAdmin = () => {
  const router = useRouter();

  const { isAuth, user, setIsAuth, setUser } = useGlobalContext();
  
  if(!isAuth){
    router.push('/signin');
  }
  return (
    <DefaultLayout>
      <AdminAccsess />
    </DefaultLayout>
  );
};

export default ManageAdmin;
