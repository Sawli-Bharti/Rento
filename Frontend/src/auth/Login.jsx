import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  
  const validate = () => {
    const err = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Enter a valid email";
    }

    if (!form.password) {
      err.password = "Password is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

if (!res.ok) {
  throw new Error("Login failed");
}

const data = await res.json(); // ✅ VERY IMPORTANT


      login(data); 
      if(data.role==="ROLE_RENTER")    
        navigate("/"); 
      else   if(data.role==="ROLE_OWNER")    
        navigate("/o-wner");
      else if(data.role==="ROLE_ADMIN")
        navigate("/admin");
    } catch (err) {
      setApiError(
        err.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h2>

        {/* API ERROR */}
        {apiError && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {apiError}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-slate-600 mb-1" >Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        
        <div className="mb-6 relative">
          <label className="block text-slate-600 mb-1" >Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-indigo-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-500 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
