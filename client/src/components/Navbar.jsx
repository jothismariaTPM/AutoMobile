import React,{useEffect, useState} from 'react'
import {NavLink,useLocation} from 'react-router-dom';
import {assets} from '../assets/assets';
import {useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

const Navbar = () => {
const [open, setOpen] = useState(false);
const {user,setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, getWishlistCount, axios} = useAppContext();

const location = useLocation();
    
const logout = async () => {
    try{
     const {data} = await axios.get('/api/user/logout')
     if(data.success){
      toast.success(data.message)
      setUser(null);
      navigate('/')
      // ✅ Refresh page to reinitialize auth state
      setTimeout(() => {
        window.location.reload();
      }, 500);
     }else{
        toast.error(data.message)
     }
    }catch(error){
     toast.error(error.message)
    }
}

useEffect(()=>{
  if(searchQuery.length > 0){
    navigate('/products')
  }
},[searchQuery])

const cart = () => {
    if(user){
        navigate("/cart")
    }else{
        toast.error('Login To Access')
    }
}

const wishlist = () => {
    if(user){
        navigate("/wishlist")
    }else{
        toast.error('Login To Access')
    }
}

const handleCategoryClick = () => {
  if (location.pathname !== "/") {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("categories");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  } else {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  }
};

   return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={()=>setOpen(false)}>
               <img src={assets.pullman_logo} alt="Logo" className='w-28 h-12'/>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <button onClick={handleCategoryClick}>Categories</button>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="" className='w-6 h-4'/>
                </div>

                 <div onClick={wishlist} className="relative cursor-pointer">
                    <Heart className='w-6 opacity-80'/>
                    <button className="absolute -top-1 -right-2 text-xs text-white bg-primary w-[16px] h-[16px] rounded-full">{getWishlistCount()}</button>
                </div>

                <div onClick={cart} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="" className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (<button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>) : (
                    <div className='relative group'>
                       <img src={assets.profile_icon} alt="profile" className='w-10'/>
                       <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={()=>navigate("/my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                        <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                       </ul>
                    </div>
                )}
            </div>

          <div className='flex items-center gap-6 sm:hidden'>
             <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="" className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
              <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" className=''/>
            </button>
          </div>

            {/* Mobile Menu */}
           { open && (
                 <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md flex-col items-center gap-3  px-5 py-10 text-md font-medium sm:hidden z-50`}>
                <NavLink to="/" onClick={()=>setOpen(false)} className="block">Home</NavLink>
                <NavLink to="/products" onClick={()=>setOpen(false)} className="block">Products</NavLink>
                {
                user &&  <NavLink to="/wishlist" onClick={()=>setOpen(false)} className="block">My Wishlist</NavLink>
               }
               {
                user &&  <NavLink to="/my-orders" onClick={()=>setOpen(false)} className="block">My Orders</NavLink>
               }
                <NavLink to="/" onClick={()=>setOpen(false)} className="block">Contact</NavLink>
                {!user ? (
                    <button onClick={()=>{setOpen(false); setShowUserLogin(true);}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                      Login
                   </button>
                    ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Logout
                   </button>
                    )
                }
            </div>
            )}
        </nav>
    )
}

export default Navbar
