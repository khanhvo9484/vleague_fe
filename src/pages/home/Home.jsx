import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import backgroundImage from "../../assets/background1.jpg";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: -1,
};
const contentStyle = {
  zIndex: 2,
  width: "100%",
  position: "relative",
  paddingTop: "80px",
};
const home = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  return (
    <DefaultLayout>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
        <h1 style={{ color: "white" }}>Lịch thi đấu vòng bảng</h1>
      </div>
    </DefaultLayout>
  );
};

export default home;
