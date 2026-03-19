const FileBox = ({ label, file, setFile, error, disabled }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>

      <input
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={handleFileChange}
        className="w-full border px-3 py-2 rounded"
      />

      {file && (
        <p className="text-xs text-slate-500 mt-1">{file.name}</p>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileBox;
