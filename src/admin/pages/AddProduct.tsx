import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddProduct.module.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const products = JSON.parse(
      localStorage.getItem("adminProducts") || "[]"
    );

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      image
    };

    const updatedProducts = [...products, newProduct];

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setTitle("");
    setPrice("");
    setImage("");

    navigate("/admin/products");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Add Product</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}