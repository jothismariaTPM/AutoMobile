import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const HERO_IMAGES = [
  assets.car_main,
  assets.hero1,
  assets.hero2,
  assets.hero3,
  assets.hero4,
  assets.hero5,
  assets.hero6,
]


const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={HERO_IMAGES[currentIndex]}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
     {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center text-white md:items-start justify-end md:justify-center  pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
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
        <img src={assets.white_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1'/>
        </Link>
    </div>
      </div>

    </div>
  )
}

export default MainBanner
