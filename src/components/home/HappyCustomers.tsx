import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import styles from "./HappyCustomers.module.css";

export default function HappyCustomers() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>OUR HAPPY CUSTOMERS</h2>

          <div className={styles.arrows}>
            <FiArrowLeft />
            <FiArrowRight />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className={styles.nameRow}>
              <h4>Sarah M.</h4>
              <BsPatchCheckFill className={styles.verified} />
            </div>

            <p>
              "I'm blown away by the quality and style of the clothes I
              received from Shop.co. From casual wear to elegant dresses,
              every piece I've bought has exceeded my expectations."
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className={styles.nameRow}>
              <h4>Alex K.</h4>
              <BsPatchCheckFill className={styles.verified} />
            </div>

            <p>
              "Finding clothes that align with my personal style used to be a
              challenge until I discovered Shop.co. The range of options they
              offer is truly remarkable, catering to a variety of tastes and
              occasions."
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className={styles.nameRow}>
              <h4>James L.</h4>
              <BsPatchCheckFill className={styles.verified} />
            </div>

            <p>
              "As someone who's always on the lookout for unique fashion
              pieces, I'm thrilled to have stumbled upon Shop.co. The selection
              of clothes is not only diverse but also on-point with the latest
              trends."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
