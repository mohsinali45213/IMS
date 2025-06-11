// import "../Styles/Dashbord.css";

// const trending = [
//   {
//     id: 1,
//     name: "Ocean Breeze Perfume",
//     category: "Men",
//     sales: 430,
//     image: "../../public/img1.jpg", // replace with real image
//   },
//   {
//     id: 2,
//     name: "Floral Mist",
//     category: "Women",
//     sales: 390,
//     image: "../../public/img2.jpg",
//   },
//   {
//     id: 3,
//     name: "Citrus Spark",
//     category: "Unisex",
//     sales: 320,
//     image: "../../public/img3.jpg",
//   },
// ];

// const TrendingProducts = () => {
//   return (
//     <div className="trending-container">
//       <h3 className="trending-title">🔥 Top Selling Product</h3>
//       <ul className="trending-list">
//         {trending.map((item) => (
//           <li key={item.id} className="trending-card">
//             <img src={item.image} alt={item.name} className="product-img" />
//             <div className="product-details">
//               <h4>{item.name}</h4>
//               <p>{item.category}</p>
//             </div>
//             <span className="sales-count">{item.sales} sold</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TrendingProducts;



import "../Styles/Dashbord.css";

const trendingProducts = [
  {
    id: 1,
    name: "Ocean Breeze Perfume",
    unitsSold: 430,
    revenue: 86000,
  },
  {
    id: 2,
    name: "Floral Mist",
    unitsSold: 390,
    revenue: 78000,
  },
  {
    id: 3,
    name: "Citrus Spark",
    unitsSold: 320,
    revenue: 64000,
  },
  {
    id: 3,
    name: "Citrus Spark",
    unitsSold: 320,
    revenue: 64000,
  },
  {
    id: 3,
    name: "Citrus Spark",
    unitsSold: 320,
    revenue: 64000,
  },
];

const TrendingProducts = () => {
  return (
    <div className="trending-products-container">
      <h3 className="trending-products-title">🔥 Trending Products</h3>
      <div className="trending-products-header">
        <span>Product Name</span>
        <span>Units Sold</span>
        <span>Revenue</span>
      </div>
      <ul className="trending-products-list">
        {trendingProducts.map((product) => (
          <li key={product.id} className="trending-product-row">
            <span>{product.name}</span>
            <span>{product.unitsSold}</span>
            <span>₹{product.revenue.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingProducts;
