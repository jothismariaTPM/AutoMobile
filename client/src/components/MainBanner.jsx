import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative ">
      {/* Banner Image */}
      <img
        src={assets.car_main}
        alt="banner"
        className="w-full object-cover hidden md:block"
      />

      <img
        src={assets.car_main}
        alt="banner"
        className="w-full object-cover h-[60vh]  sm:h-[70vh] lg:h-[80vh] md:hidden"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center  pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
          Where your vehicle gets the care it deserves! 
        </h1>

        <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
        Shop now
        <img src={assets.white_arrow_icon} alt="arrow" className='md:hidden transition group-focus:translate-x-1'/>
        </Link>
         <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
         Explore deals
        <img src={assets.black_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1'/>
        </Link>
    </div>
      </div>
    </div>
  )
}

export default MainBanner
