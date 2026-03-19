import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

const ProfileDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goToDashboard = () => {
    setOpen(false);
    if (user.role === "ROLE_OWNER") navigate("/o-wner/dashboard");
    else if (user.role === "ROLE_RENTER") navigate("/renter");
    else if (user.role === "ROLE_ADMIN") navigate("/admin/dashboard");
  };

  return (
    <div className="relative">
      {/* Profile Circle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold"
      >
        {user.name && user.name.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border z-50">
          <button
            onClick={goToDashboard}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-100 text-sm"
          >
            <FiUser /> Profile
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-100 text-sm text-red-600"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
