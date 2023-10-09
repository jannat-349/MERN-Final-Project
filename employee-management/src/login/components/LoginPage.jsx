import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <div>LoginPage</div>
      <Link to={"/dashboard"}>Go to dashboard</Link>
    </div>
  );
}
