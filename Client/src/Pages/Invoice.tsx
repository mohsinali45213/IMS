import { useState } from "react";
import InvoicePopup from "../Components/InvoicePopup";
import "../Styles/InvoiceSection.css";

const initialInvoices = [
  {
    id: "INV001",
    customer: "John Doe",
    date: "2025-06-10",
    total: 3450,
    status: "Paid",
    paymentMethod: "Online",
  },
  {
    id: "INV002",
    customer: "Jane Smith",
    date: "2025-06-09",
    total: 2199,
    status: "Pending",
    paymentMethod: "Cash",
  },
  // add more if needed
];

const Invoice = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [popup, setPopup] = useState({ open: false, invoice: null, mode: "" });

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handleUpdate = (updatedInvoice: any) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
    setPopup({ open: false, invoice: null, mode: "" });
  };

  const openPopup = (invoice: any, mode: "edit" | "view") => {
    setPopup({ open: true, invoice, mode });
  };

  const closePopup = () => {
    setPopup({ open: false, invoice: null, mode: "" });
  };

  return (
    <div className="invoice-container">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="invoice-card">
          <div className="invoice-info">
            <p>{invoice.id}</p>
            <p>{invoice.customer}</p>
            <p>{invoice.date}</p>
            <p>₹{invoice.total.toLocaleString()}</p>
            <span
              className={`payment-tag ${invoice.paymentMethod
                .replace(/\s/g, "-")
                .toLowerCase()}`}
            >
              {invoice.paymentMethod}
            </span>
            <span className={`status-tag ${invoice.status.toLowerCase()}`}>
              {invoice.status}
            </span>
          </div>
          <div className="invoice-actions">
            <button onClick={() => openPopup(invoice, "view")}>View</button>
            <button onClick={() => openPopup(invoice, "edit")}>Edit</button>
            <button onClick={() => handleDelete(invoice.id)}>Delete</button>
          </div>
        </div>
      ))}

      {popup.open && (
        <InvoicePopup
          invoice={popup.invoice}
          mode={popup.mode}
          onClose={closePopup}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Invoice;
