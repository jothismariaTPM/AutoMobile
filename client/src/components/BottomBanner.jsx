import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className=" mt-24 bg-green-100/60 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-6 md:pl-20 py-12">
        <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-6">
          Why We Are the Best?
        </h1>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 md:w-11"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2">
        <picture>
          <source media="(min-width:728px)" srcSet={assets.car4} />
          <img
            src={assets.car4}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
    </div>
  )
}

export default BottomBanner
