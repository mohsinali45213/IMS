import "../Styles/Products.css";
import {
  MdOutlineRemoveRedEye,
  MdDeleteOutline,
  MdAddCircleOutline,
} from "react-icons/md";
import AddSubCategory from "../Components/AddSubCategory";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
const SubCategory = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Sub Category</h2>
          <h3>Manage your sub categories</h3>
        </div>
        <button onClick={handleToggle}>
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Category</span>
        </button>
      </div>
      <div className="products-items">
        <table>
          <tr>
            <div>
              <input type="searchItem" placeholder="Search categories..." />
            </div>
            <div>
              <select>
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
            <th>Sub Category</th>
            <th>Category</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {Array.from({ length: 100 }).map((_, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>Sub Category {index + 1}</td>
              <td>Category {index + 1}</td>
              <td>Slug-{index + 1}</td>
              <td style={{ color: Math.random() > 0.5 ? "green" : "red" }}>
                {Math.random() > 0.5 ? "Active" : "Inactive"}
              </td>

              <td>
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

      {toggle && <AddSubCategory handleToggle={handleToggle} />}
    </div>
  );
};

export default SubCategory;
