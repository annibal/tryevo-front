import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Sidebar/Navbar";

const PageLayout = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PageLayout;
