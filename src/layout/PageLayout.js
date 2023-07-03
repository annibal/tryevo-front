import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const PageLayout = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PageLayout;
