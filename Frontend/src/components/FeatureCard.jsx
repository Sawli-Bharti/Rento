const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
