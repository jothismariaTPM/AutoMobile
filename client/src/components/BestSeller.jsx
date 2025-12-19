import React from 'react'
import ProductCart from './ProductCart'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const BestSeller = () => {
  const {products,country} = useAppContext();
  //console.log("products: ",products)
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 md:gap-6  mt-6'>
          {products.filter((product)=> product.inStock).slice(0,5).map((product,index)=>(
               <ProductCart key={index} product={product}/>
          ))}
      <Link to="/products" className="group sm:hidden flex items-center justify-center gap-2 mx-auto cursor-pointer text-center">
      <span className="transition-transform duration-300 group-hover:scale-105">
       Explore more
      </span>
     <img src={assets.black_arrow_icon} alt="arrow" className="transition-transform duration-300 group-hover:scale-110"/>
     </Link>
        </div>
    </div>
  )
}

export default BestSeller