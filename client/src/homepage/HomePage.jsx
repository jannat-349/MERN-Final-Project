import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <p>Welcome to Homepage!</p>
      <p>Please log in to continue...</p>
      <Link to={"/login"}>Log In</Link>
    </div>
  );
}
