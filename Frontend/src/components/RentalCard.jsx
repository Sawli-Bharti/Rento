import React from 'react'

function RentalCard({rental}) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex">

    {/* Image */}
    <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 flex-shrink-0 overflow-hidden p-2">
        <img
            src={rental.propertyImage}
            alt={rental.propertyName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
    </div>

    {/* Content */}
    <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">

        <div>
            <h1 className="text-sm sm:text-lg font-semibold text-gray-800">
                Rental #{rental.rentalId}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base mt-1">
                <span className="font-medium text-gray-800">Property:</span>{" "}
                {rental.propertyName}
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-medium text-gray-800">Owner:</span>{" "}
                {rental.ownerName}
            </p>

            <p className="text-green-600 font-semibold mt-1">
                ₹{rental.rentAmount}
                <span className="text-gray-500 text-sm"> /month</span>
            </p>
        </div>

        <button className="mt-3 w-fit bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200">
            View Details
        </button>

    </div>
</div>
  )
}

export default RentalCard
