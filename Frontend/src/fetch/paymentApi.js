import { fetchFunction } from "./fetchFunction";

// PAYMENT API CALLS
export const createConfirmBookingPaymentOrder = async (amount, bookingId) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount for payment");
  }

  return fetchFunction(`/api/payment/create-order?amount=${amount}&bookingId=${bookingId}`, {
    method: "POST",
    
  });
};



export const createRentPaymentOrder = async (rentalId) => {
  return fetchFunction(`/api/payment/create-rent-order?rentalId=${rentalId}`, {
    method: "POST",
    
  });
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  return fetchFunction(`/api/payment/verify-payment?orderId=${orderId}&paymentId=${paymentId}&signature=${signature}`, {
    method: "POST",
    
  });
};