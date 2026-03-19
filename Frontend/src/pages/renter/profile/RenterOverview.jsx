import { useState,useEffect } from "react";
import { useAuth,StatCard } from "../../../resource";
import { authFetch } from "../../../fetch/renterApi";
import { useNavigate } from "react-router-dom";

const RenterOverview = () => {
  const {user}=useAuth();
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    if(!user) navigate('/login');
    console.log(user);
    authFetch(`/renter/dashboard/${user.renterId}`, token)
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome back {user?.name}
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Active Bookings" value="2" />
        <StatCard title="Appointments" value="1" />
        <StatCard title="Saved Properties" value="5" />
      </div>

      {/* Recent */}
      {/* <RecentBookings /> */}
    </div>
  );
};

export default RenterOverview;
