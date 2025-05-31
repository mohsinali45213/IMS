import "../Styles/Products.css";
import {
  MdOutlineRemoveRedEye,
  MdDeleteOutline,
  MdAddCircleOutline,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const Products = () => {
  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Product List</h2>
          <h3>Manage your products</h3>
        </div>
        <button>
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Product</span>
        </button>
      </div>
      <div className="products-items">
        <table>
          <tr>
            <td>
              <input type="search" placeholder="Search products..." />
            </td>
            <td>Product</td>
            <td>Category</td>
            <td>Brand</td>
            <td>Sort</td>
          </tr>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>SKU</th>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
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
              <td>${(Math.random() * 100).toFixed(2)}</td>
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
    </div>
  );
};

export default Products;
