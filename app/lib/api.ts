// src/lib/api.ts
export async function getUserProfile(id: string) {
  const res = await fetch(`https://polibang.silverspace.my.id/api/cv/profiles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}
