import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchPropertyById } from "../../fetch/fetchFunction";
import { requestBooking } from "../../fetch/renterApi";
import homeImg from '../../assets/home.png'
import { BookAppointmentModal,useAuth } from "../../resource";
import { useNavigate } from "react-router-dom";
const PropertyDetails = () => {
  const propertyId = new URLSearchParams(window.location.search).get("id");
  const {user,token}=useAuth();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const [openAppointment, setOpenAppointment] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await fetchPropertyById(propertyId, setError);
        setProperty(data);
      } catch {
        setError("Failed to load property details.");
      }
    }
    fetchProperty();
  }, [propertyId]);

  // 🔐 GUARDS
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading property details...
      </div>
    );
  }

  const images =
    property.imageUrls && property.imageUrls.length > 0
      ? property.imageUrls
      : [homeImg];

  const prevImage = () => {
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handleBookAppointment=()=>{
    if(!user){
      alert("Please Signup to book an appointment")
      navigate("/signup")
      return;
    }
    setOpenAppointment(true);
  }

  const handleBook = async () => {
    if(!user){
      alert("Please Signup to book this property")
      navigate("/signup")
      return;
    }
  try{
    await requestBooking(property.id, user.renterId)
    alert("Booking request sent")
  }catch(err){
    console.log(err)
  }
}
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE SLIDER */}
          <div className="relative">
            <img
              src={images[currentIndex]}
              alt="property"
              className="w-full h-[400px] object-cover rounded-lg"
            />

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <FaChevronRight />
            </button>

            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx === currentIndex ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div>
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <p className="text-slate-500">
              {property.locality}, {property.city}
            </p>

            <p className="text-2xl font-semibold text-indigo-600 mt-4">
              ₹{property.rent}/month
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <p><b>Type:</b> {property.propertyType}</p>
              <p><b>Furnished:</b> {property.furnished}</p>
              <p><b>Area:</b> {property.area}</p>
              <p><b>Address:</b> {property.address}</p>
            </div>

            <p className="mt-6 text-slate-600">{property.description}</p>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg"
              onClick={handleBookAppointment}>
                Book Appointment
              </button>
              <button onClick={handleBook} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
                Book Property
              </button>
            </div>
          </div>

        </div>
      </div>
      {openAppointment && (
        <BookAppointmentModal
          propertyId={property.id}
          onClose={() => setOpenAppointment(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
