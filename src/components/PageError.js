import React from "react";

import "./styles/PageError.css";

function PageError(props) {
  return (
    <div className="PageError">
      <span role="img" aria-label="oh no">
        ❌{props.error.message}😱
      </span>
    </div>
  );
}

export default PageError;
