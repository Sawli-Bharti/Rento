import { useParams } from "react-router-dom";
import { useAuth,ImagePreviewModal } from "../../resource";
import { useEffect, useState } from "react";

const AdminKycView = () => {
  const { ownerId } = useParams();
  const { token } = useAuth();
  const [kyc, setKyc] = useState(null);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [previewImg, setPreviewImg] = useState(null);


  useEffect(() => {
    fetchKyc();
  }, []);

  const fetchKyc = async () => {
    const res = await fetch(
      `http://localhost:8080/admin/user-kyc/${ownerId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setKyc(await res.json());
  };

  const approve = async () => {
    await fetch(
      `http://localhost:8080/admin/owner-kyc/approved/${ownerId}`,
      { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
    );
    alert("KYC Approved");
  };

  const reject = async () => {
    if (!reason) {
      alert("Select rejection reason");
      return;
    }

    await fetch(
      `http://localhost:8080/admin/owner-kyc/rejected?ownerId=${ownerId}&reason=${reason}&note=${note}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("KYC Rejected");
  };

  if (!kyc) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Owner KYC Review</h2>

      <p><b>Name:</b> {kyc.fullName}</p>
      <p><b>ID Type:</b> {kyc.idType}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">

  <div>
    <p className="font-medium mb-1">Owner Selfie</p>
    <img
      src={kyc.selfieUrl}
      onClick={() => setPreviewImg(kyc.selfieUrl)}
      className="cursor-pointer rounded border hover:scale-105 transition"
      alt="Selfie"
    />
  </div>

  <div>
    <p className="font-medium mb-1">ID Front</p>
    <img
      src={kyc.idFrontUrl}
      onClick={() => setPreviewImg(kyc.idFrontUrl)}
      className="cursor-pointer rounded border hover:scale-105 transition"
      alt="Front ID"
    />
  </div>

  {kyc.idBackUrl && (
    <div>
      <p className="font-medium mb-1">ID Back</p>
      <img
        src={kyc.idBackUrl}
        onClick={() => setPreviewImg(kyc.idBackUrl)}
        className="cursor-pointer rounded border hover:scale-105 transition"
        alt="Back ID"
      />
    </div>
  )}
</div>


      {/* Reject */}
      <div className="border-t pt-4">
        <select
          className="border px-3 py-2 rounded w-full mb-3"
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Select Reject Reason</option>
          <option>ID mismatch</option>
          <option>Blurry document</option>
          <option>Invalid ID</option>
          <option>Selfie mismatch</option>
          <option>Suspicious activity</option>
        </select>

        <textarea
          placeholder="Optional note"
          className="border w-full p-2 rounded mb-3"
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={approve}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={reject}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
        {previewImg && (
  <ImagePreviewModal
    src={previewImg}
    onClose={() => setPreviewImg(null)}
  />
)}

    </div>
  );
};

export default AdminKycView;
