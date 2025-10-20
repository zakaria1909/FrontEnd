"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Triangle, Circle } from "lucide-react";

// ----- Struktur sesuai API -----
interface SocialMedia {
  id: number;
  platform_name: string;
  url: string;
}

interface Content {
  id: number;
  judul: string;
  isi: string;
  type: number;
}

interface Type {
  id: number;
  nama_type: string;
  contents: Content[];
  profile: number;
}

interface Profile {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  no_telp: string;
  ringkasan: string;
  foto: string;
  user: number;
  types: Type[];
  social_medias: SocialMedia[];
}

// ----- KOMPONEN HERO -----
export default function Hero({user}: {user: any}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Pastikan ID sesuai data kamu (di API ID = 5)
        const res = await fetch(
          `https://polibang.silverspace.my.id/api/cv/profiles/1/`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Gagal memuat data profil");

        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center h-[80vh] bg-[#0f1e1b] text-white">
        <p>Loading data...</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="flex justify-center items-center h-[80vh] bg-[#0f1e1b] text-white">
        <p>Data profil tidak ditemukan.</p>
      </section>
    );
  }

  // Pastikan URL foto valid
  const photoSrc =
    profile.foto && profile.foto.startsWith("http")
      ? profile.foto
      : "/profile.jpg";

  return (
    <section className="relative bg-[#0f1e1b] text-white overflow-hidden pt-32 pb-24 sm:pt-36 sm:pb-28">
      {/* Dekorasi garis kiri */}
      <div className="absolute left-4 top-16 bottom-16 flex flex-col items-center z-0">
        <div className="w-2 h-2 bg-[#1bed73] rounded-full mb-2" />
        <div className="w-[2px] bg-[#1bed73] flex-1" />
        <div className="w-2 h-2 bg-[#1bed73] rounded-full mt-2" />
      </div>

      {/* Dekorasi shape */}
      <div className="absolute inset-0 z-0">
        <Star className="absolute text-[#4F4F4F] opacity-20 w-12 h-12 top-[18%] left-[15%] rotate-12" />
        <Star className="absolute text-[#4F4F4F] opacity-20 w-8 h-8 top-[72%] left-[60%] -rotate-12" />
        <Triangle className="absolute text-[#4F4F4F] opacity-20 w-10 h-10 top-[35%] left-[78%] rotate-45" />
        <Triangle className="absolute text-[#4F4F4F] opacity-20 w-12 h-12 top-[12%] left-[42%] -rotate-12" />
        <Circle className="absolute text-[#4F4F4F] opacity-20 w-8 h-8 top-[55%] left-[25%]" />
        <Circle className="absolute text-[#4F4F4F] opacity-20 w-12 h-12 top-[85%] left-[70%]" />
      </div>

      {/* Konten utama */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 z-10">
        {/* LEFT TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-[Poppins]">
            {profile.nama}
          </h1>
          <h3 className="text-[#ff8743] font-[Roboto Slab] font-semibold text-base sm:text-lg mb-4">
            Welcome to everyone
          </h3>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
            {profile.ringkasan}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-[#36e17d] hover:bg-[#2fd173] text-black px-5 py-2 rounded-full font-medium transition-all">
              Download CV
            </button>
            <button className="border border-[#36e17d] text-[#36e17d] px-5 py-2 rounded-full font-medium hover:bg-[#36e17d]/10 transition-all">
              Contact Me
            </button>
          </div>
        </div>

        {/* RIGHT PHOTO */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
          <div className="hero-band">
            <div className="hero-photo rotate-[43deg] -translate-y-2.5">
              <Image
                src={photoSrc}
                alt={profile.nama}
                width={260}
                height={260}
                className="object-cover rounded-full"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
