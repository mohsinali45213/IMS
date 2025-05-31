import "../Styles/CreateProduct.css";

const CreateProduct = () => {
  return (
    <div className="create-product-container">
      <div className="header-section">
        <h2>Create Product</h2>
        <p className="subtitle">Fill in the details to add a new product to your inventory.</p>
      </div>

      <form className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" placeholder="Enter product name" required />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input type="text" placeholder="Stock Keeping Unit" required />
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
            <input type="number" placeholder="0.00" min="0" required />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" placeholder="Available quantity" min="0" required />
          </div>

          <div className="form-group">
            <label>Size</label>
            <select name="size" id="">
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Create Product</button>
          <button type="reset" className="cancel-button">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
