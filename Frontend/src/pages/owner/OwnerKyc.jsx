import { useState, useEffect } from "react";
import { SelfieCapture, FileBox, useAuth } from "../../resource";
import { validateImage,validateField } from "../../utils/kycValidation";

const OwnerKyc = () => {
  const { user, token,refreshUser } = useAuth();

  
 

  const [kycDetails, setKycDetails] = useState({
    fullName: "",
    idType: "",
    idNumber: "",
  });

  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [errors, setErrors] = useState({});

  
 

  /* ---------------- PAN LOGIC ---------------- */
  useEffect(() => {
    if (kycDetails.idType === "PAN") setIdBack(null);
  }, [kycDetails.idType]);

  useEffect(() => {
  if (idFront) {
    const err = validateImage(idFront);
    setErrors((prev) => ({ ...prev, idFront: err }));
  }
}, [idFront]);

useEffect(() => {
  if (idBack) {
    const err = validateImage(idBack);
    setErrors((prev) => ({ ...prev, idBack: err }));
  }
}, [idBack]);

useEffect(() => {
  if (selfie) {
    setErrors((prev) => ({ ...prev, selfie: "" }));
  }
}, [selfie]);


  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
  const newErrors = {};

  Object.keys(kycDetails).forEach((field) => {
    const error = validateField(
      field,
      kycDetails[field],
      kycDetails.idType
    );

    if (error) newErrors[field] = error;
  });

  if (!idFront) newErrors.idFront = "Front ID is required";
  if (kycDetails.idType !== "PAN" && !idBack)
    newErrors.idBack = "Back ID is required";
  if (!selfie) newErrors.selfie = "Selfie is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  /* ---------------- BASE64 → FILE ---------------- */
  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  /* ---------------- SUBMIT ---------------- */
  const submitKyc = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "kycDetails",
        new Blob([JSON.stringify(kycDetails)], {
          type: "application/json",
        })
      );

      formData.append("selfie", base64ToFile(selfie, "selfie.png"));
      formData.append("idFront", idFront);
      if (idBack) formData.append("idBack", idBack);

      const res = await fetch(
        `http://localhost:8080/owner/kyc?ownerId=${user.ownerId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error(await res.text());

      alert(await res.text());
      await refreshUser();
      

      // reset form
      setKycDetails({ fullName: "", idType: "", idNumber: "" });
      setIdFront(null);
      setIdBack(null);
      setSelfie(null);
      setErrors({});
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = () => {
  console.log("handleSubmit triggered");

  if (!validateForm()) {
    console.log("Validation failed");
    return;
  }

  submitKyc();
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setKycDetails((prev) => ({
    ...prev,
    [name]: value,
  }));

  const error = validateField(name, value, kycDetails.idType);

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};

  

  const disabled = user?.kycStatus === "PENDING" || user?.kycStatus === "APPROVED";
  

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Owner KYC Verification</h1>

      {/* STATUS BANNER */}
      {user.kycStatus === "PENDING" && (
        <p className="mb-4 text-yellow-600 bg-yellow-50 p-3 rounded">
          ⏳ Your KYC is under review
        </p>
      )}
      {user.kycStatus === "APPROVED" && (
        <p className="mb-4 text-green-600 bg-green-50 p-3 rounded">
          ✅ KYC Approved
        </p>
      )}
      {user.kycStatus === "REJECTED" && (
        <p className="mb-4 text-red-600 bg-red-50 p-3 rounded">
          ❌ KYC Rejected — Please re-upload documents
        </p>
      )}

      {/* FORM */}
      <input
      name="fullName"
        disabled={disabled}
        placeholder="Full Name"
        className="w-full border px-4 py-2 mb-2 disabled:bg-slate-100"
        value={kycDetails.fullName}
        onChange={handleChange
        }
      />
      {errors.fullName && (
  <p className="text-red-500 text-xs">{errors.fullName}</p>
)}

      <div className="flex gap-3 mt-3">
        <select
        name="idType"
          disabled={disabled}
          className="border px-3 py-2 w-1/2 disabled:bg-slate-100"
          value={kycDetails.idType}
          onChange={handleChange
          }
        >
          <option value="">Select ID</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
          <option value="Passport">Passport</option>
        </select>
        {errors.idType && (
  <p className="text-red-500 text-xs">{errors.idType}</p>
)}

        <input
        name="idNumber"
          disabled={disabled}
          placeholder="ID Number"
          className="border px-3 py-2 w-1/2 disabled:bg-slate-100"
          value={kycDetails.idNumber}
          onChange={handleChange}
        />
        {errors.idNumber && (
  <p className="text-red-500 text-xs">{errors.idNumber}</p>
)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <FileBox
          label="Front ID"
          file={idFront}
          setFile={setIdFront}
          error={errors.idFront}
          disabled={disabled}
        />
        {kycDetails.idType !== "PAN" && (
          <FileBox
            label="Back ID"
            file={idBack}
            setFile={setIdBack}
            error={errors.idBack}
            disabled={disabled}
          />
        )}
      </div>

      <div className="mt-6">
        <SelfieCapture
          selfie={selfie}
          setSelfie={setSelfie}
          error={errors.selfie}
          disabled={disabled}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="w-full bg-indigo-600 text-white py-3 rounded mt-6 disabled:opacity-50 cursor-pointer"
      >
        {user.kycStatus === "REJECTED" ? "Re-submit KYC" : "Submit for Verification"}
      </button>
    </div>
  );
};

export default OwnerKyc;
