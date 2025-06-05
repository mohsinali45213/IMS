// import "../Styles/Products.css";
// import {
//   MdOutlineRemoveRedEye,
//   MdDeleteOutline,
//   MdAddCircleOutline,
// } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import AddProduct from "../Components/AddProduct";
// import axios from "axios";

// const API = import.meta.env.VITE_API;

// const Products = () => {
//   const [toggle, setToggle] = useState(false);
//   const [product, setProduct] = useState<any>([]);
//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   // get products
//   const getProduct = async () => {
//     try {
//       const data = await axios.get(`${API}/products`);
//       const res = data.data?.data || [];
//       setProduct(res);
//       console.log(res);
//     } catch (error) {
//       console.log("Product not found");
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, []);

//   // delete product

//   const deleteProduct = async (id: string) => {
//     try {
//       await axios.delete(`${API}/products/${id}`);
//       await getProduct();
//       // alert("Brand deleted successfully");
//     } catch (error) {
//       console.log("Delete branch fail");
//     }
//   };

//   // update product createOrUpdateProduct

//   const createOrUpdateProduct = async ({
//     id,
//     name,
//     categoryId,
//     subCategoryId,
//     brandId,
//     image, // File object
//   }: {
//     id?: string; // Optional for create
//     name: string;
//     categoryId: string;
//     subCategoryId: string;
//     brandId: string;
//     image: File | null;
//   }) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("categoryId", categoryId);
//       formData.append("subCategoryId", subCategoryId);
//       formData.append("brandId", brandId);
//       // Send array as string
//       if (image) {
//         formData.append("image", image); // Actual file
//       }

//       if (id) {
//         await axios.put(`${API}/products/${id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post(`${API}/products`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       await getProduct(); // refresh after save
//     } catch (error) {
//       console.error(
//         id ? "Failed to update product" : "Failed to create product",
//         error
//       );
//     }
//   };

//   return (
//     <div className="products-container">
//       <div className="title">
//         <div>
//           <h2>Product List</h2>
//           <h3>Manage your products</h3>
//         </div>
//         <button onClick={handleToggle} className="add-product-button">
//           <span>
//             <MdAddCircleOutline />
//           </span>
//           <span>Add New Product</span>
//         </button>
//       </div>
//       <div className="products-items">
//         <table>
//           <tr>
//             <div>
//               <input type="searchItem" placeholder="Search products..." />
//             </div>
//             <div>
//               <select>
//                 <option value="">Product</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="furniture">Furniture</option>
//                 <option value="clothing">Clothing</option>
//               </select>
//               <select>
//                 <option value="">Brand</option>
//                 <option value="brand1">Brand 1</option>
//                 <option value="brand2">Brand 2</option>
//                 <option value="brand3">Brand 3</option>
//               </select>
//               <select>
//                 <option value="">Category</option>
//                 <option value="category1">Category 1</option>
//                 <option value="category2">Category 2</option>
//                 <option value="category3">Category 3</option>
//               </select>
//               <select>
//                 <option value="">Sort</option>
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="name-asc">Name: A to Z</option>
//                 <option value="name-desc">Name: Z to A</option>
//               </select>
//             </div>
//           </tr>
//           <tr>
//             <th>Product</th>
//             <th>Slug</th>
//             <th>Category</th>
//             <th>SubCategory</th>
//             <th>Brand</th>

//             <th>Actions</th>
//           </tr>

//           {product.map((data: any) => (
//             <tr key={data.id}>
//               <td>{data.name.toUpperCase()}</td>
//               <td>{data.slug.toUpperCase()}</td>
//               <td>{data.subCategory.category.name.toUpperCase()}</td>
//               <td>{data.subCategory.name.toUpperCase()}</td>
//               <td>{data.brand.name.toUpperCase()}</td>

//               <td>
//                 <button className="view-button">
//                   <MdOutlineRemoveRedEye />
//                 </button>
//                 <button className="edit-button">
//                   <FaRegEdit />
//                 </button>
//                 <button
//                   className="delete-button"
//                   onClick={() => deleteProduct(data.id)}
//                 >
//                   <MdDeleteOutline />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </table>
//       </div>

//       {/* {toggle && <AddProduct toggle={handleToggle} functions={createOrUpdateSubCategory}
//           editData={editData}
//         /> />} */}

//       <AddProduct toggle={handleToggle} handleAdd={createOrUpdateProduct} />
//     </div>
//   );
// };

// export default Products;

import "../Styles/Products.css";
import {
  MdOutlineRemoveRedEye,
  MdDeleteOutline,
  MdAddCircleOutline,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddProduct from "../Components/AddProduct";
import axios from "axios";

const API = import.meta.env.VITE_API;

const Products = () => {
  const [toggle, setToggle] = useState(false);
  const [product, setProduct] = useState<any[]>([]);
  const [editData, setEditData] = useState<any | null>(null);

  const handleToggle = () => {
    setToggle(!toggle);
    setEditData(null); // Clear edit when toggling
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${API}/products`);
      setProduct(data?.data || []);
    } catch (error) {
      console.log("Product not found", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API}/products/${id}`);
      await getProduct();
    } catch (error) {
      console.log("Delete product failed", error);
    }
  };

  const createOrUpdateProduct = async ({
    id,
    name,
    // categoryId,
    subCategoryId,
    brandId,
    image,
  }: {
    id?: string;
    name: string;
    // categoryId: string;
    subCategoryId: string;
    brandId: string;
    image: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      // formData.append("categoryId", categoryId);
      formData.append("subCategoryId", subCategoryId);
      formData.append("brandId", brandId);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await axios.put(`${API}/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(API);
      } else {
        await axios.post(`${API}/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await getProduct();
      setToggle(false);
      setEditData(null);
    } catch (error) {
      console.error(
        id ? "Failed to update product" : "Failed to create product",
        error
      );
    }
  };

  // Edit handler to open modal with data
  const handleEdit = (prod: any) => {
    setEditData(prod);
    setToggle(true);
  };

  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Product List</h2>
          <h3>Manage your products</h3>
        </div>
        <button onClick={handleToggle} className="add-product-button">
          <MdAddCircleOutline />
          Add New Product
        </button>
      </div>

      {/* Filters & search outside table */}
      <div className="filters">
        <input type="search" placeholder="Search products..." />
        <select>
          <option value="">Product</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </select>
        <select>
          <option value="">Brand</option>
          <option value="brand1">Brand 1</option>
          <option value="brand2">Brand 2</option>
          <option value="brand3">Brand 3</option>
        </select>
        <select>
          <option value="">Category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        <select>
          <option value="">Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      <div className="products-items">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Slug</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((data: any) => (
              <tr key={data.id}>
                <td>{data.name.toUpperCase()}</td>
                <td>{data.slug.toUpperCase()}</td>
                <td>{data.subCategory.category.name.toUpperCase()}</td>
                <td>{data.subCategory.name.toUpperCase()}</td>
                <td>{data.brand.name.toUpperCase()}</td>
                <td>
                  <button className="view-button" title="View">
                    <MdOutlineRemoveRedEye />
                  </button>
                  <button
                    className="edit-button"
                    title="Edit"
                    onClick={() => handleEdit(data)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="delete-button"
                    title="Delete"
                    onClick={() => deleteProduct(data.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggle && (
        <AddProduct
          toggle={setToggle}
          createOrUpdateProduct={createOrUpdateProduct}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Products;
