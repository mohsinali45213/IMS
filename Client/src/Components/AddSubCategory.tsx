// import React, { useRef, useEffect, useState } from "react";
// import "../Styles/PopUP.css";
// import axios from "axios";
// const API = import.meta.env.VITE_API;
// type AddSubCategoryProps = {
//   handleToggle: () => void;
// };

// const AddSubCategory: React.FC<AddSubCategoryProps> = ({ handleToggle }) => {
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [status, setStatus] = useState("active");
//   const [category, setCategory] = useState<any>([]);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setSubCategoryName("");
//     setSelectedCategory("");
//     setStatus("active");
//     inputRef.current?.focus();
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleToggle(); // Placeholder only
//   };

//   // get category data
//   const getCategory = async () => {
//     try {
//       const data = await axios.get(`${API}/category`);
//       const res = data.data?.data || [];
//       setCategory(res);
//     } catch (error) {
//       console.log("Product not found");
//     }
//   };

//   useEffect(() => {
//     getCategory();
//   }, []);

//   return (
//     <div className="modern-popup-backdrop">
//       <div className="modern-popup">
//         <form onSubmit={handleSubmit} className="modern-form">
//           <h2>🧩 Add New Sub-Category</h2>

//           <div className="input-wrapper">
//             <label htmlFor="subCategoryName">Sub-Category Name</label>
//             <input
//               ref={inputRef}
//               id="subCategoryName"
//               type="text"
//               placeholder="e.g. Body Mist"
//               value={subCategoryName}
//               onChange={(e) => setSubCategoryName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-wrapper">
//             <label htmlFor="parentCategory">Category</label>
//             <select
//               id="parentCategory"
//               className="modern-select"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               required
//             >
//               <option value="">Select Category</option>
//               {category.map((cat: any) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="input-wrapper">
//             <label htmlFor="status">Status</label>
//             <select
//               id="status"
//               className="modern-select"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="action-buttons">
//             <button type="button" className="cancel" onClick={handleToggle}>
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="submit"
//               disabled={!subCategoryName.trim() || !selectedCategory}
//             >
//               Add Sub-Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;

// import React, { useEffect, useRef, useState } from "react";
// import "../Styles/PopUP.css";

// type AddCategoryProps = {
//   handleToggle: () => void;
//   functions: (params: { name: string; id?: string }) => void;
//   editData?: { id: string; name: string } | null;
// };

// const AddCategory: React.FC<AddCategoryProps> = ({
//   handleToggle,
//   functions,
//   editData,
// }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (editData) {
//       setCategoryName(editData.name);
//     } else {
//       setCategoryName("");
//     }
//     inputRef.current?.focus();
//   }, [editData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (categoryName.trim()) {
//       functions({
//         name: categoryName.trim(),
//         id: editData?.id,
//       });
//       handleToggle();
//     }
//   };

//   return (
//     <div className="modern-popup-backdrop">
//       <div className="modern-popup">
//         <form onSubmit={handleSubmit} className="modern-form">
//           <h2>{editData ? "✏️ Edit Category" : "📂 Add New Category"}</h2>

//           <div className="input-wrapper">
//             <label htmlFor="categoryName">Category Name</label>
//             <input
//               ref={inputRef}
//               id="categoryName"
//               type="text"
//               placeholder="e.g. Perfumes"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="action-buttons">
//             <button type="button" className="cancel" onClick={handleToggle}>
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="submit"
//               disabled={!categoryName.trim()}
//             >
//               {editData ? "Update" : "Add Category"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useEffect, useRef, useState } from "react";
import "../Styles/PopUP.css";
import axios from "axios";
const API = import.meta.env.VITE_API;
type AddSubCategoryProps = {
  handleToggle: () => void;
  functions: (params: {
    id?: string;
    name: string;
    status: string;
    categoryId: string;
  }) => void;
  editData?: {
    id: string;
    name: string;
    status: string;
    categoryId: string;
  } | null;
};

const AddSubCategory: React.FC<AddSubCategoryProps> = ({
  handleToggle,
  functions,
  editData,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("active");
  const [categoryId, setCategoryId] = useState<any>([]);
  // const [selectedCategory, setSelectedCategory] = useState<any>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<any>([]);

  useEffect(() => {
    if (editData) {
      setCategoryName(editData.name);
      setCategoryStatus(editData.status || "active");
      setCategoryId(editData.categoryId || "");
    } else {
      setCategoryName("");
      setCategoryStatus("active");
      setCategoryId("");
    }
    inputRef.current?.focus();
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      functions({
        name: categoryName.trim(),
        status: categoryStatus,
        categoryId: categoryId,
        id: editData?.id,
      });
      handleToggle();
    }
  };

  //   // get category data
  const getCategory = async () => {
    try {
      const data = await axios.get(`${API}/category`);
      const res = data.data?.data || [];
      setCategory(res);
    } catch (error) {
      console.log("Product not found");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="modern-popup-backdrop">
      <div className="modern-popup">
        <form onSubmit={handleSubmit} className="modern-form">
          <h2>{editData ? "✏️ Edit Category" : "📂 Add New Category"}</h2>

          <div className="input-wrapper">
            <label htmlFor="categoryName">Category Name</label>
            <input
              ref={inputRef}
              id="categoryName"
              type="text"
              placeholder="e.g. Perfumes"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="parentCategory">Category</label>
            <select
              id="parentCategory"
              className="modern-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {category.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <label htmlFor="categoryStatus">Status</label>
            <select
              id="categoryStatus"
              value={categoryStatus}
              className="modern-select"
              onChange={(e) => setCategoryStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel" onClick={handleToggle}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit"
              disabled={!categoryName.trim()}
            >
              {editData ? "Update" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
