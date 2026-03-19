async function fetchBySearchInput(input) {
    try{
        const res=await fetch(`http://localhost:8080/property/search?query=${input}`);
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data=await res.json();
        return data;
    }catch(e){
        console.log('Fetch by search input error:', e);
        throw e;
    }

}
async function fetchAllProperties(url,setError) {
    try{
        const res=await fetch(url);
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data=await res.json();
        setError(null);
        return data;
    }catch(err){
        
         if (err instanceof SyntaxError) {
          console.error('Failed to parse JSON:', err);
          setError('Failed to load properties: Invalid data from server');
          setProperties([]);
        } else {
          console.log('Fetch error:', err);
          setError(`Failed to load properties: ${err.message}`);
          setProperties([]);
        }
        
    }
    
}

async function fetchPropertyById(id,setError){
    try{
        const res=await fetch(`http://localhost:8080/property/get/${id}`);
        if(!res.ok){
            setError(`Failed to load property: ${res.statusText}`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data=await res.json();
        console.log(data);
        setError(null);
        return data;
    }catch(err){
        setError(`Failed to load property: ${err.message}`);
        console.log('Fetch property by ID error:', err);
        throw err;
    }
}

export const fetchFunction = async (url, options = {}) => {

  const storedAuth = localStorage.getItem("user");
  const token = storedAuth ? JSON.parse(storedAuth).token : null;
  console.log("Token being used:", token); // Debug log

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`http://localhost:8080${url}`, {
    ...options,
    headers,
  })
  
  if (!res.ok) {
    const errorText = await res.text();
    alert(errorText);
    console.error("API Error:", res.status, errorText);
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }

  // Handle different response types
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text();
  }
}
export {fetchAllProperties,fetchBySearchInput,fetchPropertyById};