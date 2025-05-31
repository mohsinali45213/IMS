import { Route, Routes } from "react-router-dom";
import Header from "../Pages/Header";
import SlideBar from "../Pages/SlideBar";
import "../Styles/Main.css";
import Products from "../Pages/Products";

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
            {/* <Route path="/users" element={<Users />} /> */}

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Main;
