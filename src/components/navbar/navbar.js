"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Logo from "../../../public/large_logo.svg";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + "/api/categories?populate=*");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`w-full bg-black text-white py-4 px-6 shadow-md ${
          isMobile ? "relative" : "fixed top-0 left-0 z-50"
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <a href="/#" className="w-40 md:w-48 h-auto">
            <Image
              src={Logo}
              alt="GC Group Logo"
              width={240}
              height={120}
              className="object-contain"
              priority
            />
          </a>

          {/* Navigation Links */}
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 lg:space-x-12 uppercase font-semibold text-lg">
            <li>
              <a href="/#" className="hover:text-gray-300 transition">
                Home
              </a>
            </li>

            {/* Services Dropdown (Click-to-Toggle) */}
            <li className="relative" ref={dropdownRef}>
              <button
                className="hover:text-gray-300 transition flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                SERVICES
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <ul
                  className={`absolute left-0 w-56 bg-black bg-opacity-90 text-white rounded-md shadow-lg mt-2 z-20 ${
                    isMobile ? "relative w-full" : ""
                  }`}
                >
                  {categories.length > 0 ? (
                    categories.map((element, index) => (
                      <li
                        key={index}
                        className="border-b border-gray-600 last:border-0"
                      >
                        <a
                          href={"/category/" + element.documentId}
                          className="block px-6 py-3 hover:bg-red-600 transition"
                        >
                          {element.title}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="px-6 py-3 text-gray-400">Loading...</li>
                  )}
                </ul>
              )}
            </li>

            <li>
              <a href="/about#" className="hover:text-gray-300 transition">
                About
              </a>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={logout}
                  className="hover:text-gray-300 transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <a href="/login" className="hover:text-gray-300 transition">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/signup" className="hover:text-gray-300 transition">
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Add padding so content isn't hidden behind navbar */}
      <div className={`${isMobile ? "pt-4" : "pt-20"}`}></div>
    </>
  );
}
