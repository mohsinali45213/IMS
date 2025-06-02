

import "../Styles/Products.css";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
import AddCategory from "../Components/AddCategory";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API;

const Category = () => {
  const [toggle, setToggle] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [editData, setEditData] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
    setEditData(null);
  };

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

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`${API}/category/${id}`);
      await getCategory();
    } catch (error) {
      console.log("Delete category fail");
    }
  };

  const createOrUpdateCategory = async ({
    name,
    status,
    id,
  }: {
    name: string;
    status: string;
    id?: string;
  }) => {
    try {
      if (id) {
        await axios.put(`${API}/category/${id}`, { name, status });
      } else {
        await axios.post(`${API}/category`, { name, status });
      }
      await getCategory();
    } catch (error) {
      console.error(
        id ? "Failed to update category" : "Failed to create category",
        error
      );
    }
  };

  const filteredCategories = category
    .filter((cat: any) => {
      const matchesSearch = cat.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesStatus = statusFilter ? cat.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a: any, b: any) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Category</h2>
          <h3>Manage your categories</h3>
        </div>
        <button onClick={handleToggle}>
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Category</span>
        </button>
      </div>
      {filteredCategories.length === 0 ? (
        <div className="no-category-row">
          <span
            className="icon"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            📂
          </span>
          <span style={{ color: "#f60", fontSize: "25px" }}>
            No categories found
          </span>
        </div>
      ) : (
        <div className="products-items">
          <table>
            <tr>
              <div>
                <input
                  type="search"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </tr>
            <tr>
              <th>Category</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            {filteredCategories.map((data: any) => (
              <tr key={data.id}>
                <td>{data.name.toUpperCase()}</td>
                <td>{data.slug.toUpperCase()}</td>
                <td
                  style={{ color: data.status === "active" ? "green" : "red" }}
                >
                  {data.status.toUpperCase()}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditData({
                        id: data.id,
                        name: data.name,
                        status: data.status,
                      });
                      setToggle(true);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteCategory(data.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {toggle && (
        <AddCategory
          handleToggle={handleToggle}
          functions={createOrUpdateCategory}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Category;
