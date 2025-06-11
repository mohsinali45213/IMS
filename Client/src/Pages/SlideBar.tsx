import { RxDashboard } from "react-icons/rx";
import { IoCubeOutline } from "react-icons/io5";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
import { LuLayoutList,LuScanBarcode  } from "react-icons/lu";
import { BsViewList } from "react-icons/bs";
import { TbBrandAdobe } from "react-icons/tb";
import { GoStack } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiUserSquare } from "react-icons/pi";

import "../Styles/SlideBar.css"
import { Link, NavLink } from "react-router-dom";
const SlideBar = () => {
  return (
    <div className="slideBarContainer">
      <ul className="slideBarList">
        <h3 className="main-bar">main</h3>
        <li><NavLink className="li" to="/"><span><RxDashboard /></span><span>Dashboard</span></NavLink></li>
        <h3 className="main-bar">Inventory</h3>
        <li><NavLink className="li" to="/products"><span><IoCubeOutline /></span><span>Products</span></NavLink></li>
        {/* <li><NavLink className="li" to="/create-product"><span><MdOutlineCreateNewFolder /></span><span>Create Product</span></NavLink></li> */}
        <li><NavLink className="li" to="/categories"><span><LuLayoutList /></span><span>Category</span></NavLink></li>
        <li><NavLink className="li" to="/sub-categories"><span><BsViewList /></span><span>Sub Category</span></NavLink></li>
        <li><NavLink className="li" to="/brand"><span><TbBrandAdobe /></span><span>Brand</span></NavLink></li>
        <li><NavLink className="li" to="/print-barcode"><span><LuScanBarcode /></span><span>Print Barcode</span></NavLink></li>
        <h3 className="main-bar">Stock</h3>
        <li><NavLink className="li" to="/manage-stock"><span><GoStack /></span><span>Manage Stock</span></NavLink></li>
        <li><NavLink className="li" to="/invoice"><span><LiaFileInvoiceSolid /></span><span>Invoice</span></NavLink></li>
        <li><NavLink className="li" to="/sales-reports"><span><RxDashboard /></span><span>Sales Reports</span></NavLink></li>
        <h3 className="main-bar">Peoples</h3>
        <li><NavLink className="li" to="/users"><span><PiUserSquare /></span><span>Users</span></NavLink></li>
      </ul>
    </div>
  );
}

export default SlideBar;