import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";
import { FaStar } from "react-icons/fa";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const {
    id,
    title,
    price,
    discountPercentage,
    rating,
    thumbnail,
  } = product;

  const hasDiscount = discountPercentage > 0;

  const discountedPrice = hasDiscount
    ? Math.round(price - (price * discountPercentage) / 100)
    : price;

  const stars = Math.round(rating);

  return (
    <Link to={`/product/${id}`} className={styles.card}>
      {hasDiscount && (
        <span className={styles.discountBadge}>
          -{Math.round(discountPercentage)}%
        </span>
      )}

      <div className={styles.imageBox}>
        <img
          src={thumbnail}
          alt={title}
          className={styles.image}
        />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            className={
              n <= stars
                ? styles.starActive
                : styles.star
            }
          />
        ))}
        <span>{rating}</span>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>
          ${discountedPrice}
        </span>

        {hasDiscount && (
          <span className={styles.oldPrice}>
            ${price}
          </span>
        )}
      </div>
    </Link>
  );
}