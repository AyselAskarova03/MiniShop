import styles from "../home/BrowseStyle.module.css";

import casual from "../../assets/images/casual.png";
import formal from "../../assets/images/formal.png";
import party from "../../assets/images/party.png";
import gym from "../../assets/images/gym.png";

export default function BrowseByStyle() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.casual}`}>
            <span>Casual</span>
            <img src={casual} alt="Casual" />
          </div>

          <div className={`${styles.card} ${styles.formal}`}>
            <span>Formal</span>
            <img src={formal} alt="Formal" />
          </div>

          <div className={`${styles.card} ${styles.party}`}>
            <span>Party</span>
            <img src={party} alt="Party" />
          </div>

          <div className={`${styles.card} ${styles.gym}`}>
            <span>Gym</span>
            <img src={gym} alt="Gym" />
          </div>
        </div>
      </div>
    </section>
  );
}
