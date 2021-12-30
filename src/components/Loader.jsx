import React from "react";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 120px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="images/loader.gif" alt="loading" width={"300px"} />
    </div>
  );
};

export default Loader;
