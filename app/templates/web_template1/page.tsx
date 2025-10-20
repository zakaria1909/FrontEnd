export default function Template1({ user }: { user: any }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.ringkasan}</p>
    </div>
  );
}