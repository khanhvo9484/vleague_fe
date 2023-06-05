import React, { useEffect } from "react";
import Navbar from "../../components/ui/navbar/Navbar";

const home = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  },[]);
  return (
    <>
      <Navbar />
    </>
  );
};

export default home;
