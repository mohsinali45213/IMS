import "../Styles/PopUP.css";
const AddBrand = () => {
  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container">
        <form>
          <h2>Add New Brand</h2>
          <label>Brand Name</label>
          <input type="text" placeholder="Brand Name" />
          <div className="button-container">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit">Add Brand</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddBrand