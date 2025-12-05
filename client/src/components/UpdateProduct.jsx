import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const UpdateProduct = ({ onClose, product }) => {
  const [files, setFiles] = useState([]); // new uploaded files
  const [existingImages, setExistingImages] = useState([]); // old images

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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

  const [existingVideo, setExistingVideo] = useState(null);
  const [testingVideo, setTestingVideo] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  const backend = import.meta.env.VITE_BACKEND_URL;

  //console.log("update product: ",product)

  // ------------------------------------------
  // PREFILL PRODUCT DATA
  // ------------------------------------------
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description?.join("\n") || "");
      setPrice(product.price || "");
      setCategory(product.category._id || "");
      setCarModel(product.carModel || "");
      setPartNumber(product.partNumber || "");
      setProgramming(product.programming || "");
      setCompatibleModels(product.compatibleModels || "");

      setCompatiblePartNumber(product.compatiblePartNumber || "");
      setProductBrand(product.productBrand || "");
      setPackagingDetails(product.packagingDetails || "");
      setWarranty(product.warranty || "");
      setDeliveryTime(product.deliveryTime || "");
      setCondition(product.condition || "New");
    }
  }, [product]);

  useEffect(() => {
  if (product) {
     // Existing Images
    setExistingImages(
      product.image?.map(img => `${backend}${img}`) || []
    );

    
    // Set existing video
    setExistingVideo(
      product.testingVideo ? `${backend}${product.testingVideo}` : null
    );
    }}, [product]);


  console.log("update product: ",product)
  
  // ------------------------------------------
  // FETCH CATEGORIES
  // ------------------------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/product/category");
        if (data.success) setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // ------------------------------------------
  // SUBMIT HANDLER
  // ------------------------------------------
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const productData = {
        _id: product._id,
        name,
        description: description.split("\n"),
        price,
        category,
        partNumber,
        programming,
        carModel,
        compatibleModels,

        compatiblePartNumber,
        productBrand,
        packagingDetails,
        warranty,
        deliveryTime,
        condition,
      };

      console.log("product Data: ",productData)

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      // Add new images only (not mandatory)
      files.forEach((file) => formData.append("images", file));

      // Video update
      if (testingVideo) {
        formData.append("testingVideo", testingVideo);
      }

      console.log("formData: ",formData)

      const { data } = await axios.put("/api/product/update", formData);

      if (data.success) {
        toast.success(data.message);
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-6 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">

        {/* HEADER */}
        <div className="relative flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Update Product</h2>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* SCROLL BOX */}
        <div className="no-scrollbar h-[80vh] overflow-y-scroll">
          <form onSubmit={onSubmitHandler} className="p-4 space-y-5">

            {/* IMAGES */}
            <div>
              <p className="text-base font-medium">Product Image</p>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                {Array(4).fill("").map((_, index) => {
                  const preview =
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : existingImages[index]
                        ? existingImages[index]
                        : assets.upload_area;

                  return (
                    <label key={index} htmlFor={`image${index}`}>
                      <input type="file" id={`image${index}`}  hidden onChange={(e) => { const updated = [...files]; updated[index] = e.target.files[0]; setFiles(updated);}}/>
                      <img className="max-w-24 cursor-pointer" src={preview} alt="upload"/>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* NAME & PRICE */}
            <div className="flex gap-5 flex-wrap">
              <Input label="Product Name" value={name} setter={setName} required />
              <Input label="Product Price" value={price} setter={setPrice} type="number" required />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Product Description</label>
              <textarea
                rows={4}
                className="outline-none py-2 px-3 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* CATEGORY + CAR MODEL */}
            <div className="flex gap-5 flex-wrap">
              <div className="flex-1">
                <label className="font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="outline-none py-2 px-3 border rounded w-full"
                >
                  <option value={product.category._id}>{product.category.name}</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <Input label="Car Model" value={carModel} setter={setCarModel} required />
            </div>

            {/* PART NUMBER + PROGRAMMING */}
            <div className="flex gap-5 flex-wrap">
              <Input label="Part Number" value={partNumber} setter={setPartNumber} />
              <Input label="Programming" value={programming} setter={setProgramming} />
            </div>

            {/* COMPATIBLE */}
            <div className="flex gap-5 flex-wrap">
              <Input label="Compatible Models" value={compatibleModels} setter={setCompatibleModels} />
              <Input label="Compatible Part Number" value={compatiblePartNumber} setter={setCompatiblePartNumber} />
            </div>

            {/* CONDITION */}
            <div>
              <label className="font-medium">Condition</label>
              <select
                className="w-full border px-3 py-2 rounded mt-2"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            {/* BRAND */}
            <Input label="Product Brand" value={productBrand} setter={setProductBrand} />

            {/* PACKAGING */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Packaging Details</label>
              <textarea
                rows={3}
                className="outline-none py-2 px-3 border rounded"
                value={packagingDetails}
                onChange={(e) => setPackagingDetails(e.target.value)}
              ></textarea>
            </div>

            {/* WARRANTY & DELIVERY TIME */}
            <div className="flex gap-5 flex-wrap">
              <Input label="Warranty" value={warranty} setter={setWarranty} />
              <Input label="Delivery Time" value={deliveryTime} setter={setDeliveryTime} />
            </div>

            {/* VIDEO */}
            <div>
              <p className="font-medium">Testing Video</p>

              <label htmlFor="testingVideo" className="cursor-pointer">
                <input
                  type="file"
                  id="testingVideo"
                  accept="video/*"
                  hidden
                  onChange={(e) => setTestingVideo(e.target.files[0])}
                />

                <div className="mt-2 w-42 h-24 flex items-center justify-center border rounded overflow-hidden">
                  {testingVideo ? (
                    <video src={URL.createObjectURL(testingVideo)} className="h-full" controls />
                  ) : existingVideo ? (
                    <video src={existingVideo} className="h-full" controls />
                  ) : (
                    <img src={assets.upload_area} className="opacity-60 w-28" />
                  )}
                </div>
              </label>
            </div>

            {/* BUTTON */}
            <button className="px-8 py-2.5 bg-primary text-white rounded font-medium">
              {loading ? "Updating..." : "UPDATE"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

// REUSABLE INPUT
const Input = ({ label, value, setter, type = "text", required }) => (
  <div className="flex flex-col gap-1 flex-1">
    <label className="font-medium">{label}</label>
    <input
      type={type}
      value={value}
      required={required}
      onChange={(e) => setter(e.target.value)}
      className="outline-none py-2 px-3 border rounded"
    />
  </div>
);

export default UpdateProduct;
