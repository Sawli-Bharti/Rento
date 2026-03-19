import React,{useEffect} from 'react'
import { getOwnerBookings } from "../../fetch/ownerApi";
import { useAuth } from "../../resource";
import { approveBooking, rejectBooking } from "../../fetch/ownerApi";
function Bookings() {
  const [bookings, setBookings] = React.useState([]);
  const {user}=useAuth();
  useEffect(() => {
      if (user?.id) {
        loadBookings();
      }
    }, [user]);
  
  const loadBookings = async () => {
      const res = await getOwnerBookings(user.ownerId)
      const data = Array.isArray(res) ? res : res?.data || [];
      const sortedData = data.sort((a, b) => {
        if (a.status === 'REQUESTED' && b.status !== 'REQUESTED') return -1;
        if (a.status !== 'REQUESTED' && b.status === 'REQUESTED') return 1;
        return 0;
      });
      setBookings(sortedData)
      console.log(sortedData);
  } 

  
  const approve = async(id)=>{
    await approveBooking(id)
    loadBookings()
  }

  const reject = async(id)=>{
    await rejectBooking(id)
    loadBookings()
  }
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'REQUESTED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 ';
    }
  };
  return (
    <div>

      <h2>Booking Requests</h2>
      <div className='flex flex-wrap gap-5'>
        {bookings.map((b, index)=>(
        <div 
          key={b.bookingId} 
          className="card p-3 mb-3 shadow-md border border-gray-200 rounded" 
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
          }}
        >

          <h4>{b.propertyName}</h4>

          <p>Renter: {b.renterName}</p>
          <p className={`${getStatusColor(b.status)}`}>Status: {b.status}</p>

          {b.status==="REQUESTED" && (
            <div className=' flex p-2 justify-end'>
              <button 
                onClick={()=>approve(b.bookingId)}
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2 transition-colors"
              >
                Approve
              </button>
              <button 
                onClick={()=>reject(b.bookingId)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
              >
                Reject
              </button>
            </div>
          )}

        </div>
      ))}
      </div>
      

    </div>
  )
}

export default Bookings;