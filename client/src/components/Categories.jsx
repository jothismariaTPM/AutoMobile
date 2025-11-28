import React,{useState,useEffect} from 'react'
//import { categories } from '../assets/assets'
import {useAppContext} from '../context/AppContext'

const Categories = () => {
  const {navigate,axios} = useAppContext();
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/product/user/category');
        if (data.success) {
          //console.log("categories: ",data.categories)
          setCategories(data.categories); // Correct field
        }
       } catch (error) {
        console.log(error);
      }
     };
  
    fetchCategories();
  }, []);

  return (
    <div className="mt-16 overflow-x-auto no-scrollbar">
  <p className="text-2xl md:text-3xl font-medium">Categories</p>

  <div 
    className="flex gap-6 mt-3 py-2"
    style={{ whiteSpace: "nowrap" }}
  >
    {categories.map((category, index) => (
      <div
        key={index}
        className="flex-none w-32 group cursor-pointer px-3 py-1 gap-2 rounded-lg flex flex-col justify-center items-center"
        style={{ backgroundColor: "#E1F5EC" }}
        onClick={() => {
           const safeCategory = String(category.path.toLowerCase() || "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
          navigate(`/products/${safeCategory}`);
          scrollTo(0, 0);
        }}
      >
        <img
          src={category.image}
          alt={category.text}
          className="group-hover:scale-108 transition max-w-21"
        />
       <p className="text-sm font-medium text-center break-words whitespace-normal">
  {category.name}
</p>

      </div>
    ))}
  </div>
</div>

  )
}

export default Categories