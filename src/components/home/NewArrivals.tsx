import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductCard from "../product/ProductCard";
import styles from "./NewArrivals.module.css";
import type { Product } from "../../types/product";

export default function NewArrivals() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?limit=12");
        setAllProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = showAll
    ? allProducts
    : allProducts.slice(0, 4);

  if (loading) {
    return (
      <section
        id="new-arrivals"
        className={styles.section}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>
            NEW ARRIVALS
          </h2>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="new-arrivals"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          NEW ARRIVALS
        </h2>

        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {allProducts.length > 4 && (
          <button
            className={styles.button}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>
    </section>
  );
}