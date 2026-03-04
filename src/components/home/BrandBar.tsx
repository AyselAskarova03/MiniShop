import styles from "./BrandBar.module.css";

export default function BrandBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>Calvin Klein</span>
      </div>
    </section>
  );
}
