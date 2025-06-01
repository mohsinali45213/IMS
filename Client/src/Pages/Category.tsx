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
  const [editData, setEditData] = useState<{ id: string; name: string } | null>(null);

  const handleToggle = () => {
    setToggle(!toggle);
    setEditData(null);
  };

  const getCategory = async () => {
    try {
      const data = await axios.get(`${API}/category`);
      const res = data.data?.data || [];
      setCategory(res);
      // console.log(res);
    } catch (error) {
      console.log("Product not found");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);




  // delete category

  const deleteCategory = async(id:string) =>{
    try {
      await axios.delete(`${API}/category/${id}`)
      await getCategory()
    } catch (error) {
      console.log("Delete category fail");
      
    }
  }


  //createOrUpdateBrand
    const createOrUpdateCategory = async ({ name, id }: { name: string; id?: string }) => {
  try {
    if (id) {
      // Update existing brand
      await axios.put(`${API}/category/${id}`, { name });
    } else {
      // Create new brand
      await axios.post(`${API}/category`, { name });
    }
    await getCategory();
  } catch (error) {
    console.error(id ? "Failed to update category" : "Failed to create category", error);
  }
};




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
            <th>Category</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {category.map((data:any) => (
            <tr key={data.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td style={{color:data.status=="active" ? "green" : "red" }}>
                {data.status}
              </td>

              <td>
                <button className="edit-button"  onClick={() => {
    setCategory({ id: data.id, name: data.name });
    setToggle(true);
  }}>
                  <FaRegEdit />
                </button>
                <button className="delete-button" onClick={()=>deleteCategory(data.id)}>
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      {toggle && <AddCategory handleToggle={handleToggle} functions={createOrUpdateCategory}
    editData={editData}/>}
    </div>
  );
};

export default Category;
