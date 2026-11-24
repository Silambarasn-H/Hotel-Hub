import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        HotelHub
      </Link>

      <div className="nav-links">
        <Link to="/">Hotels</Link>
        <Link to="/add-hotel" className="add-btn">
          + Add Hotel
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
