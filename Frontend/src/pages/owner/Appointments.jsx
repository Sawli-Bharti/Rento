import { useEffect, useState } from "react";
import { useAuth,AppointmentCard } from "../../resource";
import { authFetch } from "../../fetch/renterApi";


const Appointments = () => {

  const { token } = useAuth();

  const [appointments,setAppointments]=useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {

      const data = await authFetch(
        "/appointments/owner",
        token
      );

      
      setAppointments(data);

    } catch (err) {
      console.error(err);
    }
  };

  const acceptAppointment = async (id) => {
    await authFetch(`/appointments/owner/accept/${id}`, token, {
      method: "PUT"
    });

    fetchAppointments();
  };
  const pendingApponitments=appointments.filter(a=>a.status==="PENDING");
  const upcomingAppointments=appointments.filter(a=>a.status==="ACCEPTED" && new Date(a.visitDate) >= new Date());

  const rejectAppointment = async (id, remark) => {
    await authFetch(`/appointments/owner/reject/${id}`, token, {
      method: "PUT",
      body: JSON.stringify({ remark })
    });

    fetchAppointments();
  };

  return (
    <div className="space-y-10">

      <h1 className="text-2xl font-bold">
        Property Appointments
      </h1>

      {/* Pending */}
      <section>

        <h2 className="text-lg font-semibold mb-4">
          Pending Requests
        </h2>

        <div className="grid gap-4">

          {pendingApponitments.length === 0 && (
            <p className="text-gray-500">
              No pending appointments
            </p>
          )}

          {pendingApponitments.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              role="OWNER"
              onAccept={() => acceptAppointment(a.id)}
              onReject={(remark) => rejectAppointment(a.id, remark)}
            />
          ))}

        </div>

      </section>

      {/* Accepted */}
      <section>

        <h2 className="text-lg font-semibold mb-4">
          Upcoming Visits
        </h2>

        <div className="grid gap-4">

          {upcomingAppointments.length === 0 && (
            <p className="text-gray-500">
              No upcoming visits
            </p>
          )}

          {upcomingAppointments.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              role="OWNER"
            />
          ))}

        </div>

      </section>

    </div>
  );
};

export default Appointments;