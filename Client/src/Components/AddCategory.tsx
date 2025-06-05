import React, { useEffect, useRef, useState } from "react";
import "../Styles/PopUP.css";

type AddCategoryProps = {
  handleToggle: () => void;
  functions: (params: { name: string; status: string; id?: string }) => void;
  editData?: { id: string; name: string; status: string } | null;
};

const AddCategory: React.FC<AddCategoryProps> = ({
  handleToggle,
  functions,
  editData,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("active");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editData) {
      setCategoryName(editData.name);
      setCategoryStatus(editData.status || "active");
    } else {
      setCategoryName("");
      setCategoryStatus("active");
    }
    inputRef.current?.focus();
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      functions({
        name: categoryName.trim(),
        status: categoryStatus,
        id: editData?.id,
      });
      handleToggle();
    }
  };

  return (
    <div className="modern-popup-backdrop">
      <div className="modern-popup">
        <form onSubmit={handleSubmit} className="modern-form">
          <h2>{editData ? "✏️ Edit Category" : "📂 Add New Category"}</h2>

          <div className="input-wrapper">
            <label htmlFor="categoryName">Category Name</label>
            <input
              ref={inputRef}
              id="categoryName"
              type="text"
              placeholder="e.g. Perfumes"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="categoryStatus">Status</label>
            <select
              id="categoryStatus"
              value={categoryStatus}
              className="modern-select"
              onChange={(e) => setCategoryStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel" onClick={handleToggle}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit"
              disabled={!categoryName.trim()}
            >
              {editData ? "Update" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
