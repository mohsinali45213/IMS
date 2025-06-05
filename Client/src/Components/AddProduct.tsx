// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../Styles/PopUP.css";

// const API = import.meta.env.VITE_API;

// const AddProduct = ({ toggle }: any) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [allSubCategories, setAllSubCategories] = useState([]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleImageCancel = () => {
//     setImage(null);
//     setPreview(null);
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/category`);
//       setCategories(res.data.data || []);
//       console.log(res.data.data);
//     } catch (error) {
//       console.error("Failed to fetch categories", error);
//     }
//   };

//   const fetchSubCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/subcategory`);
//       setAllSubCategories(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch subcategories", error);
//     }
//   };
//   const filteredSubCategories = allSubCategories.filter(
//     (sub: any) => sub.categoryId === selectedCategory
//   );

//   const fetchBrands = async () => {
//     try {
//       const res = await axios.get(`${API}/brands`);
//       setBrands(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch brands", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchSubCategories();
//       setSelectedSubCategory(""); // Reset subcategory on category change
//     }
//   }, [selectedCategory]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Submit logic with FormData goes here
//     toggle(false);
//   };

//   return (
//     <div className="add-product-backdrop">
//       <div className="add-product-popup">
//         <form onSubmit={handleSubmit} className="add-product-form">
//           <h2>➕ Add New Product</h2>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Product Name</label>
//               <input type="text" placeholder="Enter product name" required />
//             </div>

//             <div className="form-group">
//               <label>Category</label>
//               <select
//                 required
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat: any) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Subcategory</label>
//               {/* <select
//                 required
//                 value={selectedSubCategory}
//                 onChange={(e) => setSelectedSubCategory(e.target.value)}
//                 disabled={!selectedCategory}
//               >
//                 <option value="">Select Subcategory</option>
//                 {subCategories.map((sub: any) => (
//                   <option key={sub.id} value={sub.id}>
//                     {sub.name}
//                   </option>
//                 ))}
//               </select> */}

//               <select
//                 required
//                 value={selectedSubCategory}
//                 onChange={(e) => setSelectedSubCategory(e.target.value)}
//                 disabled={!selectedCategory}
//               >
//                 <option value="">Select Subcategory</option>
//                 {filteredSubCategories.map((sub: any) => (
//                   <option key={sub.id} value={sub.id}>
//                     {sub.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Brand</label>
//               <select required>
//                 <option value="">Select Brand</option>
//                 {brands.map((brand: any) => (
//                   <option key={brand.id} value={brand.id}>
//                     {brand.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-group image-row">
//             <div>
//               {/* <label>Product Image</label> */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//             {preview && (
//               <div className="image-preview">
//                 <img src={preview} alt="Preview" />
//                 <button type="button" onClick={handleImageCancel}>
//                   ❌ Remove
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={() => toggle(false)}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="submit-btn">
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../Styles/PopUP.css";

// const API = import.meta.env.VITE_API;

// const AddProduct = ({ toggle, createOrUpdateProduct }: any) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [productName, setProductName] = useState("");
//   const [allSubCategories, setAllSubCategories] = useState([]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleImageCancel = () => {
//     setImage(null);
//     setPreview(null);
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/category`);
//       setCategories(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch categories", error);
//     }
//   };

//   const fetchSubCategories = async () => {
//     try {
//       const res = await axios.get(`${API}/subcategory`);
//       setAllSubCategories(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch subcategories", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const res = await axios.get(`${API}/brands`);
//       setBrands(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch brands", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchSubCategories();
//       setSelectedSubCategory(""); // reset sub
//     }
//   }, [selectedCategory]);

//   const filteredSubCategories = allSubCategories.filter(
//     (sub: any) => sub.categoryId === selectedCategory
//   );

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (
//   //     !productName ||
//   //     !selectedCategory ||
//   //     !selectedSubCategory ||
//   //     !selectedBrand
//   //   ) {
//   //     alert("Please fill all fields.");
//   //     return;
//   //   }

//   //   await handleAdd({
//   //     name: productName,
//   //     categoryId: selectedCategory,
//   //     subCategoryId: selectedSubCategory,
//   //     brandId: selectedBrand,
//   //     image: image,
//   //   });

//   //   toggle(false); // close modal
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !productName ||
//       !selectedCategory ||
//       !selectedSubCategory ||
//       !selectedBrand
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }

//     await createOrUpdateProduct({
//       name: productName,
//       categoryId: selectedCategory,
//       subCategoryId: selectedSubCategory,
//       brandId: selectedBrand,
//       image: image,
//     });

//     toggle(false); // close modal
//   };

//   return (
//     <div className="add-product-backdrop">
//       <div className="add-product-popup">
//         <form onSubmit={handleSubmit} className="add-product-form">
//           <h2>➕ Add New Product</h2>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Product Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter product name"
//                 required
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Category</label>
//               <select
//                 required
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat: any) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Subcategory</label>
//               <select
//                 required
//                 value={selectedSubCategory}
//                 onChange={(e) => setSelectedSubCategory(e.target.value)}
//                 disabled={!selectedCategory}
//               >
//                 <option value="">Select Subcategory</option>
//                 {filteredSubCategories.map((sub: any) => (
//                   <option key={sub.id} value={sub.id}>
//                     {sub.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Brand</label>
//               <select
//                 required
//                 value={selectedBrand}
//                 onChange={(e) => setSelectedBrand(e.target.value)}
//               >
//                 <option value="">Select Brand</option>
//                 {brands.map((brand: any) => (
//                   <option key={brand.id} value={brand.id}>
//                     {brand.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-group image-row">
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//             {preview && (
//               <div className="image-preview">
//                 <img src={preview} alt="Preview" />
//                 <button type="button" onClick={handleImageCancel}>
//                   ❌ Remove
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="form-actions">
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={() => toggle(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="submit"
//               disabled={!productName.trim()}
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/PopUP.css";

const API = import.meta.env.VITE_API;

const AddProduct = ({
  toggle,
  createOrUpdateProduct,
  editData,
}: {
  toggle: (val: boolean) => void;
  createOrUpdateProduct: (data: {
    id?: string;
    name: string;
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    image: File | null;
  }) => Promise<void>;
  editData: any | null;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [allSubCategories, setAllSubCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories();
      setSelectedSubCategory("");
    }
  }, [selectedCategory]);

  // Populate form if editData exists
  useEffect(() => {
    if (editData) {
      setProductName(editData.name);
      setSelectedCategory(editData.subCategory.category.id);
      setSelectedSubCategory(editData.subCategory.id);
      setSelectedBrand(editData.brand.id);
      if (editData.imageUrl) {
        setPreview(editData.imageUrl); // assuming server sends imageUrl
        setImage(null); // reset file input
      }
    } else {
      resetForm();
    }
  }, [editData]);

  const resetForm = () => {
    setProductName("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedBrand("");
    setImage(null);
    setPreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageCancel = () => {
    setImage(null);
    setPreview(null);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`);
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${API}/subcategory`);
      setAllSubCategories(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${API}/brands`);
      setBrands(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  const filteredSubCategories = allSubCategories.filter(
    (sub) => sub.categoryId === selectedCategory
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productName ||
      !selectedCategory ||
      !selectedSubCategory ||
      !selectedBrand
    ) {
      alert("Please fill all fields.");
      return;
    }

    await createOrUpdateProduct({
      id: editData?.id,
      name: productName,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      brandId: selectedBrand,
      image: image,
    });

    toggle(false);
    resetForm();
  };

  return (
    <div className="add-product-backdrop">
      <div className="add-product-popup">
        <form onSubmit={handleSubmit} className="add-product-form">
          <h2>{editData ? "✏️ Edit Product" : "➕ Add New Product"}</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subcategory</label>
              <select
                required
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {filteredSubCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                required
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group image-row">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button type="button" onClick={handleImageCancel}>
                  ❌ Remove
                </button>
              </div>
            )}
          </div>

          <div className=" action-buttons ">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => toggle(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit"
              disabled={!productName.trim()}
            >
              {editData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
