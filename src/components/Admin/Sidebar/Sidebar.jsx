"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import logo from "../../../assets/Navbar/logo.png";
import { MdBarChart, MdFeedback, MdOutlineMenu } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { MdDashboard, MdBook, MdGroup, MdEvent, MdPlace } from "react-icons/md";
import UserService from "@/services/user.service"; // Import UserService to fetch user data

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [userRole, setUserRole] = useState(""); // Add state for user role

  // Fetch user role
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await UserService.getCurrentUser();
        setUserRole(response.data?.user?.role); // Store user role
        console.log(9,response.data.user.role);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarExpanded || sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarExpanded(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close sidebar on "Escape" key press
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (!sidebarExpanded || key !== "Escape") return;
      setSidebarExpanded(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-16 px-6 lg:px-16 xl:px-20">
        <Link href="/" className="">
          <Image className="w-[140px] h-auto mt-[-20px] mb-[-20px]" src={logo} alt="Logo" priority />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
          <FaArrowLeft size={25} />
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-2 px-4 py-4 lg:mt-2 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8A99AF]">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Dashboard */}
              <li>
                <Link
                  href="/admin-dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname === "/admin-dashboard" && "bg-[#333A48]"
                  }`}
                >
                  <MdDashboard size={18} />
                  Dashboard
                </Link>
              </li>
              {/* Courses */}
              <li>
                <Link
                  href="/admin-dashboard/courses"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("courses") && "bg-[#333A48]"
                  }`}
                >
                  <MdBook size={18} />
                  Courses
                </Link>
              </li>
              {/* Clubs */}
              <li>
                <Link
                  href="/admin-dashboard/clubs"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("clubs") && "bg-[#333A48]"
                  }`}
                >
                  <MdGroup size={18} />
                  Clubs
                </Link>
              </li>
              {/* Events */}
              <li>
                <Link
                  href="/admin-dashboard/events"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("events") && "bg-[#333A48]"
                  }`}
                >
                  <MdEvent size={18} />
                  Events
                </Link>
              </li>
              {/* Nearby Places */}
              <li>
                <Link
                  href="/admin-dashboard/nearby-places"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("nearby-places") && "bg-[#333A48]"
                  }`}
                >
                  <MdPlace size={18} />
                  Nearby Places
                </Link>
              </li>
              {/* Feedbacks */}
              <li>
                <Link
                  href="/admin-dashboard/feedback"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("feedback") && "bg-[#333A48]"
                  }`}
                >
                  <MdFeedback size={18} />
                  Feedbacks
                </Link>
              </li>
            </ul>
          </div>
          <div>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8A99AF]">
              OTHERS
            </h3>
          <ul className="mb-6 flex flex-col gap-1.5">
            {/* Manage Admin (Visible only for mainadmin role) */}
            {userRole === "mainadmin" && (
                <li>
                  <Link
                    href="/admin-dashboard/manage-admin"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                      pathname.includes("manage-admin") && "bg-[#333A48]"
                    }`}
                  >
                    Manage Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
};

export default Sidebar;
