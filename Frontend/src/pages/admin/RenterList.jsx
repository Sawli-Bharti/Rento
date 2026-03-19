import React from 'react'
import { useEffect,useState } from 'react';
import { useAuth } from "../../resource";
import {adminFetch} from "../../fetch/AdminFetch";
function RenterList() {
    const {token}=useAuth();
        const [users,setUsers]=useState([]);
        const [loading,setLoading]=useState(false);
        const [error,setError]=useState(null);
        // useEffect(()=>{
        //     const fetchUsers=async()=>{
        //         try{
        //             const data=await adminFetch("http://localhost:8080/admin/allRenters",token,setError);
        //             setUsers(data);
        //         }catch(e){
        //             console.log('Error fetching users:',e);
        //             setError(e.message || 'Error fetching users');
        //         }
        //     }
        //     fetchUsers();
        // })

         if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div className="text-red-500">Error: {error}</div>;
    }
  return (
    <div>RenterList</div>
  )
}

export default RenterList