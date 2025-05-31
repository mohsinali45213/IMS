import "../Styles/PopUP.css";
const AddProduct = ({ toggle }: any) => {
  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container">
        <form>
          <h2>Add New Product</h2>
          <label>Product Name</label>
          <input type="text" placeholder="Product Name" />
          <label>Category</label>
          <input type="text" placeholder="Category" />
          <label>Brand</label>
          <select name="brand" id="">
            <option value="">Select Brand</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
          </select>
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={() => toggle(false)}>
              Cancel
            </button>
            <button type="submit" onClick={() => toggle(false)}>Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
