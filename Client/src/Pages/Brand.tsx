import "../Styles/Products.css";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
// import AddCategory from "../Components/AddCategory";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddBrand from "../Components/AddBrand";
import axios from "axios";
const API = import.meta.env.VITE_API;

const Brand = () => {
  const [toggle, setToggle] = useState(false);
  const [brand, setBrand] = useState<any>();
  const [editData, setEditData] = useState<{ id: string; name: string } | null>(null);

  const deleteBrand = async(id:string) =>{
    try {
      await axios.delete(`${API}/brands/${id}`)
      await getBrands()
    } catch (error) {
      console.log("Delete branch fail");
      
    }
  }

  ///update brand
  const createOrUpdateBrand = async ({ name, id }: { name: string; id?: string }) => {
  try {
    if (id) {
      // Update existing brand
      await axios.put(`${API}/brands/${id}`, { name });
    } else {
      // Create new brand
      await axios.post(`${API}/brands`, { name });
    }
    await getBrands();
  } catch (error) {
    console.error(id ? "Failed to update brand" : "Failed to create brand", error);
  }
};



  // const editBrands = async(name:string,id:string) =>{
  //   try {
  //     await axios.put(`${API}/brands/${id}`)
  //   } catch (error) {
  //     console.log("Edit branch fail");
      
  //   }
  // }
  const getBrands = async () => {
    try {
      const res = await axios.get(`${API}/brands`);
      const fetchedBrands = res.data?.data || [];
      setBrand(fetchedBrands);
      // console.log(fetchedBrands);
      
    } catch (error) {
      console.error("Failed to fetch brands", error);
      setBrand([]); // fallback
    }
  };
  useEffect(()=>{
    getBrands()
  },[])
  const handleToggle = () => {
  setToggle(!toggle);
  setEditData(null); // clear edit mode
};

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
            <th>Brand</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {brand?.map((data:any) => (
            <tr key={data.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{data.name.toUpperCase()}</td>
              <td>{data.slug}</td>
              <td style={{ color:data.status == "active" ? "green" : "red" }}>
                {data.status.toUpperCase()}
              </td>

              <td>
                {/* <button className="edit-button"  onClick={(e) => console.log("fbvjhfbv")}>
                  <FaRegEdit />
                </button> */}
                <button
  className="edit-button"
  onClick={() => {
    setEditData({ id: data.id, name: data.name });
    setToggle(true);
  }}
>
  <FaRegEdit />
</button>
                
                <button className="delete-button"  onClick={()=>deleteBrand(data.id)}>
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      {/* {toggle && (
        <AddBrand handleToggle={handleToggle} functions={createBrand} />
      )} */}
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
