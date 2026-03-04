import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductCard from "../product/ProductCard";
import styles from "./TopSelling.module.css";
import type { Product } from "../../types/product";

export default function TopSelling() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?limit=20");
        setAllProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = showAll
    ? allProducts.slice(0, 12)
    : allProducts.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>TOP SELLING</h2>

        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() =>
              setShowAll(!showAll)
            }
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      </div>
    </section>
  );
}