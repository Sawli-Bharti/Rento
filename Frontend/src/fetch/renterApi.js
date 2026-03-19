import { fetchFunction } from "./fetchFunction";

// RENTERS_____________
export const requestBooking = async (propertyId, renterId) => {
  return fetchFunction(`/api/bookings/request?propertyId=${propertyId}&renterId=${renterId}`, {
    method: "POST"
  })
}

export const getRenterBookings = async (renterId) => {
  return fetchFunction(`/api/bookings/renter/${renterId}`)
}

export const cancelBooking = async (bookingId) => {
  return fetchFunction(`/api/bookings/${bookingId}/cancel`, {
    method: "PUT"
  })
}

export const confirmBooking = async (bookingId, paymentId) => {
  return fetchFunction(`/api/bookings/${bookingId}/confirm?paymentId=${paymentId}`, {
    method: "PUT"
  })
}

// RENTALS--------------------
export const getRenterRentals = async (renterId) => {
  return fetchFunction(`/api/rentals/renter/${renterId}`)
}

// export const startRental=async(renterId,leaseMonths=0)=>{
//     return fetchFunction(`/api/rentals/start?renterId=${renterId}&leaseMonths=${leaseMonths}`,{
//         method: "POST"
//     })

// }

export const payRent = async (rentalId, month, year, paymentId) => {
  return fetchFunction(`/api/rent-payments/pay?rentalId=${rentalId}&month=${month}&year=${year}&paymentId=${paymentId}`, {
    method: "POST"
  })
}

export const getRentHistory = async (rentalId) => {
  return fetchFunction(`/api/rent-payments/history/${rentalId}`)
}


const BASE = "http://localhost:8080";

export const authFetch = async (url, token, options = {}) => {
  console.log("authFetch token:", token); // Debug log
  if (!token) {
    throw new Error("Missing auth token");
  }

  const res = await fetch(BASE + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    window.location.href = "/login"

    throw new Error("Session expired")
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
};
