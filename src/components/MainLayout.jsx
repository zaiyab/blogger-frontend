import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children, categories }) => {

  return (
    <div>
      <Header categories={categories} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
