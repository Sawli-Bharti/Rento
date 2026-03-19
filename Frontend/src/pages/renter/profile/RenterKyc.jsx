import { useState } from "react";
import {SelfieCapture,FileBox} from "../../../resource";
import { validateImage } from "../../../utils/kycValidation";

const RenterKyc = () => {
  const [form, setForm] = useState({
    fullName: "",
    idType: "",
    idNumber: "",
  });

  const [idFront, setIdFront] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const e = {};

    if (!form.fullName) e.fullName = "Full name required";
    if (!form.idType) e.idType = "Select ID type";
    if (!form.idNumber) e.idNumber = "ID number required";

    const imgErr = validateImage(idFront);
    if (imgErr) e.idFront = imgErr;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Renter KYC</h1>

      <input
        placeholder="Full Name"
        className="w-full border px-4 py-2 mb-3"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <select
        className="border px-3 py-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, idType: e.target.value })}
      >
        <option value="">Select ID</option>
        <option value="Aadhar">Aadhar</option>
        <option value="PAN">PAN</option>
      </select>

      <input
        placeholder="ID Number"
        className="w-full border px-4 py-2 mb-4"
        onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
      />

      <FileBox label="Upload ID" file={idFront} setFile={setIdFront} error={errors.idFront} />

      <div className="mt-6">
        <SelfieCapture selfie={selfie} setSelfie={setSelfie} />
      </div>

      <button
        onClick={() => validateForm() && alert("Renter KYC Submitted")}
        className="w-full bg-indigo-600 text-white py-3 rounded mt-6"
      >
        Submit
      </button>
    </div>
  );
};



export default RenterKyc;
