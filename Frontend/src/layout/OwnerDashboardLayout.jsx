import { Outlet, useNavigate } from "react-router-dom";
import { OwnerSidebar } from "../resource";
import { useAuth } from "../resource";

function OwnerDashboardLayout() {
  
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <OwnerSidebar />

      {/* Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>

    </div>
  )
}

export default OwnerDashboardLayout