// import "../Styles/PopUP.css";
// const AddSubCategory = ({handleToggle}:any) => {
//   return (
//     <div className="pop-up-wrapper">
//       <div className="pop-up-container">
//         <form>
//           <h2>Add New Sub-Category</h2>
//           <label>Sub-Category Name</label>
//           <input type="text" placeholder="Sub-Category Name" />
//           <label>Category</label>
//           <select name="Category" id="">
//             <option value="">Select Category</option>
//             <option value="category1">Category 1</option>
//             <option value="category2">Category 2</option>
//             <option value="category3">Category 3</option>
//           </select>
//           <div className="button-container">
//             <button type="button" className="cancel-button" onClick={handleToggle}>
//               Cancel
//             </button>
//             <button type="submit" onClick={handleToggle}>Add Sub Category</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AddSubCategory


import "../Styles/PopUP.css";

const AddSubCategory = ({ handleToggle }: any) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleToggle(); // You can extend this to capture form data
  };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">🧩 Add New Sub-Category</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Sub-Category Name</label>
              <input type="text" placeholder="Enter sub-category name" required />
            </div>

            <div className="form-group">
              <label>Parent Category</label>
              <select name="category" required>
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleToggle}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Sub-Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
