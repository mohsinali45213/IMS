import "../Styles/Products.css";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
// import AddCategory from "../Components/AddCategory";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddBrand from "../Components/AddBrand";
import axios from "axios";
const API = import.meta.env.VITE_API;
// const API_KEY = import.meta.env.VITE_API_KEY;

const Brand = () => {
  const [toggle, setToggle] = useState(false);
  const [brand, setBrand] = useState<any>();
  const [editData, setEditData] = useState<{
    id: string;
    name: string;
    status: string
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const deleteBrand = async (id: string) => {
    try {
      await axios.delete(`${API}/brands/${id}`);
      await getBrands();
      // alert("Brand deleted successfully");
    } catch (error) {
      console.log("Delete branch fail");
    }
  };

  ///update brand
  const createOrUpdateBrand = async ({
    name,
    status,
    id,
  }: {
    name: string;
    status: string;
    id?: string;
    }) => {
    try {
      console.log(status);
      
      if (id) {
        // Update existing brand
        await axios.put(`${API}/brands/${id}`, { name, status });
      } else {
        // Create new brand
        await axios.post(`${API}/brands`, { name, status });
      }
      await getBrands();
    } catch (error) {
      console.error(
        id ? "Failed to update brand" : "Failed to create brand",
        error
      );
    }
  };

  const getBrands = async () => {
    try {
      const res = await axios.get(`${API}/brands`);
      const fetchedBrands = res.data?.data || [];
      setBrand(fetchedBrands);
      console.log(API);
    } catch (error) {
      console.error("Failed to fetch brands", error);
      setBrand([]); // fallback
    }
  };
  useEffect(() => {
    getBrands();
  }, []);
  const handleToggle = () => {
    setToggle(!toggle);
    setEditData(null); // clear edit mode
  };

  const filteredBrands = (brand ?? [])
    .filter((b: any) => {
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? b.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a: any, b: any) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "status-asc") return a.status.localeCompare(b.status);
      if (sortOption === "status-desc") return b.status.localeCompare(a.status);
      return 0;
    });



  return (
    <div className="products-container">
      <div className="title">
        <div>
          <h2>Brands</h2>
          <h3>Manage your Brands</h3>
        </div>
        <button onClick={handleToggle}>
          <span>
            <MdAddCircleOutline />
          </span>
          <span>Add New Brand</span>
        </button>
      </div>


      <div className="products-items">
        <table>
          <tr>
            <div>
              <input
                type="searchItem"
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
            <th>Brand</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

          {filteredBrands.length === 0 ? (
            <div className="no-category-row">
              <span
                className="icon"
                style={{
                  fontSize: "3rem",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                📂
              </span>
              <span style={{ color: "#f60", fontSize: "25px" }}>
                No Brands found
              </span>
            </div>
          ) : (
            <div>
              {brand
                .filter((b: any) => {
                  const matchesSearch =
                    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.slug.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesStatus = statusFilter
                    ? b.status === statusFilter
                    : true;
                  return matchesSearch && matchesStatus;
                })
                .sort((a: any, b: any) => {
                  if (sortOption === "name-asc")
                    return a.name.localeCompare(b.name);
                  if (sortOption === "name-desc")
                    return b.name.localeCompare(a.name);
                  if (sortOption === "status-asc")
                    return a.status.localeCompare(b.status);
                  if (sortOption === "status-desc")
                    return b.status.localeCompare(a.status);
                  return 0;
                })
                .map((data: any) => (
                  <tr key={data.id}>
                    <td>{data.name.toUpperCase()}</td>
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
                            status: data.status,
                          });
                          setToggle(true);
                        }}
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteBrand(data.id)}
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
        <AddBrand
          handleToggle={handleToggle}
          functions={createOrUpdateBrand}
          editData={editData}
        />
      )}
    </div>
  );
 

};

export default Brand;
