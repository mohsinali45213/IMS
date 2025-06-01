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
  const [product,setProduct]  = useState<any>([])
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const getProducts = async() =>{
    try {
      const data = await axios.get(`${API}/products`)
      setProduct(data.data)
      console.log(data.data);
      
    } catch (error) {
      console.log("Product not found");
      
    }
  }

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Product List</h2>
          <h3>Manage your products</h3>
        </div>
        <button onClick={handleToggle} className="add-product-button">
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Product</span>
        </button>
      </div>
      <div className="products-items">
        <table>
          <tr>
            <div>
              <input type="searchItem" placeholder="Search products..." />
            </div>
            <div>
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
          </tr>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>SKU</th>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            {/* <th>Price</th> */}
            <th>Stock</th>
            <th>Actions</th>
          </tr>
          {Array.from({ length: 100 }).map((_, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>SKU-{index + 1}</td>
              <td>Product {index + 1}</td>
              <td>Category {index + 1}</td>
              <td>Brand {index + 1}</td>
              {/* <td>${(Math.random() * 100).toFixed(2)}</td> */}
              <td>{Math.floor(Math.random() * 100)}</td>
              <td>
                <button className="view-button">
                  <MdOutlineRemoveRedEye />
                </button>
                <button className="edit-button">
                  <FaRegEdit />
                </button>
                <button className="delete-button">
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {toggle && <AddProduct toggle={handleToggle} />}
    </div>
  );
};

export default Products;
