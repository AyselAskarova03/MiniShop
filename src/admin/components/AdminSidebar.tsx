import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>ADMIN</h2>

      <nav className={styles.nav}>
        <NavLink to="/admin" className={styles.link}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={styles.link}>
          Products
        </NavLink>

        <NavLink to="/admin/add-product" className={styles.link}>
          Add Product
        </NavLink>
      </nav>
    </div>
  );
}