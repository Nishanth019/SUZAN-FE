"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import NavbarTemp from "../Navbar/NavbarTemp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientProvider = ({ children }) => {
  const pathname = usePathname();
  console.log(2, pathname);
  return (
    <>
      {pathname && !pathname.includes("admin") ? (
        (pathname.includes("signin") ||
          pathname.includes("signup") ||
          pathname.includes("student") ||
          pathname.includes("forgot-password") ||
          pathname.includes("reset-password")) ? (
          <NavbarTemp />
        ) : (
          <Navbar />
        )
      ) : null}

      {children}
      <ToastContainer />
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
