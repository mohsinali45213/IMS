// import "../Styles/PopUP.css";
// const AddCategory = ({ handleToggle }: any) => {
//   return (
//     <div className="pop-up-wrapper">
//       <div className="pop-up-container">
//         <form>
//           <h2>Add New Category</h2>
//           <label>Category Name</label>
//           <input type="text" placeholder="Category Name" />
//           <div className="button-container">
//             <button type="button" className="cancel-button" onClick={handleToggle}>
//               Cancel
//             </button>
//             <button type="submit" onClick={handleToggle}>Add Category</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AddCategory


import { useEffect, useState } from "react";
import "../Styles/PopUP.css";

type AddCategoryProps = {
  handleToggle: () => void;
  functions: (params: { name: string; id?: string }) => void;
  editData?: { id: string; name: string } | null;
};

const AddCategory: React.FC<AddCategoryProps> = ({  handleToggle, functions, editData }: any) => {
  const [categoryName,setCategoryName] = useState("")
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   handleToggle(); // You can handle form data here if needed
  // };

   useEffect(() => {
      if (editData) {
        setCategoryName(editData.name);
      }
    }, [editData]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (categoryName.trim()) {
        if (editData) {
          functions({ name: categoryName, id: editData.id });
        } else {
          functions({ name: categoryName });
        }
        setCategoryName("");
        handleToggle();
      }
    };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">📂 Add New Category</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                required
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleToggle}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
