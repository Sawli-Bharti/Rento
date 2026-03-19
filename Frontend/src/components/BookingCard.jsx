const BookingCard = ({booking,onCancel,onPay,onStartRental}) => {

  const getStatusColor = (status) => {
    switch(status) {
      case 'REQUESTED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">{booking.propertyName}</h4>
          <p className="text-gray-600 mb-1">Owner: <span className="font-medium">{booking.ownerName}</span></p>
          <p className="text-gray-600 mb-3">Rent: <span className="font-bold text-lg text-green-600">₹{booking.rentAmount}</span></p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="flex gap-3">
        {booking.status === "REQUESTED" && (
          <button
            onClick={()=>onCancel(booking.bookingId)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel Booking
          </button>
        )}

        {booking.status === "APPROVED" && (
          <button
            onClick={()=>onPay(booking.bookingId)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Confirm & Pay Deposite
          </button>
        )}

        {booking.status === "CONFIRMED" && (
          <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 font-medium text-center">✓ Booking Confirmed</p>
            
          </div>
          
        )}

        {booking.status === "CANCELLED" && (
          <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 font-medium text-center">✗ Booking Cancelled</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingCard;