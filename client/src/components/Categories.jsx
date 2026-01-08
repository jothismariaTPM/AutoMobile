import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Categories = () => {
  const { navigate, axios, backend } = useAppContext();
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/product/user/category');
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [axios]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
   <div id="categories" className="mt-16">
  <p className="text-2xl md:text-3xl font-medium mb-4">Categories</p>

  {/* Wrapper */}
  <div className="relative">

    {/* Left Arrow */}
    <button
      onClick={scrollLeft}
      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                  shadow-md p-2 rounded-full bg-gray-100"
    >
      <ChevronLeft size={22} />
    </button>

     <button
      onClick={scrollLeft}
      className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 
                  shadow-md p-2 rounded-full bg-gray-100"
    >
      <ChevronLeft size={16} />
    </button>

    {/* Scroll Area */}
    <div
      ref={scrollRef}
      className="overflow-x-auto no-scrollbar"
    >
      <div className="flex gap-6 py-2 whitespace-nowrap px-10">
        {categories.map((category) => {
          const safeCategory = String(category.path || category.name || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

          return (
            <div
              key={category._id || category.name}
              className="flex-none w-32 cursor-pointer px-3 py-1 rounded-lg 
                         flex flex-col items-center bg-[#E1F5EC]"
              onClick={() => {
                navigate(`/products/${safeCategory}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={`${backend}${category.image}`}
                alt={category.name}
                className="transition hover:scale-105 max-w-21"
              />
             <p className="text-sm font-medium text-center break-words whitespace-normal"> {category.name} </p>

            </div>
          );
        })}
      </div>
    </div>

    {/* Right Arrow */}
    <button
      onClick={scrollRight}
      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                  shadow-md p-2 rounded-full bg-gray-100"
    >
      <ChevronRight size={22} />
    </button>
     {/* Right Arrow mobile*/}
    <button
      onClick={scrollRight}
      className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 
                  shadow-md p-2 rounded-full bg-gray-100"
    >
      <ChevronRight size={16} />
    </button>
  </div>
</div>

  );
};

export default Categories;
