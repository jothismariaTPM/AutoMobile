import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [country, setCountry] = useState("IN");
  const [inrToAed, setInrToAed] = useState(null);

  useEffect(() => {
  const setup = async () => {
    try {
      // Detect country
      const locationRes = await fetch("https://ipapi.co/json/");
      const location = await locationRes.json();
      setCountry(location.country); // IN or AE
      console.log("Country: ",location.country)

      // Fetch live INR conversion rates
      const rateRes = await fetch("https://open.er-api.com/v6/latest/INR");
      const rateData = await rateRes.json();

      // Set INR -> AED conversion rate
      setInrToAed(rateData.rates.AED);
      console.log("AED: ",rateData.rates.AED)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  setup();
}, []);

  const convertINRtoAED = (priceINR) => {
    if (!inrToAed) return priceINR; // fallback
    return (priceINR * inrToAed).toFixed(2);
  };

  // ------------------ FETCH USER ------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        const safeCart = data.user.cartItems || {};
        setUser(data.user);
        setCartItems(safeCart);
        setWishlistItems(data.user.wishlist || []);
        //console.log("cart items: ",safeCart)
        //console.log("cart items: ",wishlistItems)
      } else {
        setUser(null);
        setCartItems({});
        setWishlistItems([]);
      }
    } catch (err) {
      setUser(null);
      setCartItems({});
      setWishlistItems([]);
    }
  };

  //fetch seller status
  const fetchSeller = async () => {
    try{
     const {data}  = await axios.get('/api/seller/is-auth');
     if(data.success){
      setIsSeller(true)
     }else{
      setIsSeller(false)
     }
    }catch(error){
     setIsSeller(false)
    }
  }

  // ------------------ FETCH PRODUCTS ------------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products)
      }
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  // ------------------ ADD TO CART ------------------
  const addToCart = (productId) => {
  const updatedCart = {
    ...cartItems,
    [productId]: (cartItems[productId] || 0) + 1,
  };

  setCartItems(updatedCart);
  updateCart(updatedCart);
  toast.success("Added to cart")
};

  // ------------------ REMOVE FROM CART ------------------
  const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const updated = { ...prev };

    if (updated[itemId]) {
      delete updated[itemId];
    }

    return updated;
  });

  toast.success("Removed from cart");
};

  const updateCartItem = (productId, quantity) => {
  const updatedCart = {
    ...cartItems,
    [productId]: quantity,
  };

  setCartItems(updatedCart);
  updateCart(updatedCart);

  toast.success("Cart Updated")
};


  // ------------------ CART COUNT ------------------
  const getCartCount = () => {
    let count = 0;
    Object.values(cartItems).forEach((qty) => (count += qty));
    return count;
  };

  // ------------------ CART COUNT ------------------
  const getWishlistCount = () => {
    let count = wishlistItems.length;
    return count;
  };

  // ------------------ CART AMOUNT ------------------
  const getCartAmount = () => {
    let total = 0;

    for (let itemId in cartItems) {
      const qty = cartItems[itemId];
      const item = products.find((p) => String(p._id) === String(itemId));

      if (item){
        if(country == "AE"){
          let price = Number(item.price);
          total += convertINRtoAED(price) * qty;
        }else{
          total += Number(item.price) * qty;
        }
      } 
    }

    return Math.round(total * 100) / 100;
  };

  // ------------------ SYNC CART TO BACKEND ------------------
  const updateCart = async (updatedCart) => {
  if (!user) return;

  try {
    await axios.post("/api/cart/update", {
      userId: user.id,
      cartItems: updatedCart,
    });
  } catch (error) {
    toast.error(error.message)
    console.log("Cart sync failed:", error.message);
  }
};

  // ------------------ INITIAL LOAD ------------------
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    fetchProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    getWishlistCount,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    country,
    setCountry,
    inrToAed,
    setInrToAed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
