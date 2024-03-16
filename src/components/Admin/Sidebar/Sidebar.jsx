"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import logo from "../../../assets/Navbar/logo.png";
import { MdOutlineMenu } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { MdDashboard, MdBook, MdGroup, MdEvent, MdPlace } from "react-icons/md";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    let storedSidebarExpanded = "true";

    const [sidebarExpanded, setSidebarExpanded] = useState(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );
      const pathname = usePathname();
    
      const trigger = useRef(null);
      const sidebar = useRef(null);
    
      // close on click outside
      useEffect(() => {
        const clickHandler = ({ target }) => {
          if (!sidebar.current || !trigger.current) return;
          if (
            !sidebarExpanded ||
            sidebar.current.contains(target) ||
            trigger.current.contains(target)
          )
            return;
          setSidebarExpanded(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
      });
    
      // close if the esc key is pressed
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
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-16 px-6 lg:px-16 xl:px-20">
        <Link href="/" className="">
          <Image
            className="w-[140px] h-auto mt-[-20px] mb-[-20px]"
            src={logo}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
        >
         <FaArrowLeft  size={25} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2 px-4 py-4 lg:mt-2 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8A99AF]">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* admin dashboard */}
            <li>
  <Link
    href="/admin"
    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
      pathname === "/admin" &&
      "bg-[#333A48] "
    }`}
  >
    <MdDashboard size={18} /> {/* Replace SVG with MdDashboard icon */}
    Dashboard
  </Link>
</li>
{/* Courses */}
<li>
  <Link
    href="/admin/courses"
    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
      pathname.includes("courses") &&
      "bg-[#333A48] "
    }`}
  >
    <MdBook size={18} /> {/* Replace SVG with MdBook icon */}
    Courses
  </Link>
</li>
{/* Clubs */}
<li>
  <Link
    href="/admin/clubs"
    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
      pathname.includes("clubs") && "bg-[#333A48] "
    }`}
  >
    <MdGroup size={18} /> {/* Replace SVG with MdGroup icon */}
    Clubs
  </Link>
</li>
{/* Events */}
<li>
  <Link
    href="/admin/events"
    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
      pathname.includes("events") && "bg-[#333A48] "
    }`}
  >
    <MdEvent size={18} /> {/* Replace SVG with MdEvent icon */}
    Events
  </Link>
</li>
{/* Nearby Places */}
<li>
  <Link
    href="/admin/nearby-places"
    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
      pathname.includes("nearby-places") && "bg-[#333A48] "
    }`}
  >
    <MdPlace size={18} /> {/* Replace SVG with MdPlace icon */}
    Nearby Places
  </Link>
</li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8A99AF]">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <Link
                  href="/admin/students-list"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("students-list") && "bg-[#333A48] "
                  }`}
                >
                  Students List
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/admin-requests"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48] ${
                    pathname.includes("admin-requests") && "bg-[#333A48] "
                  }`}
                >
                  Admin Requests
                </Link>
              </li>

              <SidebarLinkGroup
                activeCondition={pathname === "/ui" || pathname.includes("ui")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#DEE4EE] duration-300 ease-in-out hover:bg-[#333A48]  ${
                          (pathname === "/ui" || pathname.includes("ui")) &&
                          "bg-[#333A48] "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Chats
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/ui/alerts"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-[#8A99AF] duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/alerts" && "text-white"
                              }`}
                            >
                              Student Chats
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/buttons"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-[#8A99AF] duration-300 ease-in-out hover:text-white ${
                                pathname === "/ui/buttons" && "text-white"
                              }`}
                            >
                              Admin Chats
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;