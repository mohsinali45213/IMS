// import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
// import "../Styles/Dashbord.css";

// const orderData = [
//   { Category: "Man", orders: 1200 },
//   { Category: "Woman", orders: 1674 },
//   { Category: "child", orders: 1900 },
//   // { day: "Wed", orders: 1450 },
// ];

// const OrderSummaryPremium = () => {
//   return (
//     <div className="order-summary-container premium" style={{ width: "48%" }}>
//       <h3 className="order-summary-heading">Sell By Category</h3>
//       <ResponsiveContainer width="100%" height={200}>
//         <BarChart data={orderData}>
//           <XAxis dataKey="Category" stroke="#888" fontSize={12} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#000",
//               borderRadius: "8px",
//               border: "none",
//               color: "#fff",
//             }}
//             labelStyle={{ color: "#fff", fontWeight: "bold" }}
//             formatter={(value: number) => `$${value}`}
//           />
//           <Bar
//             dataKey="orders"
//             radius={[12, 12, 0, 0]}
//             fill="#ff9651"
//             barSize={50}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default OrderSummaryPremium;



import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../Styles/Dashbord.css";

const orderData = [
  { Category: "Men", orders: 1200 },
  { Category: "Women", orders: 1674 },
  { Category: "Children", orders: 1900 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "10px 15px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#333",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0 }}>{payload[0].name}</p>
        <p style={{ margin: 0, color: "#4badeb" }}>{payload[0].value} Orders</p>
      </div>
    );
  }
  return null;
};

const OrderSummaryPremium = () => {
  return (
    <div className="order-summary-glass">
      <h3 className="order-summary-title">Sales by Category</h3>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={orderData} barCategoryGap="25%">
          <XAxis
            dataKey="Category"
            stroke="#aaa"
            fontSize={13}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="orders"
            radius={[10, 10, 0, 0]}
            fill="#4badeb"
            barSize={45}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderSummaryPremium;
