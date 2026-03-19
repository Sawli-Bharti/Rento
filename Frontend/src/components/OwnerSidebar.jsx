import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaPlus,
  FaIdCard,
  FaBars,
  
 
} from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../resource";

const OwnerSidebar = () => {
  const [open, setOpen] = useState(false);
  const {user,logout,isAuthenticated}=useAuth();
  
  

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
     ${isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-200"}`;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-white shadow h-screen p-4
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        <h2 className="text-xl font-bold text-indigo-600 mb-6">
          Owner Panel
        </h2>

        <nav className="space-y-2">
          <NavLink to="/o-wner/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/o-wner/properties" className={linkClass}>
            <FaBuilding /> My Properties
          </NavLink>

          <NavLink to="/o-wner/add-property" className={linkClass}>
            <FaPlus /> Add Property
          </NavLink>
          <NavLink to="/o-wner/appointments" className={linkClass}>
            <FiEdit3 /> Appointments
          </NavLink>
          
          <NavLink to="/o-wner/bookings" className={linkClass}>
            <FiEdit3 /> Bookings
          </NavLink>

          <NavLink to="/o-wner/kyc" className={linkClass}>
            <FaIdCard /> KYC
          </NavLink>
          <NavLink to="/owner" className={linkClass} onClick={()=>{
            logout();
          }}>
            <MdLogout /> Logout
          </NavLink>
        </nav>

      </aside>
    </>
  );
};

export default OwnerSidebar;
