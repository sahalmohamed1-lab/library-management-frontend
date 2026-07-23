import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  if (!token) return null;

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        Library System
      </h1>

      <div className="flex gap-5">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/books">Books</Link>

        <Link to="/authors">Authors</Link>

        <Link to="/categories">Categories</Link>

        <Link to="/borrow">Borrow</Link>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;