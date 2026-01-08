import React from "react";
import { brandLogos } from "../assets/assets";

const CompanyLogo = () => {
  return (
    <section className="bg-white py-24 px-2">
      <p className="text-2xl md:text-4xl text-center font-semibold mb-14">brands we trust</p>
      <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-8">
        {brandLogos.map((brand, index) => (
          <div
            key={index}
            className="w-26 h-26 bg-gray-100 rounded-full flex items-center justify-center
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            title={brand.name}
          >
            <img
              src={brand.icon}
              alt={brand.name}
              className="w-16 h-16 object-contain"
            />
          </div>
        ))}
      </div>

      
    </section>
  );
};

export default CompanyLogo;
