import { useEffect, useState } from "react";
import { useAuth } from "../../../resource";
import { authFetch } from "../../../fetch/renterApi";

const SavedProperties = () => {
  const { token } = useAuth();
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    authFetch("/renter/saved", token)
      .then(setSaved)
      .catch(console.error);
  }, []);

  const remove = async (id) => {
    await authFetch(`/renter/saved/${id}`, token, { method: "DELETE" });
    setSaved(prev => prev.filter(p => p.id !== id));
  };

  if (!saved.length) return <p>No saved properties</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Saved Properties</h1>

      <div className="space-y-4">
        {saved.map(p => (
          <div key={p.id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm">{p.city}</p>
            </div>
            <button
              onClick={() => remove(p.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProperties;
