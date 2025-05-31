// import React from 'react';


// import "../Styles/PopUP.css";

// const AddBrand = ({ handleToggle,createBrand }: any) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleToggle(); // You can handle form data here if needed
//   };

//   return (
//     <div className="pop-up-wrapper">
//       <div className="pop-up-container premium">
//         <form onSubmit={handleSubmit}>
//           <h2 className="form-title">📂 Add New Brand</h2>

//           <div className="form-grid">
//             <div className="form-group">
//               <label>Brand Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter brand name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="button-container">
//             <button
//               type="button"
//               className="cancel-button"
//               onClick={handleToggle}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="submit-button">
//               Add Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBrand;



import React, { useState } from 'react';

import "../Styles/PopUP.css";

type AddBrandProps = {
  handleToggle: () => void;
  functions: (params: { name: string }) => void;
};

const AddBrand: React.FC<AddBrandProps> = ({ handleToggle, functions }) => {
  const [brandName, setBrandName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim()) {
      functions({ name: brandName });
      setBrandName("");
      handleToggle();
    }
  };

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up-container premium">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">📂 Add New Brand</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Brand Name</label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleToggle}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;