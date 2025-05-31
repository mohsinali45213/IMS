import "../Styles/PopUP.css";

const Addmanagestock = ({ handleToggle }: any) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleToggle(false);
    // Submit logic here
  };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">🛒 Add New Product</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>SKU</label>
              <input type="text" placeholder="SKU Code" required />
            </div>

            <div className="form-group">
              <label>Product</label>
              <input type="text" placeholder="Product ID" required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select required>
                <option value="">Select Category</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select required>
                <option value="">Select Brand</option>
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input type="text" placeholder="Price" required />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input type="text" placeholder="Stock Quantity" required />
            </div>

            <div className="form-group">
              <label>Size</label>
              <select name="size" id="">
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleToggle}>
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

export default Addmanagestock;

