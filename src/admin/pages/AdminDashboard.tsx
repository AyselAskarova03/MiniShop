export default function AdminDashboard() {
  const products =
    JSON.parse(localStorage.getItem("adminProducts") || "[]");

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Total Products: {products.length}</p>
    </div>
  );
}