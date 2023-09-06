import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Sidebar/Navbar";
import { Container } from "@mui/material";
import SideToolbar from "../components/Sidebar/SideToolbar";
import { useState } from "react";

const PageLayout = () => {
  const [sideToolbarOpen, setSideToolbarOpen] = useState(false);

  return (
    <div className="page-layout">
      <Sidebar />
      <SideToolbar open={sideToolbarOpen} onClose={() => setSideToolbarOpen(false)} />
      <Navbar toolbarOpen={sideToolbarOpen} onSetToolbarOpen={(val) => setSideToolbarOpen(val)} />
      <Container className="content" maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
}

export default PageLayout;
