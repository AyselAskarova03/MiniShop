import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import type { Product } from "../../types/product";
import styles from "./ProductDetail.module.css";
import { FaStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import ReviewsSection from "./sections/ReviewsSection";
import RelatedProducts from "./sections/RelatedProducts";

export default function ProductDetail() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [product,setProduct] = useState<Product | null>(null);
  const [selectedImage,setSelectedImage] = useState("");
  const [selectedSize,setSelectedSize] = useState<string | null>(null);
  const [selectedColor,setSelectedColor] = useState<string | null>(null);
  const [quantity,setQuantity] = useState(1);

  const [activeTab,setActiveTab] = useState("reviews");

  useEffect(()=>{

    if(!id) return;

    const fetchProduct = async()=>{

      try{

        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0] || "");

      }catch(error){
        console.error(error);
      }

    };

    fetchProduct();

  },[id]);


  if(!product) return <p>Loading...</p>;


  const clothingSizes = ["S","M","L","XL"];
  const shoeSizes = ["38","39","40","41","42","43","44"];

  const category = product.category?.toLowerCase() || "";

  const isClothing =
    category.includes("shirt") ||
    category.includes("tops") ||
    category.includes("dress");

  const isShoe = category.includes("shoe");
  const isBag = category.includes("bag");

  const sizes = isClothing
    ? clothingSizes
    : isShoe
    ? shoeSizes
    : [];

  const showColors = isClothing || isShoe || isBag;

  const colors = ["#000000","#5B5B3A","#2F4F4F","#C0392B"];

  const discountedPrice = Math.round(
    product.price -
    (product.price * product.discountPercentage) / 100
  );

  const stars = Math.round(product.rating);


  const handleAddToCart = ()=>{

    if(sizes.length > 0 && !selectedSize){
      alert("Please select size");
      return;
    }

    if(showColors && !selectedColor){
      alert("Please select color");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor
      })
    );

  };


  return (

    <div className={styles.wrapper}>

      <div className={styles.container}>


        <div className={styles.left}>

          <div className={styles.thumbnails}>
            {product.images?.map((img)=>(
              <img
                key={img}
                src={img}
                alt=""
                onClick={()=>setSelectedImage(img)}
                className={
                  selectedImage === img
                    ? styles.activeThumb
                    : styles.thumb
                }
              />
            ))}
          </div>


          <div className={styles.mainImage}>

            <img
              src={selectedImage}
              alt={product.title}
              className={styles.productImg}
            />

            {selectedColor && showColors && (
              <div
                className={styles.colorOverlay}
                style={{ background:selectedColor }}
              />
            )}

          </div>

        </div>



        <div className={styles.right}>

          <h1>{product.title}</h1>


          <div className={styles.rating}>

            {[1,2,3,4,5].map((num)=>(
              <FaStar
                key={num}
                className={
                  num <= stars
                    ? styles.starActive
                    : styles.star
                }
              />
            ))}

            <span>{product.rating}</span>

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



          {showColors && (
            <div className={styles.section}>

              <p>Select Color</p>

              <div className={styles.colors}>

                {colors.map((color)=>(
                  <div
                    key={color}
                    style={{ background:color }}
                    className={
                      selectedColor === color
                        ? styles.activeColor
                        : styles.color
                    }
                    onClick={()=>setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <IoCheckmark className={styles.check}/>
                    )}
                  </div>
                ))}

              </div>

            </div>
          )}



          {sizes.length > 0 && (

            <div className={styles.section}>

              <p>Choose Size</p>

              <div className={styles.sizes}>

                {sizes.map((size)=>(
                  <button
                    key={size}
                    className={
                      selectedSize === size
                        ? styles.activeSize
                        : styles.size
                    }
                    onClick={()=>setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>

          )}



          <div className={styles.cartRow}>

            <div className={styles.qty}>

              <button
                onClick={() =>
                  setQuantity(quantity > 1 ? quantity - 1 : 1)
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={()=>setQuantity(quantity + 1)}
              >
                +
              </button>

            </div>



            <button
              className={styles.cartBtn}
              onClick={handleAddToCart}
              disabled={
                (sizes.length > 0 && !selectedSize) ||
                (showColors && !selectedColor)
              }
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>



      <div className={styles.tabs}>

        <button
          className={
            activeTab === "details"
              ? styles.activeTab
              : styles.tab
          }
          onClick={()=>setActiveTab("details")}
        >
          Product Details
        </button>

        <button
          className={
            activeTab === "reviews"
              ? styles.activeTab
              : styles.tab
          }
          onClick={()=>setActiveTab("reviews")}
        >
          Rating & Reviews
        </button>

        <button
          className={
            activeTab === "faq"
              ? styles.activeTab
              : styles.tab
          }
          onClick={()=>setActiveTab("faq")}
        >
          FAQs
        </button>

      </div>



      {activeTab === "details" && (
        <div className={styles.tabContent}>
          <p>{product.description}</p>
        </div>
      )}

      {activeTab === "reviews" && <ReviewsSection />}
      {activeTab === "reviews" && <RelatedProducts />}

      {activeTab === "faq" && (
        <div className={styles.tabContent}>
          <p>No FAQs yet.</p>
        </div>
      )}

    </div>

  );

}