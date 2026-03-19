import { NavLink } from "react-router-dom";
import { FiUser, FiHome, FiHeart, FiLock,FiLogOut,FiEdit3 } from "react-icons/fi";
import { useAuth } from "../resource";

const RenterSidebar = ({ onLinkClick }) => {
  const {logout,user}=useAuth();
  const link =
    "flex items-center gap-3 px-4 py-3 rounded hover:bg-indigo-50 text-slate-700";
  const active =
    "flex items-center gap-3 px-4 py-3 rounded bg-indigo-100 text-indigo-600 font-semibold";

  return (
    <div>
      <div className="p-5 border-b">
        <h2 className="text-lg font-bold text-indigo-600">My Account</h2>
      </div>

      <nav className="p-3 space-y-1">
        <NavLink to="/renter" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiUser /> Overview
        </NavLink>

        <NavLink to="/renter/bookings" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiHome /> My Bookings
        </NavLink>
        <NavLink to="/renter/my-appointments" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiEdit3 />Appointments
        </NavLink>
        <NavLink to={`/renter/rental-history/${user?.renterId}`} onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiEdit3 />Rental History
        </NavLink>

        <NavLink to="/renter/saved" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiHeart /> Saved Properties
        </NavLink>
        <NavLink to="/renter/profile" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiUser /> Profile
        </NavLink>

        <NavLink to="/renter/security" onClick={onLinkClick} className={({ isActive }) => isActive ? active : link}>
          <FiLock /> Security
        </NavLink>
        <NavLink to="/signup" onClick={logout} className={({ isActive }) => isActive ? active : link}>
          <FiLogOut /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default RenterSidebar;
