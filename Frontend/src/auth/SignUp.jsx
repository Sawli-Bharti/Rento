import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = ({ role: propRole }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // role from prop OR URL (?r=owner)
  const role =
    propRole ||
    (params.get("r") === "owner" ? "OWNER" : "RENTER");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    role,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;

      case "email":
        if (!/\S+@\S+\.\S+/.test(value))
          error = "Enter a valid email";
        break;

      case "mobileNo":
        if (!/^[6-9]\d{9}$/.test(value))
          error = "Enter valid 10-digit mobile number";
        break;

      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
            value
          )
        ) {
          error =
            "Password must be 8+ chars with upper, lower, number & special char";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    Object.keys(form).forEach((key) =>
      validateField(key, form[key])
    );

    if (Object.values(errors).some(Boolean)) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Signup failed");
      }

      navigate("/login");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          Create {role === "OWNER" ? "Owner" : "Renter"} Account
        </h2>

        <p className="text-center text-sm text-slate-500 mb-6">
          {role === "OWNER"
            ? "List and manage your properties easily"
            : "Find and book properties effortlessly"}
        </p>

        {apiError && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {apiError}
          </p>
        )}

        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Email */}
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Mobile */}
        <Input
          label="Mobile Number"
          name="mobileNo"
          value={form.mobileNo}
          onChange={handleChange}
          error={errors.mobileNo}
        />

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-slate-600 mb-1">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg px-4 py-2 pr-10"
            value={form.password}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-500 transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4 text-slate-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

/* ---------------- REUSABLE INPUT ---------------- */
const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-slate-600 mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-4 py-2"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default Signup;
