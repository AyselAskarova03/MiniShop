import { useEffect,useState } from "react";
import styles from "./AdminProducts.module.css";

export default function AdminProducts(){

  const [products,setProducts] = useState<any[]>([]);

  useEffect(()=>{

    const data =
      JSON.parse(localStorage.getItem("adminProducts") || "[]");

    setProducts(data);

  },[]);


  const handleDelete = (id:number)=>{

    const updated =
      products.filter(p => p.id !== id);

    setProducts(updated);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updated)
    );

  };


  return(

    <div>

      <h1>Products</h1>

      <div className={styles.grid}>

        {products.map(product =>(

          <div key={product.id} className={styles.card}>

            <img src={product.image} />

            <h3>{product.title}</h3>

            <p>${product.price}</p>

            <button
              onClick={()=>handleDelete(product.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  )

}