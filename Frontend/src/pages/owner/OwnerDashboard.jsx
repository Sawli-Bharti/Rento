import { useAuth } from "../../resource";
const OwnerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-slate-500">KYC Status</p>

        <span className={`inline-block mt-2 px-3 py-1 rounded text-sm
          ${user?.status === "APPROVED"
            ? "bg-green-100 text-green-600"
            : user?.status === "REJECTED"
            ? "bg-red-100 text-red-600"
            : "bg-yellow-100 text-yellow-600"}
        `}>
          {user?.status}
        </span>
      </div>

    </div>
  );
};

export default OwnerDashboard;