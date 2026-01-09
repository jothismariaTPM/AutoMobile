import React,{useEffect, useState} from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Cart = () => {

   const [showAddress, setShowAddress] = useState(false)
   const {products,currency, backend, cartItems, setCartItems, getCartCount, removeFromCart, getCartAmount, updateCartItem, user, axios, navigate, country, inrToAed } = useAppContext();

   const [cartArray,setCartArray] = useState([])
   const [addresses, setAddresses] = useState("")

   const [selectedAddress,setSelectedAddress] = useState(addresses[0])
   const [paymentOption,setPaymentOption] = useState("COD")

   const getCart = async () => {
   let tempArray = [];

  for (const key in cartItems) {
    const product = products.find(item => String(item._id) === String(key));

    // prevent crash 
     if (!product) {
      await removeUserCartItem(key);
      continue;
    }

    // skip out-of-stock products
    if (!product.inStock) {
      //toast.error(`${product.name} is out of stock`);
      await removeUserCartItem(product._id);
      continue;
    }


    tempArray.push({
      ...product,
      quantity: cartItems[key]
    });
  }

  setCartArray(tempArray);
};

 const getUserAddress = async () => {
    try{
     const {data} = await axios.get('/api/address/get')
     if(data.success){
        setAddresses(data.addresses)
        if(data.addresses.length > 0){
            setSelectedAddress(data.addresses[0])
        }
     }else{
        console.log(data.message)
        toast.error(data.message)
     }
    }catch(error){
        toast.error(error.message)
    }
   }

   //remove item from user cart when no product or product out of stock
   const removeUserCartItem = async (productId) => {
   try {
    const response = await axios.post("/api/cart/remove", { productId });

    if (response.data.success) {
      setCartItems(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  } catch (error) {
    console.error(error);
  }
};


   const removeItem = async (productId, e) => {
    e.preventDefault(); // prevent card click navigation

    try {

      if(!user){
         removeFromCart(productId);
      }
       
    const response = await axios.post("/api/cart/remove", { productId });

    if (response.data.success) {
      toast.success("Item removed from cart.");

      // Remove locally (object version)
      setCartItems(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};



    const placeOrder = async () => {
    try{
       if(!user){
        toast.error('Login to place Order');
        navigate("/login");
        return;
      } 
      if(!selectedAddress){
        return toast.error("Please select an address")
      }
      console.log("addresss: ",selectedAddress)
      if(paymentOption === "COD"){
        const {data} = await axios.post('/api/order/cod',{
            userId: user._id,
            items:cartArray.map(item => ({product: item._id, quantity: item.quantity})),
            addressId: selectedAddress._id
        })
        if(data.success){
            toast.success(data.message)
            setCartItems({})
            navigate('/my-orders')
        }else{
            toast.error(data.message)
        }
      }else{
        const {data} = await axios.post('/api/order/stripe',{
            userId: user._id,
            items:cartArray.map(item => ({product: item._id, quantity: item.quantity})),
            addressId: selectedAddress._id
        })
        if(data.success){
            window.location.replace(data.url)
        }else{
            toast.error(data.message)
        }
      }
    }catch(error){
        toast.error(error.message)
    }
   }

    useEffect(()=>{
    if(user){
        getUserAddress()
    }
   },[user])

   useEffect(()=>{
       if(products.length > 0 && cartItems){
        getCart()
       }
   },[products,cartItems])

   const convertINRtoAED = (priceINR) => {
    if (!inrToAed) return priceINR; // fallback
    return (priceINR * inrToAed).toFixed(2);
  };

    return products.length > 0 && cartItems && (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart 
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>
                {cartArray.length > 0 ? (
                  cartArray.map((product) => (
                    <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={`${backend}${product.image[0]}`} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    {/*<p>Weight: <span>{product.weight || "N/A"}</span></p>*/}
                                    <div className='flex items-center mt-1'>
                                        <p>Qty:</p>
                                        <select onChange={(e) => updateCartItem(product._id, Number(e.target.value))} value={cartItems[String(product._id)] || 1} className="outline-none">
                                     {Array.from(
                                     { length: Math.max(9, cartItems[String(product._id)] || 1) },
                                     (_, i) => (
                                    <option key={i} value={i + 1}>
                                      {i + 1}
                                    </option>
                                    ))}
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{country === "AE" ? `AED ${convertINRtoAED(product?.price) * product.quantity}` : `₹${product?.price * product.quantity}`}</p>
                        <button onClick={(e) => removeItem(product._id, e)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6'/>
                        </button>
                    </div>
                     ))) : (
                      <p className="text-gray-500 text-center my-10">
                       No items in the cart
                      </p>
                    )}
                <button onClick={()=>{navigate('/products'); scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className='group-hover:-translate-x-1 transition'/>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2 w-full">

  {/* Selected Address or Add Address Box */}
  <div className="text-gray-500 w-full">
    {selectedAddress ? (
      <p>
        {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}
      </p>
    ) : (
      <div className="bg-white border border-gray-300 text-sm w-full">
        <p
          onClick={() => navigate('/add-address')}
          className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
        >
          Add address
        </p>
      </div>
    )}
  </div>

  {/* Change button */}
  {selectedAddress && (
    <button
      onClick={() => setShowAddress(!showAddress)}
      className="text-primary hover:underline cursor-pointer ml-2"
    >
      Change
    </button>
  )}

  {/* Dropdown List */}
  {showAddress && (
    <div className="absolute top-8 left-0 bg-white border border-gray-300 text-sm w-full  z-10">
      {addresses.map((address, index) => (
        <p
          key={index}
          onClick={() => {
            setSelectedAddress(address);
            setShowAddress(false);
          }}
          className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
        >
          {address.street}, {address.city}, {address.state}, {address.country}
        </p>
      ))}

      <p
        onClick={() => navigate('/add-address')}
        className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10 border-t"
      >
        Add address
      </p>
    </div>
  )}
</div>


                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        {/*<option value="Online">Online Payment</option>*/}
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{country === "AE" ? 'AED ' : '₹'}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-primary-dull">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{country === "AE" ? 'AED ' : '₹'}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{country === "AE" ? 'AED ' : '₹'}{Math.round(getCartAmount() + (getCartAmount() * 2) / 100)}.00</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                   {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) 
}

export default Cart
