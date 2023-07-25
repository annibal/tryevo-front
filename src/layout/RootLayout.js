import { Outlet } from "react-router-dom";
import "../style/index.css";
import "../style/loader-try-evo.css";

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
