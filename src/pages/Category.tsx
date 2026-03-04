import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import ProductCard from "../components/product/ProductCard";
import type { Product } from "../types/product";
import styles from "./Category.module.css";

export default function Category() {
  const { slug } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await api.get(
          `/products/category/${slug}`
        );

        setProducts(res.data.products);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    filtered = filtered.filter(
      (product) => product.price <= maxPrice
    );


    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [products, maxPrice, sortOption]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <aside className={styles.sidebar}>
          <h3>Filters</h3>

          <div className={styles.filterGroup}>
            <p>Max Price: ${maxPrice}</p>
            <input
              type="range"
              min="0"
              max="2000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
            />
          </div>

          <div className={styles.filterGroup}>
            <p>Sort By</p>
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
            >
              <option value="default">
                Default
              </option>
              <option value="price-asc">
                Price Low → High
              </option>
              <option value="price-desc">
                Price High → Low
              </option>
              <option value="rating">
                Rating
              </option>
              <option value="name">
                Name A → Z
              </option>
            </select>
          </div>
        </aside>

        <div className={styles.products}>
          <h2 className={styles.title}>
            {slug}
          </h2>

          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}