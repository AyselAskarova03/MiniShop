import { useState } from "react";
import styles from "./ReviewsSection.module.css";
import { FaStar } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: number;
  isUserReview?: boolean;
};

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable.",
    date: new Date("2023-08-14").getTime()
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 5,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch.",
    date: new Date("2023-08-15").getTime()
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 4,
    text: "This t-shirt is a must-have for anyone who appreciates good design.",
    date: new Date("2023-08-16").getTime()
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 5,
    text: "As a UI/UX enthusiast, I value simplicity and functionality.",
    date: new Date("2023-08-17").getTime()
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 5,
    text: "The fabric is soft and the design speaks volumes about the designer's skill.",
    date: new Date("2023-08-18").getTime()
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 5,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy.",
    date: new Date("2023-08-19").getTime()
  }
];

export default function ReviewsSection() {

  const [reviews, setReviews] = useState(initialReviews);
  const [visible, setVisible] = useState(6);
  const [sort, setSort] = useState("latest");
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name,
      text,
      rating,
      date: Date.now(),
      isUserReview: true
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    setRating(5);
    setShowForm(false);
  };

  const deleteReview = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    setMenuOpen(null);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "latest") return b.date - a.date;
    return a.date - b.date;
  });

  return (
    <section className={styles.wrapper}>

      <div className={styles.top}>

        <h2>
          All Reviews <span>({reviews.length})</span>
        </h2>

        <div className={styles.actions}>

          <button className={styles.filterBtn}>
            <HiAdjustmentsHorizontal />
          </button>

          <select
            className={styles.select}
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>

          <button
            className={styles.writeBtn}
            onClick={()=>setShowForm(!showForm)}
          >
            Write a Review
          </button>

        </div>

      </div>


      {showForm && (

        <form className={styles.form} onSubmit={handleSubmit}>

          <input
            placeholder="Your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e)=>setText(e.target.value)}
            required
          />

          <select
            value={rating}
            onChange={(e)=>setRating(Number(e.target.value))}
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>

          <button type="submit">
            Submit Review
          </button>

        </form>

      )}


      <div className={styles.grid}>

        {sortedReviews.slice(0, visible).map((review)=> (

          <div key={review.id} className={styles.card}>

            <div className={styles.cardTop}>

              <div className={styles.stars}>
                {[1,2,3,4,5].map((n)=>(
                  <FaStar
                    key={n}
                    className={
                      n <= review.rating
                        ? styles.starActive
                        : styles.star
                    }
                  />
                ))}
              </div>

              {review.isUserReview && (
                <div className={styles.menuWrapper}>
                  <BsThreeDots
                    className={styles.menuIcon}
                    onClick={() =>
                      setMenuOpen(menuOpen === review.id ? null : review.id)
                    }
                  />

                  {menuOpen === review.id && (
                    <div className={styles.menuDropdown}>
                      <button
                        type="button"
                        onClick={()=>deleteReview(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className={styles.user}>
              {review.name}
              <IoCheckmarkCircle className={styles.verified}/>
            </div>

            <p className={styles.text}>
              "{review.text}"
            </p>

            <span className={styles.date}>
              Posted on {new Date(review.date).toLocaleDateString()}
            </span>

          </div>

        ))}

      </div>


      {visible < sortedReviews.length && (
        <div className={styles.loadMore}>
          <button
            type="button"
            onClick={()=>setVisible(visible + 3)}
          >
            Load More Reviews
          </button>
        </div>
      )}

    </section>
  );
}