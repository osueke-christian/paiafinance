import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
    <h1 style={{ fontSize: "4rem" }}>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist or has been moved.</p>
    <Link to="/" style={{ color: "#2563eb", textDecoration: "underline" }}>Go to Homepage</Link>
  </div>
);

export default NotFound;
