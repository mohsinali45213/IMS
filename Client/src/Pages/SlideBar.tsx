import { RxDashboard } from "react-icons/rx";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { LuLayoutList,LuScanBarcode  } from "react-icons/lu";
import { BsViewList } from "react-icons/bs";
import { TbBrandAdobe } from "react-icons/tb";
import { GoStack } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";

import "../Styles/SlideBar.css"
import { Link } from "react-router-dom";
const SlideBar = () => {
  return (
    <div className="slideBarContainer">
      <ul className="slideBarList">
        <li><Link className="li" to="/"><span><RxDashboard /></span><span>Dashboard</span></Link></li>
        <li><Link className="li" to="/products"><span><IoCubeOutline /></span><span>Products</span></Link></li>
        <li><Link className="li" to="/create-product"><span><MdOutlineCreateNewFolder /></span><span>Create Product</span></Link></li>
        <li><Link className="li" to="/category"><span><LuLayoutList /></span><span>Category</span></Link></li>
        <li><Link className="li" to="/sub-category"><span><BsViewList /></span><span>Sub Category</span></Link></li>
        <li><Link className="li" to="/brand"><span><TbBrandAdobe /></span><span>Brand</span></Link></li>
        <li><Link className="li" to="/print-barcode"><span><LuScanBarcode /></span><span>Print Barcode</span></Link></li>
        <li><Link className="li" to="/manage-stock"><span><GoStack /></span><span>Manage Stock</span></Link></li>
        <li><Link className="li" to="/invoice"><span><LiaFileInvoiceSolid /></span><span>Invoice</span></Link></li>
        <li><Link className="li" to="/sales-reports"><span><RxDashboard /></span><span>Sales Reports</span></Link></li>
      </ul>
    </div>
  );
}

export default SlideBar;