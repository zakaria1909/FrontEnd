/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

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

interface SocialMedia {
  id: number;
  platform_name: string;
  url: string;
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

interface Particle {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

function ExportPDFButton({ profileId }: { profileId: number }) {
  const handleExport = () => {
    if (!profileId) {
      alert("Profile ID tidak ditemukan. Silakan hubungi administrator.");
      console.error("Profile ID missing:", profileId);
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cv/export/pdf/?profile_id=${profileId}`;
    console.log("Export URL:", url);
    console.log("Profile ID:", profileId);
    window.open(url, "_blank");
  };

  return (
    <button onClick={handleExport} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow-lg transition-all hover:shadow-cyan-500/50 font-medium">
      Download Resume
    </button>
  );
}


export default function DynamicPortfolio({user}: {user: any}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    console.log("User dari props:", user);
  }, [user]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const [loadingParticles, setLoadingParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = (count: number): Particle[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
      }));
    };

    setLoadingParticles(generateParticles(20));
  }, []);

  function processHtmlContent(content: string) {
    if (!content) return "";

    let processedContent = content.replace(/&nbsp;/g, " ");
    processedContent = processedContent.replace(/src="(?!http|data:)([^"]*?)"/g, `src="${process.env.NEXT_PUBLIC_API_BASE_URL}$1"`);
    processedContent = processedContent.replace(/href="(?!http|mailto:|tel:)([^"]*?)"/g, `href="${process.env.NEXT_PUBLIC_API_BASE_URL}$1"`);
    processedContent = processedContent.replace(/<a\s+(?![^>]*target=)([^>]*href="http[^"]*"[^>]*)>/gi, '<a $1 target="_blank" rel="noopener noreferrer">');

    return processedContent;
  }

  useEffect(() => {
  async function fetchProfile() {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subdomain-home/`;
      console.log("Fetching from:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      });

      console.log("Response status:", res.status);

      if (!res.ok) throw new Error("Gagal mengambil data profil");

      const data = await res.json();
      console.log("Data received:", data);
      console.log("Social medias in API:", data[0]?.social_medias);

      if (Array.isArray(data)) {
        const subdomain = window.location.hostname.split(".")[0].toLowerCase();
        console.log("Current subdomain:", subdomain);

        const matchedProfile =
          data.find(
            (p) => p.nama?.toLowerCase().includes(subdomain)
          ) || data[0];

        console.log("Matched profile:", matchedProfile);
        setProfile(matchedProfile);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsVisible(true);
      }, 2000);
    }
  }

  fetchProfile();
}, []);

useEffect(() => {
  if (profile) {
    console.log("Profile updated in state:", profile);
    console.log("Social medias from state:", profile.social_medias);
  }
}, [profile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {loadingParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
        </div>
        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="w-16 h-16 border-4 border-blue-400 border-b-transparent rounded-full animate-spin mx-auto absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
            <div className="w-12 h-12 border-4 border-sky-300 border-l-transparent rounded-full animate-spin mx-auto absolute top-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-cyan-300 animate-pulse-glow">Loading Portfolio</h2>
            <div className="flex space-x-2 justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-sky-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-blue-200 animate-fade-in-slow">Preparing something amazing for you...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-sky-800 to-cyan-900 flex items-center justify-center">
        <div className="text-center space-y-6 animate-shake">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-400 font-medium text-xl">Profile not found</p>
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors animate-bounce-gentle">Try Again</button>
        </div>
      </div>
    );
  }

const p = profile;
const t = profile?.types || [];
const sm = profile?.social_medias || [];

console.log("🔍 Profile:", p);
console.log("🔍 Social Medias:", sm);
console.log("🔍 SM Length:", sm.length);


  return (
    <>
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      >
        <div className="w-full h-full bg-cyan-300 rounded-full animate-pulse"></div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
        <section className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/bg-mountain.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90"></div>

          <div className="relative z-20 flex items-center gap-3 pl-20 py-6">
            <img src="/logo-resumifly.png" alt="logo" className="w-[40px] h-[40px]" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Resumify</h2>
          </div>

          <div className="relative z-10 flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
              <div className={`space-y-8 text-white ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Hello, I&apos;m <br />
                  <span className="text-cyan-400">{p.nama}</span>
                </h1>

                <p className="text-lg text-gray-300 max-w-xl leading-relaxed font-light">{p.ringkasan}</p>

                <div className="flex gap-4 pt-4">
                  <ExportPDFButton profileId={p.id} />
                </div>
              </div>

              <div className={`flex justify-center lg:justify-end ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
                <div className="relative group">
                  <div className="absolute -inset-6"></div>
                  <div className="relative w-80 h-96 overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
                    <img src={p.foto?.startsWith("http") ? p.foto : `https://polibang.silverspace.my.id${p.foto}`} alt={p.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1a1d29] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255 255 255) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            {t?.map((type) => (
              <div key={type.id} className="mb-24 last:mb-0" data-section={type.nama_type.toLowerCase().replace(/\s+/g, "-")}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                    <span className="text-gray-400">My </span>
                    <span className="text-white">{type.nama_type}</span>
                    <span className="text-cyan-400">.</span>
                  </h2>
                  <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {type.contents?.map((content, contentIndex) => (
                    <div key={content.id} className="group relative bg-[#23273a] rounded-xl p-8 border-2 border-transparent hover:border-cyan-400 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                                <span className="text-cyan-400 font-bold text-sm">{contentIndex + 1}</span>
                              </div>
                              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{content.judul}</h3>
                          </div>
                        </div>

                        <div
                          className="prose prose-invert max-w-none text-gray-400 leading-relaxed [&_p]:mb-4 [&_p]:text-gray-400 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-gray-400 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:text-gray-400 [&_strong]:text-gray-300 [&_strong]:font-semibold [&_a]:text-cyan-400 [&_a]:no-underline hover:[&_a]:underline"
                          dangerouslySetInnerHTML={{
                            __html: processHtmlContent(content.isi),
                          }}
                        />

                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/20 group-hover:border-cyan-400/50 rounded-br-xl transition-colors"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
  <footer className="bg-[#12151E] text-gray-300 py-12 border-t border-gray-700">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Tentang Saya</h3>
        <p className="text-sm leading-relaxed text-gray-400">
          {p?.ringkasan || "Belum ada deskripsi"}
        </p>
      </div>

      <div className="ml-0 md:ml-20">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 pr-4">Kontak</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-3">
            <img src="/email-icon.png" alt="Email" className="w-5 h-5" />
            <a
              href={`mailto:${p?.email || ""}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {p?.email || "Email tidak tersedia"}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <img src="/location-icon.png" alt="Lokasi" className="w-5 h-5" />
            {p?.alamat || "Alamat belum diatur"}
          </li>
          <li className="flex items-center gap-3">
            <img src="/phone-icon.png" alt="Telepon" className="w-5 h-5" />
            <a
              href={`tel:${p?.no_telp || ""}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {p?.no_telp || "Nomor belum diatur"}
            </a>
          </li>
        </ul>

        <div className="mt-6">
  <h4 className="text-sm font-semibold text-gray-400 mb-3">Follow Me</h4>

  <div className="flex gap-4 flex-wrap">
    {(() => {
      console.log("🎨 Rendering social medias...");
      console.log("  sm value:", sm);
      console.log("  sm exists:", !!sm);
      console.log("  sm is array:", Array.isArray(sm));
      console.log("  sm length:", sm?.length);
      
      if (!sm) {
        console.warn("⚠ sm is null/undefined");
        return <p className="text-yellow-500 text-sm">Social media data is null</p>;
      }
      
      if (!Array.isArray(sm)) {
        console.warn("⚠ sm is not an array, type:", typeof sm);
        return <p className="text-yellow-500 text-sm">Social media is not array</p>;
      }
      
      if (sm.length === 0) {
        console.warn("⚠ sm array is empty");
        return <p className="text-gray-500 text-sm">Belum ada media sosial</p>;
      }
      
      console.log("✅ Rendering", sm.length, "social media items");
      
      return sm.map((social, index) => {
  console.log(`  [${index}] Rendering:`, social.platform_name, social.url);

  if (!social || !social.id) {
    console.warn(`  [${index}] ⚠ Invalid social object:`, social);
    return null;
  }

  if (!social.url || social.url.trim() === "") {
    console.warn(`  [${index}] ⚠ Empty URL for:`, social.platform_name);
    return null;
  }

  const platform = (social.platform_name || "").toLowerCase().trim();
  let iconPath = "";
  let bgColor = "hover:bg-cyan-600";

  if (platform.includes("instagram") || platform.includes("ig")) {
    bgColor = "hover:bg-pink-600";
    iconPath = "/icons/instagram.svg";
  } else if (platform.includes("github")) {
    bgColor = "hover:bg-gray-700";
    iconPath = "/icons/github.svg";
  } else if (platform.includes("linkedin")) {
    bgColor = "hover:bg-blue-700";
    iconPath = "/icons/linkedin.svg";
  } else if (platform.includes("youtube") || platform.includes("yt")) {
    bgColor = "hover:bg-red-600";
    iconPath = "/icons/youtube.svg";
  } else if (platform.includes("facebook") || platform.includes("fb")) {
    bgColor = "hover:bg-blue-600";
    iconPath = "/icons/facebook.svg";
  } else if (platform.includes("twitter") || platform.includes("x")) {
    bgColor = "hover:bg-black";
    iconPath = "/icons/twitter.svg";
  } else if (platform.includes("tiktok")) {
    bgColor = "hover:bg-black";
    iconPath = "/icons/tiktok.svg";
  } else if (platform.includes("whatsapp") || platform.includes("wa")) {
    bgColor = "hover:bg-green-600";
    iconPath = "/icons/whatsapp.svg";
  } else {
    iconPath = "/icons/link.svg";
  }

  const url = social.url.startsWith("http")
    ? social.url
    : `https://${social.url}`;

  console.log(`  [${index}] ✅ Rendering link:`, url);

  return (
    <a
      key={social.id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:text-white transition-all duration-300 ${bgColor} hover:scale-110`}
      title={social.platform_name}
    >
      <img
        src={iconPath}
        alt={social.platform_name}
        className="w-5 h-5"
      />
    </a>
  );
});

    })()}
  </div>
</div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
  ©{new Date().getFullYear()}{" "}
  <span className="text-white font-semibold">{p?.nama}</span>. All rights reserved.
</div>

  </footer>
</section>

      </div>
    </>
  );
}