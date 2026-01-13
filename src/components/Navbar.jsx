import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {user && <Link to="/add">Add Room</Link>}
      {user && <Link to="/my">My Rooms</Link>}

      {!user ? (
        <Link to="/auth">Login</Link>
      ) : (
        <button onClick={handleLogout} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
