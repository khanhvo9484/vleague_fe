import React, { useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";

const home = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  return (
    <DefaultLayout>
      <div>
        <h1>Hello</h1>
      </div>
    </DefaultLayout>
  );
};

export default home;
