import { Outlet } from "react-router-dom";
import '../style/index.css'

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
