"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Content {
  id: number;
  judul: string;
  isi: string;
}

interface Type {
  id: number;
  nama_type: string;
  contents: Content[];
}

interface Profile {
  id: number;
  types: Type[];
}

export default function ExperienceCarousel({ user }: { user: Record<string, any> }) {
  const [slides, setSlides] = useState<Content[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchExperience() {
      try {
        // 🔹 ganti ID sesuai profil aktif
        const res = await fetch(
          "https://polibang.silverspace.my.id/api/cv/profiles/1/",
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Gagal memuat data pengalaman");

        const data: Profile = await res.json();

        // 🔹 cari type dengan nama 'pengalaman'
        const pengalamanType = data.types.find(
          (t) =>
            t.nama_type.toLowerCase() === "pengalaman" ||
            t.nama_type.toLowerCase().includes("pengalaman")
        );

        if (pengalamanType) {
          setSlides(pengalamanType.contents);
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    }

    fetchExperience();
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Jika belum ada data
  if (!slides.length) {
    return (
      <section className="bg-[#0f1e1b] min-h-screen flex flex-col justify-center items-center text-white">
        <h2 className="text-[#ff8743] text-3xl sm:text-4xl font-semibold mb-6">
          My Experience
        </h2>
        <p>Belum ada data pengalaman ditemukan.</p>
      </section>
    );
  }

  return (
    <section className="relative bg-[#0f1e1b] min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-visible">
      {/* 🔸 Judul Section */}
      <h2 className="text-[#ff8743] text-3xl sm:text-4xl font-semibold mb-12 tracking-wide z-20">
        My Experience
      </h2>

      <div className="relative w-full max-w-4xl flex items-center justify-center">
        {slides.map((slide, index) => {
          const offset = (index - current + slides.length) % slides.length;

          let scale = 1;
          let zIndex = 10;
          let opacity = 1;
          let translateX = 0;
          let bgColor = "#3d3d3d";

          if (offset === 1) {
            scale = 0.9;
            zIndex = 5;
            translateX = 180;
            bgColor = "#929292";
          } else if (offset === slides.length - 1) {
            scale = 0.9;
            zIndex = 5;
            translateX = -180;
            bgColor = "#929292";
          } else if (offset !== 0) {
            opacity = 0;
          }

          // 🔹 Ambil tahun dari isi HTML
          const yearMatch = slide.isi.match(/\d{4}[-–]\d{4}/);
          const year = yearMatch ? yearMatch[0] : "–";

          // 🔹 Bersihkan tag HTML biar deskripsi rapi
          const cleanDesc = slide.isi.replace(/<[^>]+>/g, "");

          return (
            <motion.div
              key={index}
              animate={{ scale, opacity, x: translateX, zIndex }}
              transition={{ duration: 0.5 }}
              className="absolute transition-all duration-500 ease-in-out rounded-xl shadow-lg text-white w-[92%] sm:w-[80%] md:w-[70%] max-w-[600px] h-auto sm:h-[240px] p-6 sm:p-8"
              style={{ backgroundColor: bgColor }}
            >
              {/* Kalender + Tahun di pojok kiri atas */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-gray-500/30 px-3 py-1 rounded-full text-[12px] sm:text-sm text-gray-200">
                <Calendar size={14} />
                <span>{year}</span>
              </div>

              {/* Konten teks */}
              <div className="flex flex-col h-full justify-between pt-6 sm:pt-8">
                <div>
                  <h3 className="font-semibold text-[14px] sm:text-lg mb-2">
                    {slide.judul}
                  </h3>
                  <p className="text-gray-200 text-[12px] sm:text-sm leading-relaxed">
                    {cleanDesc}
                  </p>
                </div>

                {offset === 0 && (
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={prevSlide}
                      className="bg-[#36e17d] hover:bg-[#2fd173] text-black p-2 rounded-full transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="bg-[#36e17d] hover:bg-[#2fd173] text-black p-2 rounded-full transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* 🔽 Indikator di bawah card */}
        <div className="relative flex justify-center gap-2 mt-70 z-20">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-[4px] rounded-full cursor-pointer transition-all ${
                i === current ? "bg-[#36e17d]" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
