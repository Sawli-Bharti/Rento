import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {PropertyCard} from "../../resource"

const PropertyBySearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [furnished, setFurnished] = useState("");
  const [type, setType] = useState("");

  const fetchProperties = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      query,
      ...(minRent && { minRent }),
      ...(maxRent && { maxRent }),
      ...(furnished && { furnished }),
      ...(type && { type }),
    });

    try {
      const res = await fetch(
        `http://localhost:8080/property/search?${params.toString()}`
      );
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [query, minRent, maxRent, furnished, type]);

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto flex gap-6">

        {/* ================= FILTER SIDEBAR (Desktop) ================= */}
        <aside className="hidden md:block w-64 bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          {/* Rent */}
          <div className="mb-4">
            <label className="text-sm font-medium">Rent Range (₹)</label>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Furnished */}
          <div className="mb-4">
            <label className="text-sm font-medium">Furnished</label>
            <select
              value={furnished}
              onChange={(e) => setFurnished(e.target.value)}
              className="w-full border rounded px-2 py-2 mt-2"
            >
              <option value="">Any</option>
              <option value="Fully">Fully</option>
              <option value="Semi">Semi</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="text-sm font-medium">Property Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-2 py-2 mt-2"
            >
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          <button
            onClick={() => {
              setMinRent("");
              setMaxRent("");
              setFurnished("");
              setType("");
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            Clear Filters
          </button>
        </aside>

        {/* ================= PROPERTY RESULTS ================= */}
        <main className="flex-1">
          <h2 className="text-xl font-semibold mb-4">
            Showing results for “{query}”
          </h2>

          {loading ? (
            <p className="text-slate-500">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="text-slate-500">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertyBySearch;
