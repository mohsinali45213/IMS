import { useState } from "react";
import "../Styles/InvoiceSection.css";

const InvoicePopup = ({ invoice, mode, onClose, onUpdate }: any) => {
  const [formData, setFormData] = useState(invoice);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{mode === "view" ? "View Invoice" : "Edit Invoice"}</h2>
        <div className="popup-form">
          <label>
            Customer:
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </label>
          <label>
            Total:
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleChange}
              disabled={mode === "view"}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={mode === "view"}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </label>
          <label>
            Payment Method:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              disabled={mode === "view"}
            >
              <option value="online">Online</option>
              <option value="Cash">Cash</option>
             
            </select>
          </label>
        </div>

        <div className="popup-buttons">
          <button onClick={onClose}>Close</button>
          {mode === "edit" && <button onClick={handleSubmit}>Save</button>}
        </div>
      </div>
    </div>
  );
};

export default InvoicePopup;
