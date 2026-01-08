import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate, axios, backend } = useAppContext();
  const [categories, setCategories] = useState([]);

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

  return (
    <div id="categories" className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 mt-3 py-2 whitespace-nowrap">
          {categories.map((category) => {
            const safeCategory = String(category.path || category.name || "")
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");

            return (
              <div
                key={category._id || category.name}
                className="flex-none w-32 group cursor-pointer px-3 py-1 gap-2 rounded-lg flex flex-col justify-center items-center bg-[#E1F5EC]"
                onClick={() => {
                  navigate(`/products/${safeCategory}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={`${backend}${category.image}`}
                  alt={category.name}
                  className="group-hover:scale-105 transition max-w-21"
                />
                <p className="text-sm font-medium text-center break-words whitespace-normal">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
