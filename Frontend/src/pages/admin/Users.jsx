import { useEffect, useState } from "react";
import { useAuth } from "../../resource";
import {adminFetch} from "../../fetch/AdminFetch";
const Users = () => {
    const {token}=useAuth();
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [roleFilter, setRoleFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
    
    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                const data=await adminFetch("http://localhost:8080/admin/allUsers",token,setError);
                setUsers(data);
            }catch(e){
                console.log('Error fetching users:',e);
                setError(e.message || 'Error fetching users');
            }
        }
        fetchUsers();

        

    })

        const filteredUsers = users.filter(user => {
        const roleMatch =
        roleFilter === "" || user.role === roleFilter;

        const statusMatch =
        statusFilter === "" || user.status === statusFilter;

        return roleMatch && statusMatch;
        });
    
    if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div className="text-red-500">Error: {error}</div>;
    }
    

    
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="flex flex-wrap gap-4 mb-6">

  {/* Role Filter */}
     <select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    className="border rounded-lg px-3 py-2 text-sm"
  >
    <option value="">All Roles</option>
    <option value="ROLE_OWNER">Owner</option>
    <option value="ROLE_RENTER">Renter</option>
     </select>

  {/* Status Filter */}
    <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-lg px-3 py-2 text-sm"
    >
    <option value="">All Status</option>
    <option value="NOT_SUBMITTED">Approved</option>
    <option value="APPROVED">Approved</option>
    <option value="PENDING">Pending</option>
    <option value="REJECTED">Rejected</option>
    </select>

  {/* Clear Filters */}
    <button
        onClick={() => {
      setRoleFilter("");
      setStatusFilter("");
        }}
        className="text-sm text-indigo-600 hover:underline"
    >
    Clear Filters
    </button>

</div>


      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Id</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {
                filteredUsers.map((user)=>(
                    
                         <tr key={user.userId} className="border-t">
                          <td className="p-3">{user.userId}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role.replace("ROLE_","")}</td>
                        <td className="p-3">
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                               {"Kyc-"+user.status}
                            </span>
                        </td>
                    </tr>
                    
                   
                ))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
