"use client";

import { usePathname } from "next/navigation";
import Footer  from "../Footer/Footer";
import   Navbar  from "../Navbar/Navbar";
import   NavbarTemp  from "../Navbar/NavbarTemp";
import  Toaster  from "react-hot-toast";

const ClientProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname &&
      (pathname.includes("signin") ||
        pathname.includes("signup") ||
        pathname.includes("admin") ||
        pathname.includes("student") ||
        pathname.includes("forgot-password") ||
        pathname.includes("reset-password")) ? <NavbarTemp/> : (
        <Navbar />
      )}
      {children}
      <Toaster />
      {pathname &&
      (pathname.includes("signin") ||
        pathname.includes("signup") ||
        pathname.includes("admin") ||
        pathname.includes("student") ||
        pathname.includes("forgot-password") ||
        pathname.includes("reset-password")) ? null : (
        <Footer />
      )}
    </>
  );
};

export default ClientProvider;