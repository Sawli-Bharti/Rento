import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // 🔐 Frontend role guard
  if (!user || user.role !== "ROLE_OWNER") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Access Denied: Only owners can add properties
      </div>
    );
  }

  if(!user || user.kycStatus !=="APPROVED"){
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Access Denied: Only KYC approved  owners can add properties
        <button onClick={()=>{
          navigate('/o-wner/kyc')
        }}>Upload Kyc</button>
      </div>
    );
  }

  const [property, setProperty] = useState({
    name: "",
    rent: "",
    securityDeposit: "",
    locality: "",
    area: "",
    city: "",
    state: "",
    address: "",
    propertyType: "",
    furnished: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!property.name || !property.rent || !property.city) {
      setError("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    // 🔑 property JSON (IMPORTANT)
    formData.append(
      "property",
      new Blob([JSON.stringify(property)], {
        type: "application/json",
      })
    );

    // 🔑 images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8080/property/addProperty/${user.ownerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
         //responetity body message
         const errorMessage = await res.text(); // 👈 NOT json()
  alert(errorMessage);
  throw new Error(errorMessage);
      }

      alert("Property added successfully");
      navigate("/o-wner/properties");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add Property
        </h2>

        {/* Name */}
        <Input label="Property Name" name="name" onChange={handleChange} />

        {/* Rent & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Rent (₹)" name="rent" type="number" onChange={handleChange} />
          <Input
            label="Security Deposit (₹)"
            name="securityDeposit"
            type="number"
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="State" name="state" onChange={handleChange} />
        </div>

        <Input label="Locality" name="locality" onChange={handleChange} />
        <Input label="Address" name="address" onChange={handleChange} />
        <Input label="Area (sqft)" name="area" onChange={handleChange} />

        {/* Type & Furnished */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Property Type"
            name="propertyType"
            options={["Apartment", "Flat", "House", "Villa"]}
            onChange={handleChange}
          />
          <Select
            label="Furnished"
            name="furnished"
            options={["Fully", "Semi", "Unfurnished"]}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-slate-600 mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-slate-600 mb-1">Property Images</label>
          <input
            type="file"
            multiple
            onChange={handleImages}
            className="w-full"
          />
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-500 transition"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

/* 🔹 Small reusable inputs (OPTIONAL, clean) */
const Input = ({ label, name, type = "text", onChange }) => (
  <div className="mb-4">
    <label className="block text-slate-600 mb-1">{label}</label>
    <input
      name={name}
      type={type}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
    />
  </div>
);

const Select = ({ label, name, options, onChange }) => (
  <div className="mb-4">
    <label className="block text-slate-600 mb-1">{label}</label>
    <select
      name={name}
      onChange={onChange}
      className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddProperty;
