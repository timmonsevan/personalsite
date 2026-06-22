import "./NNVisualizerPage.css";
import { useState, useRef, useCallback } from "react";
import DrawCanvas from "../../../components/nn_visualizer/DrawCanvas";
import NetworkGraph from "../../../components/nn_visualizer/NetworkGraph";
import PredictionBar from "../../../components/nn_visualizer/PredictionBar";

export default function NNVisualizerPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const handleStrokeEnd = useCallback(async (dataUrl) => {
    setLoading(true);
    setError(null);
    try {
      const API = import.meta.env.VITE_NN_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResult(await res.json());
    } catch {
      setError("Could not reach backend — is the API running?");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleClear() {
    canvasRef.current?.clear();
    setResult(null);
    setError(null);
  }

  return (
    <div className="nn-page">
      <h2>Neural Net Visualizer</h2>
      <p className="nn-subtitle">
        Draw a digit — watch the network activate in real time
      </p>

      <div className="nn-top">
        <div className="nn-canvas-section">
          <DrawCanvas ref={canvasRef} onStrokeEnd={handleStrokeEnd} />
          <button className="nn-clear-btn" onClick={handleClear}>
            Clear
          </button>
          {error && <p className="nn-error">{error}</p>}
        </div>
        <PredictionBar result={result} loading={loading} />
      </div>

      <NetworkGraph activations={result?.activations ?? null} />
    </div>
  );
}
