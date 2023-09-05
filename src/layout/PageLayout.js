import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Sidebar/Navbar";
import { Container } from "@mui/material";

const PageLayout = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <Navbar />
      <Container className="content" maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
}

export default PageLayout;
