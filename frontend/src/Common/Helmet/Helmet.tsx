import React from "react";

function Helmet(props: any) {
  document.title = "Student-List - " + props.title;
  return <div>{props.children}</div>;
}

export default Helmet;
