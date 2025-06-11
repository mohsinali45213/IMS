import "../Styles/Dashbord.css";

const lowStockItems = [
  { name: "Fantasy Perfume 50ml", stock: 3 },
  { name: "Mirage 100ml", stock: 5 },
  { name: "Nightmare 30ml", stock: 2 },
  { name: "Ocean Breeze 75ml", stock: 4 },
];

const LowStockAlert = () => {
  return (
    <div className="low-stock-container">
      <h3 className="low-stock-title">Low Stock Alerts</h3>
      <ul className="low-stock-list">
        {lowStockItems.map((item, index) => (
          <li key={index} className="low-stock-item">
            <span className="product-name">{item.name}</span>
            <span className="stock-tag">{item.stock} left</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockAlert;
