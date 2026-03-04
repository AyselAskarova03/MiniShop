import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const totalCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${query.trim()}`);
    setQuery("");
  };

  const handleNewArrivalsClick = () => {
    navigate("/#new-arrivals");
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.left}>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className={styles.logo}>
            SHOP.CO
          </Link>

          <nav
            className={`${styles.nav} ${
              menuOpen ? styles.activeNav : ""
            }`}
          >
            <NavLink
              to="/category/mens-shirts"
              className={({ isActive }) =>
                isActive ? styles.activeLink : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </NavLink>

            <NavLink
              to="/sale"
              className={({ isActive }) =>
                isActive ? styles.activeLink : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              On Sale
            </NavLink>

            <button
              onClick={handleNewArrivalsClick}
              className={styles.navButton}
            >
              New Arrivals
            </button>

            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive ? styles.activeLink : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              Brands
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <form
            className={styles.searchBox}
            onSubmit={handleSearch}
          >
            <FiSearch />
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </form>

          <div className={styles.icons}>
            <NavLink
              to="/wishlist"
              className={styles.iconWrapper}
            >
              <AiOutlineHeart />
              {wishlistItems.length > 0 && (
                <span className={styles.badge}>
                  {wishlistItems.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.iconWrapper}
            >
              <AiOutlineShoppingCart />
              {totalCount > 0 && (
                <span className={styles.badge}>
                  {totalCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/admin"
              className={styles.iconWrapper}
            >
              <AiOutlineUser />
            </NavLink>
          </div>
        </div>

      </div>
    </header>
  );
}