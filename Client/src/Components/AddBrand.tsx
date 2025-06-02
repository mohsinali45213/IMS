
import React, { useEffect, useRef, useState } from "react";

import "../Styles/PopUP.css";

type AddBrandProps = {
  handleToggle: () => void;
  functions: (params: { name: string; status: string; id?: string }) => void;
  editData?: { id: string; name: string; status: string } | null;
};

const AddBrand: React.FC<AddBrandProps> = ({
  handleToggle,
  functions,
  editData,
}) => {
  const [brandName, setBrandName] = useState("");
  const [brandSelect, setBrandSelect] = useState("active");
  // console.log(brandSelect);
  // console.log(setBrandSelect);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editData) {
      setBrandName(editData.name);
      setBrandSelect(editData.status);
    } else {
      setBrandName("");
      setBrandSelect("");
    }
    inputRef.current?.focus();
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim() || brandSelect) {
      
      functions({
        name: brandName.trim(),
        status: brandSelect,
        id: editData?.id,
      });
      handleToggle();
    }
  };

  return (
    <div className="modern-popup-backdrop">
      <div className="modern-popup">
        <form onSubmit={handleSubmit} className="modern-form">
          <h2>{editData ? "✏️ Edit Brand" : "📁 Add New Brand"}</h2>

          <div className="input-wrapper">
            <label htmlFor="brandName">Brand Name</label>
            <input
              ref={inputRef}
              id="brandName"
              type="text"
              placeholder="e.g. ONIRIQUE"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="status" className="select-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="modern-select"
              value={brandSelect}
              onChange={(e) => setBrandSelect(e.target.value)}
              required
            >
              <option value="">Status</option>
              <option value="active" >Active</option>
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
              disabled={!brandName.trim()}
            >
              {editData ? "Update" : "Add Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;




