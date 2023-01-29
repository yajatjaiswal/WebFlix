import React from "react";
function ErrorHandle(props) {
  return props.show ? <div>Movie Not Found</div> : <></>;
}

export default ErrorHandle;
