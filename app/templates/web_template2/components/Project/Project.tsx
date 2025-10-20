"use client";
import { useEffect, useState } from "react";

export default function Project({user}: {user: any}) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://polibang.silverspace.my.id/api/cv/profiles/1/"
        );
        const data = await res.json();

        // Cari bagian yang nama_type = "Project"
        const projectSection = data.types.find(
          (t: any) => t.nama_type === "Project"
        );

        // Ambil konten dalam array contents
        if (projectSection && projectSection.contents?.length > 0) {
          const updatedContents = projectSection.contents.map((c: any) => {
            // Ganti src relatif menjadi full URL
            const updatedIsi = c.isi.replace(
              /src="\/media/g,
              'src="https://polibang.silverspace.my.id/media'
            );
            return { ...c, isi: updatedIsi };
          });
          setProjects(updatedContents);
        }
      } catch (err) {
        console.error("Gagal ambil data project:", err);
      }
    }

    load();
  }, []);

  return (
    <section
      id="project"
      className="relative py-16 px-8 bg-[#0f1e1b] text-white overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-gray-500/20 rounded-full"></div>
      <div className="absolute bottom-20 right-16 w-24 h-24 border border-gray-500/20 rotate-45"></div>
      <div className="absolute top-1/3 right-32 w-0 h-0 border-l-[35px] border-r-[35px] border-b-[60px] border-l-transparent border-r-transparent border-b-gray-500/20 rotate-12"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 border border-gray-500/20 rotate-[30deg]"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-[#ff8743] mb-12">My Project</h2>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          {projects.length > 0 ? (
            projects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg bg-[#8a8c80]/80 backdrop-blur-sm w-full max-w-md mx-auto"
              >
                <div
                  className="bg-[#d9d9d9] py-6 text-black font-semibold text-lg"
                >
                  View Project
                </div>
                <div className="p-5 text-left">
                  <h3 className="font-bold text-white mb-3">{p.judul}</h3>

                  {/* Render isi HTML dari API */}
                  <div
                    className="text-sm text-gray-300"
                    dangerouslySetInnerHTML={{ __html: p.isi }}
                  />
                </div>
              </div>
            ))
          ) : (
            // Default jika kosong
            [...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-lg bg-[#8a8c80]/80 backdrop-blur-sm w-full max-w-md mx-auto"
              >
                <div
                  className="bg-[#d9d9d9] py-6 text-black font-semibold text-lg"
                >
                  View Project
                </div>
                <div className="p-5 text-left">
                  <h3 className="font-bold text-white">Web E-commerce</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Menggunakan Laravel..........
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
