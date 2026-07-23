import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isAdmin = user.is_staff || user.is_superuser;

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Library Management System
        </h1>

        <div className="flex items-center gap-6">
          {isAdmin && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
              }
            >
              Dashboard
            </NavLink>
          )}

          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
            }
          >
            Books
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/authors"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
                }
              >
                Authors
              </NavLink>

              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
                }
              >
                Categories
              </NavLink>
            </>
          )}

          <NavLink
            to="/borrow"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-gray-300"
            }
          >
            Borrow
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, <strong>{user.username}</strong>
          </span>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;