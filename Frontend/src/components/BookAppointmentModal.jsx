import { useEffect, useState } from "react";
import { useAuth } from "../resource";
import { useNavigate } from "react-router-dom";

const BookAppointmentModal = ({ propertyId, onClose }) => {
  const { token,user } = useAuth();
  const [visitDate, setVisitDate] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  })
  const submitAppointment = async () => {
    if (!visitDate) {
      setError("Please select a visit date");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:8080/appointments/create?propertyId=${propertyId}&renterId=${user.renterId}&visitDate=${visitDate}`,
        {
          method: "POST",
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
          
        }
      );

      if (!res.ok) throw new Error(await res.text());

      alert("Appointment request sent to owner");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Book Property Visit</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {/* Date */}
        <label className="block text-sm mb-1">Select Visit Date</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded mb-3"
          value={visitDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setVisitDate(e.target.value)}
        />

        {/* Note */}
        <label className="block text-sm mb-1">
          Message to Owner (optional)
        </label>
        <textarea
          rows="3"
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="I would like to visit this property..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={submitAppointment}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Request Visit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
