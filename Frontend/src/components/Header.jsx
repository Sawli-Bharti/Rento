// components/HeaderPublic.jsx
import { NavLink } from "react-router-dom";
import { useAuth, ProfileDropdown } from "../resource";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-slate-600 hover:text-indigo-600";

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          Rento
        </NavLink>

        <div className="flex gap-8 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/search" className={linkClass}>Search</NavLink>
          <NavLink to="/properties" className={linkClass}>Properties</NavLink>

          {!isAuthenticated && (
            <NavLink
              to="/owner"
              className="border border-indigo-600 px-4 py-1 rounded text-indigo-600 hover:bg-indigo-50"
            >
              Become Owner
            </NavLink>
          )}

          {isAuthenticated && user.role==="ROLE_RENTER" ? (
            <ProfileDropdown user={user} logout={logout} />
          ) : (
            <>
              <NavLink to="/login" className="text-indigo-600">Login</NavLink>
              <NavLink
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-1 rounded"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
