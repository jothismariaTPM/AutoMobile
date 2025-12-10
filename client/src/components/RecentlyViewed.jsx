import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCart from "./ProductCart";
import { getRecentViews } from "../utils/recentViews";

function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    const viewed = getRecentViews(); // returns array of product IDs
    if (viewed.length > 0) {
      fetchRecentProducts(viewed);
    }
  }, []);

  

  const fetchRecentProducts = async (ids) => {
  try {
    const { data } = await axios.post("/api/product/bulk", { ids });
    //console.log("recent product: ",data.products)
    setRecentProducts(data.products);
  } catch (error) {
    console.error("Error fetching recent products", error);
  }
};


  return (
    <>
      {recentProducts.length > 0 && (
        <section className="mt-16">
        <h2 className='text-2xl md:text-3xl font-medium'>Recently Viewed</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 md:gap-6  mt-6'>
            {recentProducts.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default RecentlyViewed;
