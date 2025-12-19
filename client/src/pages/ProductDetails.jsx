import React, { useEffect, useState, useRef} from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCart from "../components/ProductCart";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useSwipeable } from "react-swipeable";
import { addRecentView } from "../utils/recentViews";

const ProductDetails = () => {
  const { products, navigate, currency, backend, addToCart, axios, setWishlistItems, wishlistItems, country, inrToAed } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);


  // FIX: Compare using == (URL param is string, DB id may be number)
  const product = products.find((item) => item._id == id);

  //console.log("product: ",product)
  //console.log("recentview: ",product._id)

  useEffect(() => {
  if (product) {
    addRecentView(product._id);
  }
}, [product?._id]);


  
  const handleSelectThumbnail = (index) => {
  setCurrentIndex(index);
  setThumbnail(`${backend}${product.image[index]}`);
};

const handleNext = () => {
  const nextIndex = (currentIndex + 1) % product.image.length;
  handleSelectThumbnail(nextIndex);
};

const handlePrev = () => {
  const prevIndex =
    (currentIndex - 1 + product.image.length) % product.image.length;
  handleSelectThumbnail(prevIndex);
};

// ✔️ MUST come AFTER the above functions
const handlers = useSwipeable({
  onSwipedLeft: handleNext,
  onSwipedRight: handlePrev,
  preventScrollOnSwipe: true,
  trackMouse: true,
  touchAction: "pan-y",   // 🔥 REQUIRED FOR MOBILE
});


  // ---------- RELATED PRODUCTS ----------
  useEffect(() => {
    if (!product || products.length === 0) return;

    const filtered = products
      .filter(
        (item) =>
          item.category?._id === product.category?._id && item._id != product._id
      )
      .slice(0, 5);

    setRelatedProducts(filtered);
  }, [products, product]);

  // ---------- SET THUMBNAIL ----------
  useEffect(() => {
    if (product && product.image?.length > 0) {
      setThumbnail(`${backend}${product.image[0]}`);
    }
  }, [product]);

  // ---------- LOADING / INVALID PRODUCT ----------
  if (!product) {
    return (
      <div className="mt-12 text-center text-gray-600 text-xl">
        Loading product...
      </div>
    );
  }
  

  const addToWishlist = async (productId) => {
    //console.log("producID: ",productId)
  try{
   const {data} = await axios.post("/api/wishlist/add", { productId });
   if(data.success){
    toast.success('Added to Wishlist')
     // 🔥 UPDATE LOCAL STATE TO REFRESH UI
    setWishlistItems((prev) => [...prev, productId]);
   }else{
    toast.error('Not Added')
   }
  }catch(error){
    console.log(error.message)
  }
  };

  const isWishlisted = wishlistItems.includes(product._id);

  const formatPrice = (value) => Number(value).toLocaleString("en-IN");

  const convertINRtoAED = (priceINR) => {
    if (!inrToAed) return priceINR; // fallback
    return (priceINR * inrToAed).toFixed(2);
  };


  return (
    <div className="mt-12">
     <div className="flex justify-between mb-10">
       <p>
        <Link to={"/"}>Home</Link> /
        <Link to={"/products"}> Products</Link> /
        <Link to={`/products/${product.category?.name.toLowerCase()}`}>
          {" "}
          {product.category?.name}
        </Link>
        <span className="text-primary"> {product.name}</span>
      </p>

       <button onClick={() => addToWishlist(product._id)} className=" hover:text-red-600">
       <Heart className="w-6 h-6" fill={isWishlisted ? "red" : "white"} stroke={isWishlisted ? "red" : "currentColor"}/>
      </button>
     </div>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* ---------- LEFT IMAGES ---------- */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) =>{ 
              const isActive = currentIndex === index;
              return (
              <div
                key={index}
                onClick={() => handleSelectThumbnail(index)}
                className= {`border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer
                 ${isActive ? "border-primary border-2" : "border-gray-300"}`}
              >
                <img src={`${backend}${image}`} alt={`Thumbnail ${index + 1}`} />
              </div>
            )
            })}
          </div>

          {/* MAIN IMAGE */}
          <div {...handlers} className="relative border border-gray-500/30 max-w-100 rounded overflow-hidden max-h-100">
            <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" draggable={false}/>
          </div>
        </div>

        {/* ---------- PRODUCT DETAILS ---------- */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            {/*<p className="text-gray-500/70 line-through">
              MRP: 
              {country === "AE" ? `AED ${convertINRtoAED(product?.price)}` : `₹${product?.price}`}
            </p>*/}
            <p className="text-2xl font-medium">
              MRP: {" "}
              {/*{country === "AE" ? `AED ${convertINRtoAED(product?.price)}` : `₹${product?.price}`}*/}
              {country === "AE" ? `AED ${formatPrice(convertINRtoAED(product?.price))}` : ` ₹${formatPrice(product?.price)}`}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="mt-4">
  {!showMore && (
    <button 
      onClick={() => setShowMore(true)}
      className="text-primary underline cursor-pointer"
    >
      View More
    </button>
  )}

  {showMore && (
    <div className="mt-4 space-y-3 text-gray-700">
      <p className="text-lg font-semibold mb-3">Specifications</p>

        <div className="bg-white shadow-sm border rounded-lg p-4 text-sm">
          <div className="grid grid-cols-2 gap-3">

            <p className="text-gray-500">Brand</p>
            <p className="font-medium">{product.productBrand}</p>

            <p className="text-gray-500">Car Model</p>
            <p className="font-medium">{product.carModel}</p>

            <p className="text-gray-500">Part Number</p>
            <p className="font-medium">{product.partNumber}</p>

            <p className="text-gray-500">Programming</p>
            <p className="font-medium">{product.programming}</p>

            <p className="text-gray-500">Compatible Models</p>
            <p className="font-medium">{product.compatibleModels}</p>

            <p className="text-gray-500">Warranty</p>
            <p className="font-medium">{product.warranty}</p>

            <p className="text-gray-500">Delivery Time</p>
            <p className="font-medium">{product.deliveryTime}</p>
          </div>
        </div>
       <div className="mt-4">
  {product.testingVideo && (
    <div className="relative w-full">
      <p className="text-lg font-semibold mb-4">Testing Video: </p>
      {/* Video Player */}
      <video
        src={`${backend}${product.testingVideo}`}
        className="w-1/2 h-1/2 rounded-xl shadow-md border border-gray-200 "
        controls
        onError={(e) => {
          e.target.style.display = "none";
          const fallback = document.getElementById("video-fallback");
          if (fallback) fallback.style.display = "block";
        }}
      />

      {/* Fallback Message 
      <div
        id="video-fallback"
        className="hidden text-red-600 text-center mt-2 text-sm"
      >
        Failed to load video.
      </div>*/}
    </div>
  )}
</div>


      <button
        onClick={() => setShowMore(false)}
        className="text-primary underline cursor-pointer mt-2"
      >
        View Less
      </button>
    </div>
  )}
</div>


         <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
            >
              Buy now
            </button>
          </div>
        </div>
       

      </div>

      {/* ---------- RELATED PRODUCTS ---------- */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCart key={index} product={product} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
