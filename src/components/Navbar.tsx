import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#282c34" }}>
      <Link to="/" style={{ margin: "0 1rem", color: "white" }}>
        Search
      </Link>
    </nav>
  );
};

export default Navbar;
