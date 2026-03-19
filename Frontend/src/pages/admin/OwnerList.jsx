

const OwnerList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Owner Verification</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Owner</th>
              <th className="p-3">ID Type</th>
              <th className="p-3">ID Number</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">Siva</td>
              <td className="p-3">Aadhaar</td>
              <td className="p-3">XXXX-2345</td>
              <td className="p-3">
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">
                  PENDING
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OwnerList;
