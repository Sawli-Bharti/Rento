const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
    <div className={`p-3 text-white rounded-lg ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);
export default StatCard;