// for fetch users,reneters,owners etc
const adminFetch=async(url,token,setError)=>{
    try{
        const res=await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        
    // 🔴 Handle non-JSON responses safely
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      throw new Error(`Request failed: ${res.status}`);
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON response:", text);
      throw new Error("Invalid server response");
    }
        const data=await res.json();
        return data;

    }catch(e){
        console.log('Admin Fetch Error:',e);
        setError(e.message || 'Error fetching admin data');
    }
}

export  {adminFetch};
