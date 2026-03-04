import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>ADMIN</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/add-product">Add Product</NavLink>
      </nav>
    </div>
  );
}