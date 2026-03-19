import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { getRenterRentals,payRent } from "../../../fetch/renterApi"
import { createRentPaymentOrder, verifyPayment } from "../../../fetch/paymentApi"
import { RentalCard } from "../../../resource"

const RentalHistory = ()=>{

  const {rentalId} = useParams()
  const [rentals,setRentals] = useState([])

  useEffect(()=>{
    loadRentals()
  },[])

  const loadRentals = async ()=>{
    const res = await getRenterRentals(rentalId)
    const data = Array.isArray(res) ? res : res?.data || [];
    console.log("Rental history response:", data); // Debug log
    setRentals(data)
    
  }

  const pay = async()=>{
    try {
      // Get current month and year
      const date = new Date()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      // Check if already paid
      const existing = history.find(h => h.month === month && h.year === year)
      if (existing) {
        alert("Rent already paid for this month")
        return
      }

      // Create payment order for rent
      const orderResponse = await createRentPaymentOrder(rentalId)
      const orderData = JSON.parse(orderResponse)

      // Razorpay options
      const options = {
        key: 'rzp_test_SQmFEVTn8sF7s4',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Rent Management',
        description: 'Monthly Rent Payment',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature)

            // Pay rent with real payment ID
            await payRent(rentalId, month, year, response.razorpay_payment_id)

            loadHistory()
            alert("Rent paid successfully")
          } catch (error) {
            alert("Payment verification failed: " + error.message)
          }
        },
        prefill: {
          name: 'Renter Name', // Should be from user context
          email: 'renter@example.com',
          contact: '',
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      alert("Failed to initiate payment: " + error.message)
    }
  }

  return(

    <div>

      <h2>Rental History</h2>

      <button onClick={pay}>
        Pay This Month Rent
      </button>
      <div className="flex flex-col lg:flex-row flex-wrap gap-6">
        {rentals.map((rental)=>(
        <RentalCard
          key={rental.rentalId}
          rental={rental}
        />
      ))}
      </div>
      

    </div>

  )
}

export default RentalHistory