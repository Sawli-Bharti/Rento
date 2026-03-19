import {fetchFunction} from "./fetchFunction"


export const getOwnerBookings = async (ownerId) => {
  return fetchFunction(`/api/bookings/owner/${ownerId}`)
}

export const approveBooking = async (bookingId) => {
  return fetchFunction(`/api/bookings/${bookingId}/approve`, {
    method: "PUT"
  })
}
export const rejectBooking = async (bookingId) => {
  return fetchFunction(`/api/bookings/${bookingId}/reject`, {
    method: "PUT"
  })
}