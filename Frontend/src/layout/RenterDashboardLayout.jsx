import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { RenterSidebar } from "../resource";

const RenterDashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow">
        <RenterSidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-indigo-600">My Account</h2>
          <button onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        <RenterSidebar onLinkClick={() => setOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 p-2 rounded bg-white shadow"
          onClick={() => setOpen(true)}
        >
          <FiMenu size={22} />
        </button>

        <Outlet />
      </main>

    </div>
  );
};

export default RenterDashboardLayout;
