
import React, { useEffect, useState } from "react";
import "../Styles/PopUP.css";

type AddBrandProps = {
  handleToggle: () => void;
  functions: (params: { name: string; id?: string }) => void;
  editData?: { id: string; name: string } | null;
};

const AddBrand: React.FC<AddBrandProps> = ({ handleToggle, functions, editData }) => {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (editData) {
      setBrandName(editData.name);
    }
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim()) {
      if (editData) {
        functions({ name: brandName, id: editData.id });
      } else {
        functions({ name: brandName });
      }
      setBrandName("");
      handleToggle();
    }
  };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">
            {editData ? "✏️ Edit Brand" : "📂 Add New Brand"}
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Brand Name</label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setBrandName("");
                handleToggle();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {editData ? "Update Brand" : "Add Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
