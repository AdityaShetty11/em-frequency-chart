import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/effective-mass`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className="container">
      <h1>Effective Mass vs Frequency</h1>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency_hz"
            type="number"
            domain={[(dataMin) => dataMin - 20, "dataMax"]}
            label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            label={{ value: "Effective Mass (kg)", angle: -90, position: "insideLeft", offset: 10 }}
          />
          <Tooltip formatter={(val) => val.toExponential(3)} />
          <Legend verticalAlign="top" />
          <ReferenceLine
            x={43.9}
            stroke="#888"
            strokeDasharray="6 3"
            label={{ value: "Mode 1 (43.9 Hz)", position: "insideTopRight", fontSize: 12 }}
          />
          <Line type="monotone" dataKey="em_x" name="EM-X" stroke="#e63946" dot={false} />
          <Line type="monotone" dataKey="em_y" name="EM-Y" stroke="#2a9d8f" dot={false} />
          <Line type="monotone" dataKey="em_z" name="EM-Z" stroke="#457b9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
