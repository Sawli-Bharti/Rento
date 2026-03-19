import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png'
function PropertyCard({property}) {
  const navigate=useNavigate();
  function handleViewDetailsClick(){
    navigate(`/property?id=${property.id}`);

  }
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div>
        {property.imageUrls && property.imageUrls.length > 0 ? (
          // property.imageUrls.map((imgUrl, index) => (
          //   <img
          //     key={index}
          //     src={imgUrl}
          //     alt={`property-${index}`}
          //     className="w-full h-48 object-cover"
          //   />
          // ))
          <img 
          src={property.imageUrls[0]}
          alt="property"
          className="w-full h-48 object-cover"
          />
        ) : (
          <img
            src={home}
            alt="property"
            className="w-full h-48 object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800">
          {property.name}
        </h3>

        <p className="text-slate-500 text-sm mt-1">
          {property.locality}, {property.city}
        </p>
        <p className="text-slate-500 text-sm mt-1">
          {property.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-bold">
            ₹{property.rent}/month
          </span>
          <button onClick={handleViewDetailsClick} className="text-sm text-indigo-600 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard