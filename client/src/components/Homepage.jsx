import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <h1>Welcome!!!</h1>
      <Link to={"/admin"} >Admin Page</Link>
    </>
  );
}
