import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const AddProduct = () => {
   const [files,setFiles] = useState([]);

   const [name,setName] = useState('');
   const [description,setDescription] = useState('');
   const [price,setPrice] = useState('');
   const [partNumber, setPartNumber] = useState("");
   const [programming, setProgramming] = useState("");
   const [carModel, setCarModel] = useState("");
   const [compatibleModels, setCompatibleModels] = useState("");

   // Optional
  const [category, setCategory] = useState("");
  const [compatiblePartNumber, setCompatiblePartNumber] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [packagingDetails, setPackagingDetails] = useState("");
  const [warranty, setWarranty] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [condition, setCondition] = useState("New");
  const [testingVideo, setTestingVideo] = useState(null);


   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);


   const {axios} = useAppContext();

   useEffect(() => {
    const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/product/category');
      if (data.success) {
        console.log("categories: ",data.categories)
        setCategories(data.categories); // Correct field
      }
     } catch (error) {
      console.log(error);
    }
   };

  fetchCategories();
}, []); // <-- very important


   const onSubmitHandler = async(event) => {
    event.preventDefault();

    if (loading) return; // block duplicate submit
    setLoading(true);

    try{
        const productData = {
            name,
            description: description.split('\n'),
            price,
            category,
            partNumber,
            programming,
            carModel,
            compatibleModels,

            // Optional fields
            compatiblePartNumber,
            productBrand,
            packagingDetails,
            warranty,
            deliveryTime,
            condition
        }

        const formData = new FormData();
        formData.append('productData',JSON.stringify(productData));
        //images
        for(let i=0; i<files.length; i++){
          formData.append('images',files[i])
        }
        // video
        if (testingVideo) {
          formData.append('testingVideo', testingVideo);
        }
        const {data} = await axios.post('/api/product/add',formData)
        if(data.success){
            toast.success(data.message)
            resetFields();
        }else{
          toast.error(data.message)
        }
    }catch(error){
       toast.error(error.message)
    }
   setLoading(false);
   }

   const resetFields = () => {
    setName("");
    setDescription("");
    setPrice("");
    setFiles([]);
    setCategory("");
    setPartNumber("");
    setProgramming("");
    setCarModel("");
    setCompatibleModels("");
    setCompatiblePartNumber("");
    setProductBrand("");
    setPackagingDetails("");
    setWarranty("");
    setDeliveryTime("");
    setCondition("");
  };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e)=>{const updatedFiles = [...files]; updatedFiles[index] = e.target.files[0]; setFiles(updatedFiles)}} type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                {/* Row: Name + Price */}
        <div className="flex gap-5 flex-wrap">
          <Input label="Product Name" value={name} setter={setName} required />
          <Input label="Product Price" value={price} setter={setPrice} type="number" required />
        </div>

        {/* Description */}
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border resize-none" placeholder="Type here"></textarea>
                </div>

        {/* Category + Car Model */}
        <div className="flex gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none py-2 px-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Input label="Car Model" value={carModel} setter={setCarModel} required />
        </div>

         {/* Part Number */}
         <div className="flex flex-col gap-1">
          <label className="font-medium">Part Number</label>
          <textarea
            rows={3}
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            className="outline-none py-2 px-3 border rounded resize-none"
          ></textarea>
        </div>
         
         {/*  Programming */}
        <div className="flex gap-5 flex-wrap">
          <Input label="Programming" value={programming} setter={setProgramming} />
        </div>

        {/* Compatible Models + Compatible Part Number 
        <div className="flex gap-5 flex-wrap">
          <Input label="Compatible Models" value={compatibleModels} setter={setCompatibleModels} />
          <Input label="Compatible Part Number" value={compatiblePartNumber} setter={setCompatiblePartNumber} />
        </div> */}

        {/* Compatible Models + Compatible Part Number */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Compatible Models</label>
          <textarea
            rows={3}
            value={compatibleModels}
            onChange={(e) => setCompatibleModels(e.target.value)}
            className="outline-none py-2 px-3 border rounded resize-none"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Compatible Part Number</label>
          <textarea
            rows={3}
            value={compatiblePartNumber}
            onChange={(e) => setCompatiblePartNumber(e.target.value)}
            className="outline-none py-2 px-3 border rounded resize-none"
          ></textarea>
        </div>

         {/* Condition */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border px-3 py-2 mt-2 outline-none rounded">
             <option value="New">New</option>
             <option value="Used">Used</option>
             <option value="Refurbished">Refurbished</option>
          </select>
        </div>

        {/* Brand + Packaging */}
         <div className="flex gap-5 flex-wrap">
          <Input label="Product Brand" value={productBrand} setter={setProductBrand} />
          <Input label="Packaging Details" value={packagingDetails} setter={setPackagingDetails} />
        </div>

        {/* Warranty + Delivery Time */}
        <div className="flex gap-5 flex-wrap">
          <Input label="Warranty" value={warranty} setter={setWarranty} />
          <Input label="Delivery Time" value={deliveryTime} setter={setDeliveryTime} />
        </div>
        {/* ----------- Testing Video Upload ----------- */}
<div className="mt-4">
  <p className="text-base font-medium">Testing Video</p>

  <label htmlFor="testingVideo" className="cursor-pointer">

    <input
      onChange={(e) => setTestingVideo(e.target.files[0])}
      type="file"
      id="testingVideo"
      accept="video/*"
      hidden
    />

    {/* Preview: show video if selected, else show upload image */}
    <div className="py-2 rounded w-42 h-24 flex items-center justify-center">

      {testingVideo ? (
        <video
          src={URL.createObjectURL(testingVideo)}
          className="w-full h-full object-cover rounded"
          controls
        />
      ) : (
        <img
          className="w-28 h-24 object-contain opacity-70"
          src={assets.upload_area}
          alt="uploadArea"
        />
      )}

    </div>
  </label>
</div>






                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">
                     {loading ? (
                      <>
                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                       <circle className="opacity-25" cx="12" cy="12" r="10" />
                       <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" />
                     </svg>
                     </>
                    ) : (
                    "ADD"
                  )}
                </button>
            </form>
        </div>
    );
}

// Reusable input component
const Input = ({ label, value, setter, type = "text", required }) => (
  <div className="flex flex-col gap-1 flex-1">
    <label className="font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setter(e.target.value)}
      required={required}
      className="outline-none py-2 px-3 border rounded"
    />
  </div>
);

export default AddProduct
