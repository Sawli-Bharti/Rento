import { useEffect,useState,useContext } from "react"
import { getRenterRentals } from "../../../fetch/renterApi"
import { useAuth } from "../../../resource"
import { useNavigate } from "react-router-dom"

const MyRentals = ()=>{

  const {user} = useAuth()
  const [rentals,setRentals] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    loadRentals()
  },[])

  const loadRentals = async ()=>{
    const res = await getRenterRentals(user.id)
    setRentals(res.data)
  }

  return(

    <div>

      <h2>My Rental Properties</h2>

      {rentals.map(r=>(
        <div key={r.id} className="card p-3">

          <h4>{r.property.name}</h4>

          <button
            onClick={()=>navigate(`/rent-history/${r.id}`)}
          >
            View Payment History
          </button>

        </div>
      ))}

    </div>

  )
}

export default MyRentals;