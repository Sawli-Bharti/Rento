const IdUpload = ({ label, file, setFile, error }) => (
  <div className="border-2 border-dashed rounded-lg p-4 text-center">
    <p className="text-sm font-medium mb-2">{label}</p>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      id={label}
      onChange={(e) => setFile(e.target.files[0])}
    />

    <label htmlFor={label} className="cursor-pointer text-indigo-600">
      {file ? "Change Image" : "Upload Image"}
    </label>

    {file && (
      <img
        src={URL.createObjectURL(file)}
        className="mt-3 max-h-32 mx-auto rounded"
      />
    )}

    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
  </div>
);

export default IdUpload;
