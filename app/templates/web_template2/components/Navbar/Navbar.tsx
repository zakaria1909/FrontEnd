"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Profile {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  no_telp: string;
  ringkasan: string;
  foto: string;
  user: number;
}

export default function Navbar({ user }: { user: Record<string, any> }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("https://polibang.silverspace.my.id/api/cv/profiles/1/", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal memuat data profil");
        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Fetch profile gagal:", err);
      }
    }

    fetchProfile();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent">
      <nav className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        {/* Logo / Nama */}
        <div className="text-white font-semibold text-lg tracking-wide">
          {profile ? profile.nama : "Loading..."}
        </div>

        {/* Menu Navigasi */}
        <ul className="flex gap-8 text-sm text-white md:-translate-x-6 lg:-translate-x-46 transition-transform duration-300">
          <li>
            <a href="#about" className="hover:text-[#5CEF5C] transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#education" className="hover:text-[#5CEF5C] transition-colors">
              Education
            </a>
          </li>
          <li>
            <a href="#project" className="hover:text-[#5CEF5C] transition-colors">
              Project
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
