import "../Styles/Products.css";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
// import AddCategory from "../Components/AddCategory";
import AddSubCategory from "../Components/AddSubCategory";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API;

const SubCategory = () => {
  const [toggle, setToggle] = useState(false);
  // const [subCategory, setSubCategories] = useState<any>([]);
  const [subCategory, setSubCategories] = useState<
    {
      id: string;
      name: string;
      slug: string;
      status: string;
      categoryId: string;
    }[]
  >([]);
  const [editData, setEditData] = useState<{
    id: string;
    name: string;
    status: string;
    categoryId: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
    setEditData(null);
  };

  // get subategory data
  const getSubCategories = async () => {
    try {
      const res = await axios.get(`${API}/subcategory`);
      const data = res.data?.data || [];
      setSubCategories(data);
      console.log(API);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };
  useEffect(() => {
    getSubCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`${API}/subcategory/${id}`);
      await getSubCategories();
    } catch (error) {
      console.log("Delete category fail");
    }
  };

  const createOrUpdateSubCategory = async ({
    id,
    name,
    status,
    categoryId,
  }: {
    id?: string;  
    name: string;
    status: string;
    categoryId: string;
  }) => {
    try {
      if (id) {
        await axios.put(`${API}/subcategory/${id}`, {
          name,
          status,
          categoryId,
        });
      } else {
        await axios.post(`${API}/subcategory`, {
          name,
          status,
          categoryId,
        });
      }
      await getSubCategories();
    } catch (error) {
      console.error(
        id ? "Failed to update subcategory" : "Failed to create subcategory",
        error
      );
    }
  };

  const filteredCategories = subCategory
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
          <h2>Sub Category</h2>
          <h3>Manage your sub categories</h3>
        </div>
        <button onClick={handleToggle}>
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Sub Category</span>
        </button>
      </div>
      {/* {filteredCategories.length === 0 ? (
        <div className="no-category-row">
          <span
            className="icon"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            📂
          </span>
          <span style={{ color: "#f60", fontSize: "25px" }}>
            No sub categories found
          </span>
        </div>
      ) : ( */}

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
            <th>SubCategory</th>
            <th>Category</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

          {subCategory.length === 0 ? (
            <div className="no-category-row">
              <span
                className="icon"
                style={{ fontSize: "3rem", marginBottom: "1rem" }}
              >
                📂
              </span>
              <span style={{ color: "#f60", fontSize: "25px" }}>
                No sub categories in database
              </span>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="no-category-row">
              <span
                className="icon"
                style={{ fontSize: "3rem", marginBottom: "1rem" }}
              >
                🔍
              </span>
              <span style={{ color: "#999", fontSize: "20px" }}>
                No matching results for your search or filter
              </span>
            </div>
          ) : (
            <div>
              {filteredCategories.map((data: any) => (
                <tr key={data.id}>
                  <td>{data.name.toUpperCase()}</td>
                  <td>{data.category.name.toUpperCase()}</td>
                  <td>{data.slug.toUpperCase()}</td>
                  <td
                    style={{
                      color: data.status === "active" ? "green" : "red",
                    }}
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
                          categoryId: data.categoryId,
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
            </div>
          )}
        </table>
      </div>
      {toggle && (
        <AddSubCategory
          handleToggle={handleToggle}
          functions={createOrUpdateSubCategory}
          editData={editData}
        />
      )}
    </div>
  );
};

export default SubCategory;
