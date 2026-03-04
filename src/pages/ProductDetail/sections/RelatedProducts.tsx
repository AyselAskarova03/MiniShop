import { useEffect, useState } from "react";
import styles from "./RelatedProducts.module.css";
import { FaStar } from "react-icons/fa";
import { api } from "../../../services/api";
import type { Product } from "../../../types/product";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts() {

  const [products,setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{

    const fetchProducts = async ()=>{

      try{

        const res = await api.get("/products?limit=4");
        setProducts(res.data.products);

      }catch(err){
        console.log(err);
      }

    };

    fetchProducts();

  },[]);


  return (

    <section className={styles.wrapper}>

      <h2 className={styles.title}>
        YOU MIGHT ALSO LIKE
      </h2>


      <div className={styles.grid}>

        {products.map((product)=>{

          const stars = Math.round(product.rating);

          const discountedPrice = Math.round(
            product.price -
            (product.price * product.discountPercentage) / 100
          );

          return(

            <div
              key={product.id}
              className={styles.card}
              onClick={()=>navigate(`/product/${product.id}`)}
            >

              <div className={styles.imageBox}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>

              <h3 className={styles.name}>
                {product.title}
              </h3>


              <div className={styles.rating}>

                {[1,2,3,4,5].map((n)=>(
                  <FaStar
                    key={n}
                    className={
                      n <= stars
                        ? styles.starActive
                        : styles.star
                    }
                  />
                ))}

                <span>
                  {product.rating}/5
                </span>

              </div>


              <div className={styles.priceRow}>

                <span className={styles.price}>
                  ${discountedPrice}
                </span>

                <span className={styles.oldPrice}>
                  ${product.price}
                </span>

                <span className={styles.discount}>
                  -{Math.round(product.discountPercentage)}%
                </span>

              </div>

            </div>

          )

        })}

      </div>

    </section>

  )

}