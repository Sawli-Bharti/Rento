import { FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useState } from "react";

const ImagePreviewModal = ({ src, onClose }) => {
  const [zoom, setZoom] = useState(1);

  if (!src) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Image Container */}
      <div className="relative z-10 bg-white rounded-xl p-4 max-w-4xl w-full mx-4">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-slate-600 hover:text-red-600"
        >
          <FiX />
        </button>

        {/* Zoom Controls */}
        <div className="absolute top-3 left-3 flex gap-2">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.2, 3))}
            className="bg-white shadow rounded p-1"
          >
            <FiZoomIn />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.2, 1))}
            className="bg-white shadow rounded p-1"
          >
            <FiZoomOut />
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center overflow-auto max-h-[80vh]">
          <img
            src={src}
            alt="Preview"
            style={{ transform: `scale(${zoom})` }}
            className="transition-transform duration-200 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
