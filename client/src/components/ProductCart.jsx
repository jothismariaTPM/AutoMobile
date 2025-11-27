import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCart = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate, country, inrToAed } = useAppContext();

  if (!product) return null;

  const id = String(product._id);

   // Handle both string categories and populated category objects
  const categoryName = typeof product?.category === "object"
    ? product.category?.name
    : product?.category;

  const convertINRtoAED = (priceINR) => {
    if (!inrToAed) return priceINR; // fallback
    return (priceINR * inrToAed).toFixed(2);
  };


  return (
    <div
      onClick={() => {
      const safeCategory = String(categoryName || "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

    navigate(`/products/${safeCategory}/${id}`);
    scrollTo(0, 0);
  }}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-3 bg-white w-full hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="group cursor-pointer flex items-center justify-center px-2 h-36 md:h-44 overflow-hidden">
        <img
          className="group-hover:scale-105 transition-transform duration-300 object-contain h-full"
          src={product?.image?.[0] ?? assets.placeholder_image}
          alt={product?.name ?? "product"}
        />
      </div>

      {/* Product Details */}
      <div className="text-gray-500/60 text-sm mt-3">
        <p>{categoryName ?? "Unknown"}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product?.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array(5).fill('').map((_, i) => (
            <img key={i} className="md:w-3.5 w-3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} />
          ))}
          <p>(4)</p>
        </div>

        {/* Price + Add Button {currency}{product?.offerPrice}{' '} */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {country === "AE" ? `AED ${convertINRtoAED(product?.offerPrice)}` : `₹${product?.offerPrice}`}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
            {country === "AE" ? `AED ${convertINRtoAED(product?.price)}` : `₹${product?.price}`}
            </span>
          </p>

          {/* Cart Controls */}
          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems?.[id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary-dull font-medium cursor-pointer"
                onClick={() => addToCart(id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none">
                <button onClick={() => removeFromCart(id)} className="cursor-pointer text-md px-2 h-full">-</button>
                <span className="w-5 text-center">{cartItems[id]}</span>
                <button onClick={() => addToCart(id)} className="cursor-pointer text-md px-2 h-full">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
