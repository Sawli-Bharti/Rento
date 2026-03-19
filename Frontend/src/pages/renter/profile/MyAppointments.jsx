import { useEffect, useState } from "react";
import { useAuth,AppointmentCard } from "../../../resource";
import { authFetch } from "../../../fetch/renterApi";


const MyAppointments = () => {

  const { token,user } = useAuth();

  const [appointments, setAppointments] = useState([]);

  // fetch appointments once we have a valid token
  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    try {
      console.log("fetchAppointments token=", token);
      const data = await authFetch(
        `/appointments/renter`,
        token
      );

      setAppointments(data);

    } catch (err) {
      console.error("fetchAppointments error", err);
    }
  };

  const cancelAppointment = async (id ) => {

    await authFetch(
      `/appointments/renter/cancel/${id}`,
      token,
      { method: "PUT" }
    );

    fetchAppointments();
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Appointments
      </h1>

      <div className="grid gap-4">

        {appointments.length === 0 && (
          <p className="text-gray-500">
            No appointments booked
          </p>
        )}

        {appointments.map((a) => (
          <AppointmentCard
            key={a.id}
            appointment={a}
            role="RENTER"
            onCancel={() => cancelAppointment(a.id)}
          />
        ))}

      </div>

    </div>
  );
};

export default MyAppointments;