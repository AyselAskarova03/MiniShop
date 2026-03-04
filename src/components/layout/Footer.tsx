import styles from "./Footer.module.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from "react-icons/si";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return alert("Please enter your email");
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className={styles.footer}>

      <div className={styles.newsletter}>
        <div className={styles.newsLeft}>
          <h2>STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS</h2>
        </div>

        <form className={styles.newsRight} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <FiMail />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Subscribe to Newsletter</button>
        </form>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.brand}>
          <h3>SHOP.CO</h3>
          <p>
            We have clothes that suits your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className={styles.socials}>
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <h4>COMPANY</h4>
            <a>About</a>
            <a>Features</a>
            <a>Works</a>
            <a>Career</a>
          </div>

          <div>
            <h4>HELP</h4>
            <a>Customer Support</a>
            <a>Delivery Details</a>
            <a>Terms & Conditions</a>
            <a>Privacy Policy</a>
          </div>

          <div>
            <h4>FAQ</h4>
            <a>Account</a>
            <a>Manage Deliveries</a>
            <a>Orders</a>
            <a>Payments</a>
          </div>

          <div>
            <h4>RESOURCES</h4>
            <a>Free eBooks</a>
            <a>Development Tutorial</a>
            <a>How to - Blog</a>
            <a>Youtube Playlist</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className={styles.payments}>
          <SiVisa />
          <SiMastercard />
          <SiPaypal />
          <SiApplepay />
          <SiGooglepay />
        </div>
      </div>

    </footer>
  );
}
