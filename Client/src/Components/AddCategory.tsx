import "../Styles/PopUP.css";
const AddCategory = ({ handleToggle }: any) => {
  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container">
        <form>
          <h2>Add New Category</h2>
          <label>Category Name</label>
          <input type="text" placeholder="Category Name" />
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleToggle}>
              Cancel
            </button>
            <button type="submit" onClick={handleToggle}>Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCategory