import React, { Fragment } from "react";
import loading from "../../assets/loading.gif";

export const Loading = () => {
  return (
    <Fragment>
      <img
        src={loading}
        style={{ width: "60px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Loading;
