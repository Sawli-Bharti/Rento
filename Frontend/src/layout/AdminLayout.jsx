import { NavLink, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaHome,
  FaFlag,
  FaSignOutAlt,
  FaTachometerAlt
} from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-5 text-xl font-bold border-b border-slate-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <SidebarLink to="/admin/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <SidebarLink to="/admin/users" icon={<FaUsers />} label="All Users" />

          <SidebarLink to="/admin/owner-list" icon={<FaUserTie />} label="Owners" />
          <SidebarLink to="/admin/renter-list" icon={<FaUsers />} label="Renters" />
          <SidebarLink to="/admin/pending-kyc-list" icon={<FaUsers />} label="Pending KYC" />
          <SidebarLink to="/admin/allproperties" icon={<FaHome />} label="Properties" />
          <SidebarLink to="/admin/reports" icon={<FaFlag />} label="Reports" />

        </nav>

        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-500">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition 
      ${isActive ? "bg-indigo-600" : "hover:bg-slate-800"}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default AdminLayout;
