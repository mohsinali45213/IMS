// import { CiSearch } from "react-icons/ci";
import StockDes from "../Components/StockDes";
import "../Styles/Dashbord.css"
import OrderSummaryChart from "../Components/OrderSummaryChart";
import TrendingProducts from "../Components/TrendingProducts";
import LowStockAlert from "../Components/LowStockAlert";




const Dashbord = () => {
  return (
    <>
      <div className="dashboard">
        <div className="toppart">
          <h2>Dashboard</h2>
          <div className="topSearch">
            <input type="text" placeholder="Search..." />
            {/* <span>
              <CiSearch />
            </span> */}
          </div>
        </div>

        <div className="stockdata">
          <h1 className="DashWelcome">Wellcome To Dashboard </h1>
          <StockDes
            stockdec="Total Products"
            stockno="45000"
            tag="6.5%"
            stockdays=" from last week"
          />
          <StockDes
            stockdec="Available Stock"
            stockno="2,137"
            tag="-6.24%"
            stockdays="from last week"
          />
          <StockDes
            stockdec="Low Stock"
            stockno="1,958"
            tag="+1.53%"
            stockdays="from last week"
          />
          <StockDes
            stockdec="Out of Stock"
            stockno="803"
            tag="-1.24%"
            stockdays="from last week"
          />
        </div>
        <div className="summary-cards">
          <OrderSummaryChart />
          <TrendingProducts/>
        </div>
        <div className="lowStock">
          <LowStockAlert />
        </div>
      </div>
    </>
  );
};

export default Dashbord;
