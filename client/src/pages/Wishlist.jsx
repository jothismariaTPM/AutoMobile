import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { products, axios, wishlistItems, setWishlistItems, country, inrToAed } = useAppContext();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Build wishlist items from product IDs
  const getCart = () => {
    const tempArray = wishlistItems
      .map((id) => products.find((item) => String(item._id) === String(id)))
      .filter(Boolean); // remove nulls

    setWishlist(tempArray);
  };

  useEffect(() => {
    getCart();
  }, [wishlistItems, products]);

  const removeItem = async (productId, e) => {
    e.stopPropagation(); // prevent card click navigation

    try {
      const response = await axios.post("/api/wishlist/remove", { productId });

      if (response.data.success) {
        toast.success("Removed from wishlist.");
      }
       // 🔥 Remove locally — triggers useEffect → refresh UI
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Convert category to slug format
  const getCategorySlug = (category) => {
    const categoryName =
      typeof category === "object" ? category?.name : category;

    return String(categoryName || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const convertINRtoAED = (priceINR) => {
    if (!inrToAed) return priceINR; // fallback
    return (priceINR * inrToAed).toFixed(2);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold m-5">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center m-10">No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {wishlist.map((item) => {
            const safeCategory = getCategorySlug(item.category);

            return (
             <div
  key={item._id}
  onClick={() => {
    navigate(`/products/${safeCategory}/${item._id}`);
    scrollTo(0, 0);
  }}
  className="relative border border-gray-500/20 rounded-md px-3 py-5 md:mx-10 bg-white w-full hover:shadow-sm transition-all duration-200 cursor-pointer"
>
  {/* Remove Button */}
  <button
    onClick={(e) => removeItem(item._id, e)}
    className="absolute top-1 right-3 text-2xl hover:text-red-600 z-20"
  >
    ×
  </button>

  <div className="group cursor-pointer flex items-center justify-center px-2 h-36 md:h-44 overflow-hidden">
    <img
      className="group-hover:scale-105 transition-transform duration-300 object-contain h-full"
      src={item.image[0]}
      alt="product"
    />
  </div>
  
  <p className="text-gray-700 font-medium text-lg truncate w-full mt-2">{item.name}</p>
  <p className="md:text-xl text-base font-medium text-primary">
     {country === "AE" ? `AED ${convertINRtoAED(item.offerPrice)}` : `₹${item.offerPrice}`}
  </p>
</div>


            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
