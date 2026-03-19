import { useRef, useState, useEffect } from "react";

const SelfieCapture = ({ selfie, setSelfie, error }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // Start camera when cameraOn = true
  useEffect(() => {
    if (!cameraOn) return;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Camera error:", err);

        alert(
          err.name === "NotAllowedError"
            ? "Camera permission blocked"
            : err.name === "NotReadableError"
            ? "Camera already in use"
            : err.name === "NotFoundError"
            ? "No camera found"
            : "Unable to access camera"
        );

        setCameraOn(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [cameraOn]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setCameraOn(false);
  };

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setSelfie(canvas.toDataURL("image/png"));
    stopCamera();
  };

  const retakeSelfie = () => {
    setSelfie(null);
    setCameraOn(true);
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Live Selfie Verification</h3>

      {/* OPEN CAMERA */}
      {!cameraOn && !selfie && (
        <button
          onClick={() => setCameraOn(true)}
          className="border px-4 py-2 rounded text-indigo-600"
        >
          Open Camera
        </button>
      )}

      {/* CAMERA VIEW */}
      {cameraOn && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="rounded w-full mb-3"
          />

          <button
            onClick={captureSelfie}
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
          >
            Capture Selfie
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* SELFIE PREVIEW + RETAKE */}
      {selfie && (
        <div className="mt-4 text-center">
          <img
            src={selfie}
            alt="Selfie"
            className="rounded mx-auto max-h-48 mb-3"
          />

          <button
            onClick={retakeSelfie}
            className="border px-4 py-2 rounded text-indigo-600"
          >
            Retake Selfie
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default SelfieCapture;
