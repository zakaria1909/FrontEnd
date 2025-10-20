interface UserProfile {
  nama: string;
  ringkasan: string;
  foto: string;
  email: string;
  alamat: string;
  no_telp: string;
}

export default function Template1({ user }: { user: UserProfile }) {
  return (
    <div>
      <h1>{user.nama}</h1>
      <p>{user.ringkasan}</p>
    </div>
  );
}
