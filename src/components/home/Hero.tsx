import styles from "./Hero.module.css";
import heroModel from "../../assets/hero-model.png/heron.jpg";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.left}>
          <h1 className={styles.title}>
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>

          <p className={styles.description}>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>

          <button className={styles.button}>
            Shop Now
          </button>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>200+</h3>
              <p>International Brands</p>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.statItem}>
              <h3>2,000+</h3>
              <p>High-Quality Products</p>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.statItem}>
              <h3>30,000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <img src={heroModel} alt="Fashion Model" className={styles.image} />
        </div>

      </div>
    </section>
  );
}
