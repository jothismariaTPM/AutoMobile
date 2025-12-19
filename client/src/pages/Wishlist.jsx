import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { products, axios, backend, wishlistItems, setWishlistItems, country, inrToAed } = useAppContext();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const getWishlist = async () => {
  let validProducts = [];
  let invalidIds = [];

  for (const id of wishlistItems) {
    const product = products.find(
      item => String(item._id) === String(id)
    );

    if (!product) {
      invalidIds.push(id);
    } else {
      validProducts.push(product);
    }
  }

  // Remove invalid wishlist items (backend + state)
  if (invalidIds.length > 0) {
    try {
      await Promise.all(
        invalidIds.map(id =>
          removeUserWishlistItem(id)
        )
      );

      setWishlistItems(prev =>
        prev.filter(id => !invalidIds.includes(id))
      );
    } catch (err) {
      console.error(err);
    }
  }

  setWishlist(validProducts);
};

useEffect(() => {
  if (products.length > 0 && wishlistItems.length > 0) {
    getWishlist();
  } else {
    setWishlist([]);
  }
}, [products, wishlistItems]);



  //remove item from user wishlist when no product 
   const removeUserWishlistItem = async (productId) => {
   try {
    const response = await axios.post("/api/wishlist/remove", { productId });

    if (response.data.success) {
      toast.success("Removed from wishlist.");
    }
  } catch (error) {
    console.error(error);
  }
};

  const removeItem = async (productId, e) => {
    e.stopPropagation(); // prevent card click navigation

    try {
      const response = await axios.post("/api/wishlist/remove", { productId });

      if (response.data.success) {
        toast.success("Removed from wishlist.");
      }
       // Remove locally — triggers useEffect → refresh UI
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

  const handleProductClick = (item) => {
  if (!item?.inStock) {
    toast.error("This product is currently out of stock");
    return;
  }

  const safeCategory = getCategorySlug(item.category);

  navigate(`/products/${safeCategory}/${item._id}`);
  scrollTo(0, 0);
};



return (
  <div className="px-4 sm:px-6 lg:px-10 py-5">
    <h2 className="text-lg sm:text-xl font-semibold mb-6">
      My Wishlist
    </h2>

    {wishlist.length === 0 ? (
      <p className="text-center text-gray-500 py-10">
        No items in wishlist
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {wishlist.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item)}
            className="relative border border-gray-200 rounded-lg p-4 bg-white w-full hover:shadow-md transition cursor-pointer"
          >
            {/* Remove Button */}
            <button
              onClick={(e) => removeItem(item._id, e)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600 z-20"
            >
              ×
            </button>

            {/* Image */}
            <div className="flex items-center justify-center h-32 sm:h-36 md:h-40 overflow-hidden">
              <img
                className="object-contain h-full transition-transform duration-300 hover:scale-105"
                src={`${backend}${item.image[0]}`}
                alt="product"
              />
            </div>

            {/* Product Name */}
            <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 truncate">
              {item.name}
            </p>

            {/* Price */}
            <p className="mt-1 text-base sm:text-lg font-semibold text-primary">
              {country === "AE"
                ? `AED ${convertINRtoAED(item.price)}`
                : `₹${item.price}`}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default Wishlist;
