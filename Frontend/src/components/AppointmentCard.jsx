import { FiCalendar, FiHome, FiUser } from "react-icons/fi";
import { useState } from "react";

const statusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "ACCEPTED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "CANCELLED":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100";
  }
};

const AppointmentCard = ({
  appointment,
  role,
  onAccept,
  onReject,
  onCancel
}) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remark, setRemark] = useState("");

  const handleRejectSubmit = () => {
    onReject(remark);
    setShowRejectModal(false);
    setRemark("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col gap-2">

      <h3 className="font-semibold text-lg flex items-center gap-2">
        <FiHome />
        {appointment.propertyTitle}
      </h3>

      {role === "OWNER" && (
        <p className="text-sm flex items-center gap-2 text-gray-600">
          <FiUser /> {appointment.renterName}
        </p>
      )}

      {role === "RENTER" && (
        <p className="text-sm flex items-center gap-2 text-gray-600">
          <FiUser /> {appointment.ownerName}
        </p>
      )}

      <p className="text-sm flex items-center gap-2">
        <FiCalendar /> Visit Date: {appointment.visitDate}
      </p>

      {appointment.ownerNote && (
        <p className="text-sm text-gray-500">
          Note: {appointment.ownerNote}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">

        <span
          className={`text-xs px-2 py-1 rounded ${statusColor(
            appointment.status
          )}`}
        >
          {appointment.status}
        </span>

        <div className="flex gap-2">

          {role === "OWNER" && appointment.status === "PENDING" && (
            <>
              <button
                onClick={() => onAccept(appointment.id)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Accept
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Reject
              </button>
            </>
          )}

          {role === "RENTER" && appointment.status === "PENDING" && (
            <button
              onClick={() => onCancel(appointment.id)}
              className="text-red-600 text-sm"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Reject Appointment</h3>
            <p className="text-sm text-gray-600 mb-4">Provide a reason for rejection:</p>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Enter your remark..."
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentCard;