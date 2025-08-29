import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
  };

  const mainStyle = {
    flex: "1",
  };

  return (
    <div style={layoutStyle}>
      <NavBar />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
