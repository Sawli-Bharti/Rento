import { useEffect, useState } from "react";
import { useAuth,PropertyCard } from "../../resource";


const MyProperties = () => {
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/property/allProperties/${user.ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setProperties);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">My Properties</h1>

      {properties.length === 0 ? (
        <p className="text-slate-500">No properties added yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
