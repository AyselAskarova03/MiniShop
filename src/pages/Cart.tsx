import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import {
  removeFromCart,
  updateQuantity,
} from "../store/cartSlice";
import { FiTrash2 } from "react-icons/fi";
import styles from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(
    (state: RootState) => state.cart.items
  );

  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.2;
  const delivery = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h1>YOUR CART</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>YOUR CART</h1>

      <div className={styles.wrapper}>
        <div className={styles.items}>
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className={styles.card}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div className={styles.info}>
                <div className={styles.topRow}>
                  <div>
                    <h3>{item.title}</h3>
                    <p className={styles.price}>
                      ${item.price}
                    </p>
                  </div>

                  <button
                    className={styles.remove}
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          id: item.id,
                          selectedSize:
                            item.selectedSize,
                          selectedColor:
                            item.selectedColor,
                        })
                      )
                    }
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className={styles.quantity}>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          selectedSize:
                            item.selectedSize,
                          selectedColor:
                            item.selectedColor,
                          type: "decrement",
                        })
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          selectedSize:
                            item.selectedSize,
                          selectedColor:
                            item.selectedColor,
                          type: "increment",
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className={styles.summary}>
          <h2>Order Summary</h2>

          <div className={styles.row}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.row}>
            <span>Discount (20%)</span>
            <span className={styles.discount}>
              -${discount.toFixed(2)}
            </span>
          </div>

          <div className={styles.row}>
            <span>Delivery Fee</span>
            <span>${delivery}</span>
          </div>

          <hr />

          <div className={styles.total}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className={styles.checkout}>
            Go to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}