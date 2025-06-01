// import "../Styles/PopUP.css";
// const AddProduct = ({ toggle }: any) => {
//   return (
//     <div className="pop-up-wrapper">
//       <div className="pop-up-container">
//         <form>
//           <h2>Add New Product</h2>
//           <label>Product Name</label>
//           <input type="text" placeholder="Product Name" />
//           <label>Category</label>
//           <input type="text" placeholder="Category" />
//           <label>Brand</label>
//           <select name="brand" id="">
//             <option value="">Select Brand</option>
//             <option value="brand1">Brand 1</option>
//             <option value="brand2">Brand 2</option>
//             <option value="brand3">Brand 3</option>
//           </select>
//           <div className="button-container">
//             <button type="button" className="cancel-button" onClick={() => toggle(false)}>
//               Cancel
//             </button>
//             <button type="submit" onClick={() => toggle(false)}>Add Product</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default AddProduct;


import { useState } from "react";
import "../Styles/PopUP.css";

const AddProduct = ({ toggle }: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageCancel = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // logic here
    toggle(false);
  };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">➕ Add New Product</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" placeholder="Enter product name" required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input type="text" placeholder="Enter category" required />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select name="brand" required>
                <option value="">Select Brand</option>
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
                <option value="brand3">Brand 3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="preview" />
                  <button type="button" onClick={handleImageCancel}>
                    ❌ Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={() => toggle(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
