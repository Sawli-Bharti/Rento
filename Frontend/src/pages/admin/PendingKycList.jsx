import { useEffect, useState } from "react";
import { useAuth } from "../../resource";
import { useNavigate } from "react-router-dom";

const PendingKycList = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/admin/pending/owner-kyc", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setList(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
    console.log(list);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pending KYC Requests</h1>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3">ID Type</th>
              <th className="p-3">Submitted</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{o.fullName}</p>
                  {/* <p className="text-xs text-slate-500">{o.email}</p> */}
                </td>
                <td className="p-3">{o.idType}</td>
                <td className="p-3">
                  {new Date(o.kycSubmittedAt).toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() =>
                      navigate(`/admin/kyc/${o.id}`)
                    }
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PendingKycList;
