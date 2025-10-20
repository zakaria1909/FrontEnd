"use client";
import { useEffect, useState } from "react";
import { Calendar, Star, Triangle } from "lucide-react";

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
}

interface Profile {
  id: number;
  nama: string;
  email: string;
  alamat: string;
  no_telp: string;
  ringkasan: string;
  foto: string;
  types: Type[];
}

export default function Education({user}: {user: any}) {
  const [educationData, setEducationData] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const res = await fetch(
          "https://polibang.silverspace.my.id/api/cv/profiles/1/",
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Gagal mengambil data profil");

        const data: Profile = await res.json();

        // Cari type dengan nama "Education" atau sejenis
        const eduType = data.types.find(
          (t) =>
            t.nama_type.toLowerCase().includes("education") ||
            t.nama_type.toLowerCase().includes("pendidikan")
        );

        if (eduType && eduType.contents.length > 0) {
          setEducationData(eduType.contents);
        } else {
          setEducationData([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setEducationData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  const fallback = [
    { judul: "Teknik Informatika", isi: "2017–2019", type: 0 },
    { judul: "Teknik Informatika", isi: "2019–2023", type: 0 },
  ];

  const data = educationData.length > 0 ? educationData : fallback;

  const stripHTML = (html: string) => html.replace(/<[^>]+>/g, "");

  return (
    <section
      id="education"
      className="relative py-20 px-6 bg-[#0f1e1b] overflow-hidden"
    >
      {/* Dekorasi background */}
      <Star
        className="absolute top-24 right-[15%] text-[#36e17d] opacity-20"
        size={48}
      />
      <Triangle
        className="absolute bottom-20 right-[10%] text-[#36e17d] opacity-20"
        size={56}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Judul */}
        <h2 className="text-[#ff8743] text-3xl sm:text-4xl font-bold mb-12 tracking-wide text-center font-[Poppins]">
          My Education
        </h2>

        <div className="relative">
          {/* Garis vertikal hijau */}
          <div className="absolute left-[1.5rem] top-[60px] bottom-[60px] w-[2px] bg-[#36e17d]" />

          {loading ? (
            <p className="text-gray-300 text-center mt-10">
              Memuat data pendidikan...
            </p>
          ) : (
            <div className="space-y-12">
              {data.map((edu, i) => (
                <div key={i} className="relative flex items-start gap-6">
                  {/* Nomor dalam lingkaran */}
                  <div className="relative left-2 top-[50px] flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-[#2c3b37] text-white rounded-lg px-6 py-4 w-full shadow-md">
                    {/* Tahun */}
                    <div className="inline-flex items-center gap-2 bg-[#1e2a27] text-gray-300 text-sm px-3 py-1 rounded-md mb-3">
                      <Calendar size={14} className="text-orange-400" />
                      <span>{stripHTML(edu.isi)}</span>
                    </div>

                    {/* Sekolah */}
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {edu.judul}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
