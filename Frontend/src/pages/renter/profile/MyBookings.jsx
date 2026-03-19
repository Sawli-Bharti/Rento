import { useEffect, useState } from "react";
import { useAuth,BookingCard } from "../../../resource";
import { authFetch,getRenterBookings,cancelBooking,confirmBooking } from "../../../fetch/renterApi";
import { createConfirmBookingPaymentOrder, verifyPayment } from "../../../fetch/paymentApi";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  // wait for auth info before calling
  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const res = await getRenterBookings(user.renterId);
      const data = Array.isArray(res) ? res : res?.data || [];
      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    }
  };

  if (!bookings.length)
    return <p>No bookings yet</p>;

  const handleCancel = async(id)=>{
    try {
      const result = await cancelBooking(id);
      alert(result); // Show success message
      loadBookings(); // Refresh the bookings list
    } catch (error) {
      alert("Failed to cancel booking: " + error.message);
    }
  }

  const handleConfirmBookingPayment = async(booking)=>{
    try {
      // Create payment order
      const orderResponse = await createConfirmBookingPaymentOrder(booking.depositAmount || booking.rentAmount, booking.bookingId);
      const orderData = orderResponse;

      // Razorpay options
      const options = {
        key: 'rzp_test_SQmFEVTn8sF7s4', // Your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Rent Management',
        description: 'Deposit Payment',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);

            // Confirm booking with real payment ID
            const result = await confirmBooking(booking.bookingId, response.razorpay_payment_id);
            alert(result);
            loadBookings();
          } catch (error) {
            alert("Payment verification failed: " + error.message);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      alert("Failed to initiate payment: " + error.message);
    }
  }

 
  
  return (
    <div>

      <h2>My Bookings</h2>

      {bookings.map(b=>(
        <BookingCard
          key={b.bookingId}
          booking={b}
          onCancel={()=>handleCancel(b.bookingId)}
          onPay={()=>handleConfirmBookingPayment(b)}
        />
      ))}

    </div>
  );
};

export default MyBookings;
