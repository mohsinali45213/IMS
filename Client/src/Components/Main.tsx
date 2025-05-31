import { Route, Routes } from "react-router-dom";
import Header from "../Pages/Header";
import SlideBar from "../Pages/SlideBar";
import "../Styles/Main.css";
import Products from "../Pages/Products";
import Category from "../Pages/Category";
import SubCategory from "../Pages/SubCategory";
import ManageStock from "../Pages/ManageStock";
import Brand from "../Pages/Brand";
import Users from "../Pages/Users";
// import CreateProduct from "../Pages/CreateProduct";

const Main = () => {
  return (
    <div className="container">
      <div className="slideBar">
        <SlideBar />
      </div>
      <div className="body">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/sub-categories" element={<SubCategory />} />
            <Route path="/manage-stock" element={<ManageStock />} />  
            {/* <Route path="/create-product" element={<CreateProduct />} /> */}
            <Route path="/brand" element={<Brand />} />
            {/* <Route path="/print-barcode" element={<PrintBarcode />} /> */}
            {/* <Route path="/invoice" element={<Invoice />} /> */}
            {/* <Route path="/sales-reports" element={<SalesReports />} /> */}
            <Route path="/users" element={<Users />} />

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Main;
