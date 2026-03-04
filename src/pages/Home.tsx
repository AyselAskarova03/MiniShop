import { useEffect } from "react";
import { api } from "../services/api";
import Hero from "../components/home/Hero";
import BrandBar from "../components/home/BrandBar";
import NewArrivals from "../components/home/NewArrivals";
import TopSelling from "../components/home/TopSelling";
import BrowseStyle from "../components/home/BrowseStyle";
import HappyCustomers from "../components/home/HappyCustomers";

const Home = () => {

  useEffect(() => {
    api.get("/products?limit=5")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Hero />
       <BrandBar />
       <NewArrivals />
       <TopSelling/>
       <BrowseStyle/>
       <HappyCustomers/>
    </>
  );
};

export default Home;
