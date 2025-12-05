import React from "react";
import { Wrench } from "lucide-react";
import { assets } from '../assets/assets.js';
const UnderMaintenance = () => {
   return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">

      {/* Content Wrapper */}
      <div className=" w-full flex flex-col md:flex-row items-center gap-12">

        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          {/*<h1 className="text-5xl font-bold text-gray-900 mb-4">Oops!</h1>*/}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Under Construction
          </h2>

          <p className="text-gray-600 max-w-md">
            We're working behind the cart to serve you better.
          </p>

          <p className="text-gray-600 max-w-md mb-6">
            Stay tuned — your automobile spare products are almost back online.
          </p>

         <button onClick={() => window.open("https://www.facebook.com/profile.php?id=61583701505050", "_blank")} className="bg-[#2d4cc8] text-white px-6 py-3 rounded-full shadow hover:bg-[#1e38a6] transition">
           More Info
         </button>

        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.underconstruction}
            alt="Under Construction Illustration"
            className="w-full h-full"
          />
        </div>

      </div>

     
    </div>
  );
};

export default UnderMaintenance;
