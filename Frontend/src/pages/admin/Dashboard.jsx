import {
  FaUsers,
  FaUserTie,
  FaHome,
  FaClock
} from "react-icons/fa";
import { StatCard,useAuth } from "../../resource";
import { useEffect,useState } from "react";

const Dashboard = () => {
  const {user,token}=useAuth();
  const [dashboard,setDashboard]=useState(null);
  useEffect(()=>{
    const fetchDashboard= async()=>{
      try{
        const res=await fetch("http://localhost:8080/admin/dashboard",{
           headers: { Authorization: `Bearer ${token}` },
        })
        if(!res.ok){
          console.log("failed to get dashboard response");
          return(
            <div className="text-red-500 text-2xl font-bold">
              <h1>failed to fetch admin dashboard info</h1>
            </div>
          )
        }
        const data=await res.json();
        setDashboard(data);
      }catch(err){
        alert(err.message);

      }
    }

    fetchDashboard();
  },[])
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{user.email}</h1>

      {/* ===== STATS GRID ===== */}
      {dashboard &&(
                <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard title="Total Users" value={dashboard.totalUsers} icon={<FaUsers />} color="bg-indigo-600" />
        <StatCard title="Owners" value={dashboard.totalOwners} icon={<FaUserTie />} color="bg-green-600" />
        <StatCard title="Renters" value={dashboard.totalRenters} icon={<FaUserTie />} color="bg-cyan-500" />
        <StatCard title="Pending KYC" value={dashboard.totalPendingKyc} icon={<FaClock />} color="bg-yellow-500" />
        <StatCard title="Properties" value={dashboard.totalProperties} icon={<FaHome />} color="bg-blue-600" />

      </div>
      )

      }
      
    </div>
  );
};



export default Dashboard;
