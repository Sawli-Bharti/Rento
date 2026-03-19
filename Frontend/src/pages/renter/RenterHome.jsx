import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FeatureCard, PropertyCard } from "../../resource";
import{fetchAllProperties} from '../../fetch/fetchFunction';
import { useNavigate } from "react-router-dom";

const RenterHome = () => {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  
  useEffect(() => {
    const loadProperties=async ()=>{
      try{
        const data=await fetchAllProperties("http://localhost:8080/property/allProperty",setError);
        setProperties(data);
        
      }catch(e){
        console.log('Error loading properties:', e);
      }
    }
    loadProperties();
    
    
    
  }, []);


  function handleSearchClick(){
    if(search.trim()){
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }


  }

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 drop-shadow-lg">
          Find Your Perfect Rental Home
        </h1>

        <p className="mt-4 text-slate-600 text-lg max-w-2xl">
          Browse verified properties, connect with owners, and move in
          without hassle.
        </p>

        {/* Search Bar */}
        <div className="mt-8 w-full max-w-xl relative">
          <button></button>
          
          <input
            type="text"
            placeholder="Search by city, area or property type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e)=> e.key==="Enter" && handleSearchClick()}
            className="w-full pl-12 pr-4 py-3 rounded-full border shadow-sm focus:outline-indigo-500"
          />
          <button className="absolute right-4 top-3.5"><FiSearch className=" text-slate-400 text-xl" /></button>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-16 bg-white px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Why Choose Rento?
        </h2>

        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <FeatureCard
            title="Verified Listings"
            description="All properties are verified to ensure safety and trust."
          />
          <FeatureCard
            title="No Brokerage"
            description="Connect directly with owners without paying extra fees."
          />
          <FeatureCard
            title="Smart Search"
            description="Filter properties based on rent, location, and type."
          />
          <FeatureCard
            title="Easy Contact"
            description="Chat or call owners instantly through the platform."
          />
        </div>
      </section>

      {/* ================= PROPERTIES SECTION ================= */}
      <section className="py-16 bg-slate-50 px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Featured Properties
        </h2>

        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {console.log('Properties in state:', properties)}
          {error ? (
            <p className="text-center col-span-full text-red-500">
              {error}
            </p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="text-center col-span-full text-slate-500">
             properties will be available soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RenterHome;
