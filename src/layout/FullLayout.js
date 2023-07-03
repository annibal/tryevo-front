import { Outlet } from "react-router-dom";

const FullLayout = () => {
  return (
    <div className="full">
      <Outlet />
    </div>
  );
}

export default FullLayout;
