"use client";
import { useEffect, useState } from "react";

export default function Footer({user}: {user: any}) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(
          "https://polibang.silverspace.my.id/api/cv/profiles/1/"
        );
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Gagal ambil profile:", err);
      }
    }

    loadProfile();
  }, []);

  if (!profile) return null; // loading sementara

  const socialIcons: Record<string, string> = {
    instagram: "/instagram.png",
    youtube: "/youtube.png",
    facebook: "/facebook.png",
    linkedin: "/linkedin.png",
    github: "/github.png",
    tiktok: "/tiktok.png",
    wa: "/whatsapp.png",
  };

  return (
    <footer className="bg-[#1B2A26] text-gray-300 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* === Tentang === */}
        <div>
          <h4 className="font-semibold text-[#ff8743] border-b-2 border-[#ff8743] inline-block pb-1 mb-4">
            About
          </h4>
          <p className="text-sm leading-relaxed">{profile.ringkasan}</p>
        </div>

        {/* === Kontak & Sosial === */}
        <div className="flex flex-col items-start ml-0 md:ml-16 lg:ml-40 transition-all duration-300">
          <h4 className="font-semibold text-[#ff8743] border-b-2 border-[#ff8743] inline-block pb-1 mb-4">
            Contact
          </h4>

          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <img src="/email.png" alt="Email" className="w-4 h-4" />
              <span>{profile.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <img src="/icons/location.png" alt="Location" className="w-4 h-4" />
              <span>{profile.alamat}</span>
            </li>
            <li className="flex items-center gap-2">
              <img src="/icons/phone.png" alt="Phone" className="w-4 h-4" />
              <span>{profile.no_telp}</span>
            </li>
          </ul>

          {/* Ikon Sosial */}
          <div className="flex items-center justify-start gap-4 mt-6">
            {profile.social_medias?.map((s: any) => {
              const icon = socialIcons[s.platform_name.toLowerCase()];
              if (!icon) return null;
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform_name}
                >
                  <img
                    src={icon}
                    alt={s.platform_name}
                    className="w-6 h-6 hover:opacity-80 hover:scale-110 transition-transform duration-200"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Garis pemisah bawah */}
      <div className="border-t border-gray-500/30 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">{profile.nama}</span>.{" "}
        <span className="text-gray-400">All rights reserved.</span>
      </div>
    </footer>
  );
}
