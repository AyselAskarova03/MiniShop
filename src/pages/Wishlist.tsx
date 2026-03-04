import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { removeFromWishlist } from "../store/wishlistSlice";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const dispatch = useDispatch();

  const items = useSelector(
    (state: RootState) => state.wishlist.items
  );

  return (
    <div className={styles.container}>
      <h1>My Wishlist</h1>

      {items.length === 0 && (
        <p className={styles.empty}>
          Your wishlist is empty
        </p>
      )}

      <div className={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.card}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.image}
            />

            <h3>{item.title}</h3>
            <p className={styles.price}>
              ${item.price}
            </p>

            <button
              className={styles.removeBtn}
              onClick={() =>
                dispatch(
                  removeFromWishlist(item.id)
                )
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}