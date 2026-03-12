import { useState } from "react";
import { useCv } from "../store/CvContext.jsx";
import { exportPdf } from "../utils/exportPdf.js";

export default function AppHeader() {
  const { state } = useCv();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportPdf(state);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between print:hidden">
      <h1 className="text-lg font-bold text-gray-800 tracking-tight">
        CV Generator
      </h1>
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
      >
        {loading ? "Generating…" : "Download PDF"}
      </button>
    </header>
  );
}
