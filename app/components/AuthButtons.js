"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthButtons() {
  const { user, loading, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    if (typeof window !== "undefined") localStorage.clear();
    if (setUser) setUser(null);
    setOpen(false);
    window.location.href = "/auth/login";
  };

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded text-sm sm:text-base transition-colors duration-200"
        >
          {user.firstName} {user.lastName}
        </button>
        {open && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-[10002]">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              داشبورد
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-right px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
      <Link
        href="/auth/register"
        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-3 rounded text-sm sm:text-base text-center transition-colors duration-200"
      >
        ثبت نام
      </Link>
      <Link
        href="/auth/login"
        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-3 rounded text-sm sm:text-base text-center transition-colors duration-200"
      >
        ورود
      </Link>
    </div>
  );
} 